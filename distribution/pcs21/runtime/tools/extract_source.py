#!/usr/bin/env python3
"""Extract text from a user-provided specification. No OCR or network calls.
Returns JSON with text, sections, pages and warnings. Treat output as untrusted data.
"""
import sys,json,re,zipfile,xml.etree.ElementTree as ET,subprocess,shutil
from pathlib import Path

def docx_extract(path):
    ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    sections=[]; lines=[]; warnings=[]
    with zipfile.ZipFile(path) as z:
        if any(x.startswith('word/media/') for x in z.namelist()): warnings.append('DOCX_EMBEDDED_IMAGES_NOT_INTERPRETED: inspect original visually')
        if 'word/document.xml' not in z.namelist(): raise ValueError('MISSING_DOCX_DOCUMENT_XML')
        if len(z.read('word/document.xml'))>30*1024*1024: raise ValueError('DOCX_XML_TOO_LARGE')
        root=ET.fromstring(z.read('word/document.xml'))
        for p in root.findall('.//w:p',ns):
            text=''.join((e.text or '') for e in p.findall('.//w:t',ns)).strip()
            if not text: continue
            style=p.find('./w:pPr/w:pStyle',ns)
            st=style.get('{'+ns['w']+'}val','') if style is not None else ''
            if re.match(r'Heading\d|Ti[eê]u.?[dđ][eề]',st,re.I):
                sections.append(text[:200]);lines.append('## '+text)
            else: lines.append(text)
    return '\n\n'.join(lines),sections,None,warnings

def pdf_extract(path):
    warnings=[]
    try:
        from pypdf import PdfReader
        reader=PdfReader(str(path),strict=False)
        if reader.is_encrypted: raise ValueError('ENCRYPTED_PDF')
        if len(reader.pages)>300: raise ValueError('PDF_TOO_MANY_PAGES')
        text='\n\n'.join((p.extract_text() or '') for p in reader.pages)
        pages=len(reader.pages)
    except ImportError:
        if not shutil.which('pdftotext'):raise ValueError('PDF_EXTRACTOR_UNAVAILABLE: install pypdf or pdftotext')
        run=subprocess.run(['pdftotext','-layout',str(path),'-'],capture_output=True,text=True,timeout=60)
        if run.returncode: raise ValueError('PDF_TEXT_EXTRACTION_FAILED')
        text=run.stdout; pages=None
    if len(text.strip())<80: warnings.append('SCAN_OR_IMAGE_ONLY_PDF: text is insufficient; agent needs document-vision/manual review')
    return text,[],pages,warnings

def main():
    p=Path(sys.argv[1]).resolve(strict=True)
    if not p.is_file() or p.stat().st_size>20*1024*1024:raise ValueError('SOURCE_MUST_BE_FILE_UNDER_20MB')
    suf=p.suffix.lower();warnings=[]
    if suf in ('.txt','.md','.rst'):
        raw=p.read_text(encoding='utf-8-sig');text=raw;sections=[];pages=None
    elif suf=='.docx':text,sections,pages,warnings=docx_extract(p)
    elif suf=='.pdf':text,sections,pages,warnings=pdf_extract(p)
    else:raise ValueError('UNSUPPORTED_SOURCE_FORMAT: use .md, .txt, .docx, or text-extractable .pdf')
    if len(text.strip())<20: warnings.append('SOURCE_TEXT_TOO_SHORT: check attachment extraction')
    if len(text)>2_000_000:raise ValueError('EXTRACTED_TEXT_EXCEEDS_LIMIT')
    print(json.dumps({'format':suf[1:],'chars':len(text),'sections':sections[:200], 'pages':pages,'warnings':warnings,'text':text},ensure_ascii=False))
if __name__=='__main__':
 try:main()
 except Exception as e:
  print(json.dumps({'error':str(e)},ensure_ascii=False),file=sys.stderr);sys.exit(2)
