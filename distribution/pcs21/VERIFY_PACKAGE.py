#!/usr/bin/env python3
"""Verify SHA256 manifest of the PCS toolkit without external dependencies."""
import sys,hashlib
from pathlib import Path
base=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parent
mf=base/'MANIFEST.sha256'
if not mf.is_file():raise SystemExit('MISSING MANIFEST.sha256')
fail=[];count=0
for row in mf.read_text(encoding='utf-8').splitlines():
 if not row.strip():continue
 try:digest,rel=row.split('  ',1)
 except ValueError:fail.append('BAD_MANIFEST_ROW');continue
 f=(base/rel).resolve()
 if not f.is_relative_to(base) or not f.is_file():fail.append('MISSING_OR_UNSAFE '+rel);continue
 actual=hashlib.sha256(f.read_bytes()).hexdigest();count+=1
 if actual!=digest:fail.append('MISMATCH '+rel)
if fail:
 print('FAIL',len(fail),'errors for',count,'files');print('\n'.join(fail[:20]));sys.exit(1)
print(f'PASS PCS 2.1 package SHA-256: {count} files')
