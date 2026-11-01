#!/usr/bin/env node
/** PCS v2.0. Local, dependency-free state/continuity CLI. Never calls network or deploys. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
export const ROOT=path.resolve(here,'..');
export const taskStates=['TODO','READY','IN_PROGRESS','BLOCKED','IN_REVIEW','TECH_DONE','ACCEPTED','DEFERRED','CANCELLED'];
const checkStates=['NOT_RUN','PASS','FAIL','BLOCKED','NA'];
const verificationStates=['DECLARED','VERIFIED','STALE'];
const validDate=x=>typeof x==='string'&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString()===x;
const nonblank=x=>typeof x==='string'&&x.trim().length>0;
const uniq=arr=>new Set(arr).size===arr.length;
const canonical=x=>JSON.stringify(x,Object.keys(x).sort()); // superseded by deepCanonical below
function deepCanonical(x){if(Array.isArray(x))return '['+x.map(deepCanonical).join(',')+']';if(x&&typeof x==='object')return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+deepCanonical(x[k])).join(',')+'}';return JSON.stringify(x);}
export const hash=x=>crypto.createHash('sha256').update(typeof x==='string'?x:deepCanonical(x)).digest('hex');
const read=(root,rel)=>JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
const safeRead=(root,rel)=>fs.existsSync(path.join(root,rel))?fs.readFileSync(path.join(root,rel),'utf8'):null;
function putAtomic(file,value){fs.mkdirSync(path.dirname(file),{recursive:true});const tmp=file+'.tmp-'+process.pid+'-'+crypto.randomUUID();fs.writeFileSync(tmp,value,{flag:'wx'});fs.renameSync(tmp,file);}
const statePaths=['pcs/project.json','pcs/tasks.json','pcs/features.json','pcs/flows.json','pcs/releases.json'];
export function load(root=ROOT){const [project,tasks,features,flows,releases]=statePaths.map(f=>read(root,f));return {project,tasks,features,flows,releases};}
export function revision(state){return hash(state);}
export function evidenceOk(e,root){
 if(!e||!nonblank(e.kind)||!nonblank(e.ref)||!validDate(e.observed_at)||!verificationStates.includes(e.verification?.state))return false;
 if(e.verification.state!=='VERIFIED'||!validDate(e.verification.observed_at)||!nonblank(e.verification.method))return false;
 if(e.kind==='file'){
  const p=path.resolve(root,e.ref);if(!p.startsWith(path.resolve(root)+path.sep)||!fs.existsSync(p)||!fs.statSync(p).isFile())return false;
  return /^[a-f0-9]{64}$/.test(e.sha256||'')&&hash(fs.readFileSync(p).toString('utf8'))===e.sha256;
 }
 // An external claim cannot be independently checked offline; it still needs verified provenance metadata.
 return /^(https:\/\/|[A-Z][A-Z0-9-]*-\d+)/.test(e.ref) && ['api','ci','manual-review','signed-record'].includes(e.verification.method);
}
function scanSensitive(x, loc='root', found=[]){
 if(Array.isArray(x)){x.forEach((v,i)=>scanSensitive(v,loc+'.'+i,found));}
 else if(x && typeof x==='object'){
  for(const [k,v] of Object.entries(x)){
   if(/^(password|secret|token|api_key|private_key|cookie|authorization_header|client_secret)$/i.test(k)&&v!=null)found.push(loc+'.'+k);
   scanSensitive(v,loc+'.'+k,found);
  }
 }else if(typeof x==='string' && (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(x)||/ghp_[a-zA-Z0-9]{30,}/.test(x))){found.push(loc);}
 return found;
}
function nIds(items,kind,errors){const ids=new Set();for(const x of items){if(!nonblank(x?.id)||ids.has(x.id))errors.push(kind+'_DUPLICATE_OR_MISSING_ID:'+String(x?.id));else ids.add(x.id);}return ids;}
export function validate(s,root=ROOT){
 const errors=[],warnings=[];const bad=x=>errors.push(x);if(!s||!s.project)return {errors:['MISSING_PROJECT'],warnings};
 const {project,tasks,features,flows,releases}=s;
 if(scanSensitive(s).length)bad('SENSITIVE_DATA_IN_PCS_STATE:'+scanSensitive(s).slice(0,3).join(','));
 if(project.schema_version!=='2.0.0'||!nonblank(project.id)||!nonblank(project.name))bad('INVALID_PROJECT');
 if(!['Lite','Standard','Regulated'].includes(project.profile))bad('INVALID_PROFILE');
 if(!['local','external'].includes(project.task_source))bad('INVALID_TASK_SOURCE');
 try{new Intl.DateTimeFormat('en',{timeZone:project.timezone});}catch{bad('INVALID_TIMEZONE');}
 for(const key of ['tasks','features','flows','releases'])if(!Array.isArray(s[key]))bad('INVALID_COLLECTION:'+key);
 if(errors.length)return {errors,warnings};
 const tIds=nIds(tasks,'TASK',errors),fIds=nIds(features,'FEATURE',errors),flowIds=nIds(flows,'FLOW',errors);nIds(releases,'RELEASE',errors);
 const tmap=new Map(tasks.map(x=>[x.id,x]));const fmap=new Map(features.map(x=>[x.id,x]));
 for(const t of tasks){
  const id=t.id;
  if(!nonblank(t.title)||!nonblank(t.owner)||!nonblank(t.next_action)||!['code','document','research','operations','design'].includes(t.kind))bad('TASK_REQUIRED:'+id);
  if(!taskStates.includes(t.status)||!checkStates.includes(t.qa?.status))bad('TASK_STATUS:'+id);
  if(!Array.isArray(t.acceptance_criteria)||!t.acceptance_criteria.length||t.acceptance_criteria.some(x=>!nonblank(x)))bad('TASK_DOD:'+id);
  if(!Array.isArray(t.dependencies)||!Array.isArray(t.evidence)||!Array.isArray(t.blockers))bad('TASK_COLLECTIONS:'+id);
  if(!nonblank(t.next_action)||(['IN_PROGRESS','BLOCKED','IN_REVIEW'].includes(t.status)&&!nonblank(t.current_step)))bad('TASK_CHECKPOINT:'+id);
  if(!validDate(t.updated_at))bad('TASK_DATE:'+id);
  if(t.status==='BLOCKED'&&(!t.blockers.length||t.blockers.some(b=>!nonblank(b.reason)||!nonblank(b.unblock_when)||!nonblank(b.owner))))bad('TASK_BLOCKER:'+id);
  const evidence=(t.evidence||[]).filter(e=>evidenceOk(e,root));
  if(['TECH_DONE','ACCEPTED'].includes(t.status)&&!evidence.length)bad('TASK_UNVERIFIED_EVIDENCE:'+id);
  if(t.status==='ACCEPTED'){
   if(t.kind==='code' && t.qa.status!=='PASS')bad('CODE_ACCEPTED_WITHOUT_QA_PASS:'+id);
   if(t.kind==='code'&&(!nonblank(t.qa?.run_ref)||!validDate(t.qa?.observed_at)||!nonblank(t.qa?.source_sha)||!nonblank(t.qa?.environment)))bad('CODE_ACCEPTED_WITHOUT_QA_PROVENANCE:'+id);
   if(t.kind!=='code'&&t.qa.status==='FAIL')bad('NONCODE_ACCEPTED_WITH_FAILING_QA:'+id);
   if(!validDate(t.acceptance?.at)||!nonblank(t.acceptance?.by)||t.acceptance?.decision!=='APPROVED')bad('TASK_UNAPPROVED_ACCEPTANCE:'+id);
  }
  for(const e of t.evidence||[])if(!e||!nonblank(e.ref)||!validDate(e.observed_at)||!['DECLARED','VERIFIED','STALE'].includes(e.verification?.state))bad('EVIDENCE_FORMAT:'+id);
  if(project.task_source==='external'&&!nonblank(t.external?.ref))warnings.push('EXTERNAL_REF_MISSING:'+id);
  if(!Array.isArray(t.dependencies))continue;
  const depKeys=[];
  for(const d of t.dependencies){if(!d||!nonblank(d.id)||!['soft','start','accept'].includes(d.gate))bad('BAD_DEPENDENCY:'+id);else{
    depKeys.push(d.id+':'+d.gate);if(!tIds.has(d.id))bad('UNKNOWN_DEPENDENCY:'+id+':'+d.id);if(d.id===id)bad('SELF_DEPENDENCY:'+id);
    const dep=tmap.get(d.id);
    if(dep&&d.gate==='start'&&['IN_PROGRESS','IN_REVIEW','TECH_DONE','ACCEPTED'].includes(t.status)&&!['TECH_DONE','ACCEPTED'].includes(dep.status))bad('START_DEPENDENCY_NOT_READY:'+id+':'+d.id);
    if(dep&&d.gate==='accept'&&t.status==='ACCEPTED'&&dep.status!=='ACCEPTED')bad('ACCEPT_DEPENDENCY_NOT_READY:'+id+':'+d.id);
  }}if(!uniq(depKeys))bad('DUPLICATE_DEPENDENCY:'+id);
  for(const fid of t.feature_ids||[])if(!fIds.has(fid))bad('UNKNOWN_FEATURE_LINK:'+id+':'+fid);
 }
 const seen=new Set(),stack=new Set();function visit(id){if(stack.has(id)){bad('DEPENDENCY_CYCLE:'+id);return;}if(seen.has(id))return;stack.add(id);for(const d of tmap.get(id)?.dependencies||[])if(d.gate!=='soft'&&tmap.has(d.id))visit(d.id);stack.delete(id);seen.add(id);}for(const id of tIds)visit(id);
 for(const f of features){if(!nonblank(f.title)||!['PLANNED','IN_PROGRESS','INTEGRATION_PENDING','ACCEPTED','BLOCKED'].includes(f.status)||!Array.isArray(f.required_tasks))bad('FEATURE_FORMAT:'+f.id);
  const refs=f.required_tasks||[];if(!uniq(refs))bad('FEATURE_DUPLICATE_TASK:'+f.id);for(const tid of refs)if(!tIds.has(tid))bad('FEATURE_UNKNOWN_TASK:'+f.id+':'+tid);
  if(f.status==='ACCEPTED'){
    if(!refs.length||refs.some(tid=>tmap.get(tid)?.status!=='ACCEPTED'))bad('FEATURE_TASKS_NOT_ACCEPTED:'+f.id);
    if(f.integration?.status!=='PASS'||!nonblank(f.integration?.run_ref)||!nonblank(f.integration?.environment)||!nonblank(f.integration?.source_sha))bad('FEATURE_INTEGRATION_NOT_PASS:'+f.id);
    if(!(f.evidence||[]).some(e=>evidenceOk(e,root)))bad('FEATURE_UNVERIFIED_EVIDENCE:'+f.id);
    if(f.acceptance?.decision!=='APPROVED'||!nonblank(f.acceptance.by)||!validDate(f.acceptance.at))bad('FEATURE_NOT_APPROVED:'+f.id);
  }
  for(const c of f.consumes||[])if(!nonblank(c.contract)||!nonblank(c.provider))bad('FEATURE_BAD_CONTRACT:'+f.id);
 }
 for(const fl of flows){if(!nonblank(fl.title)||!Array.isArray(fl.required_features)||!['PLANNED','IN_PROGRESS','ACCEPTED','BLOCKED'].includes(fl.status))bad('FLOW_FORMAT:'+fl.id);
  for(const x of fl.required_features||[])if(!fIds.has(x))bad('FLOW_UNKNOWN_FEATURE:'+fl.id+':'+x);
  if(fl.status==='ACCEPTED'&&(!(fl.required_features||[]).length||(fl.required_features||[]).some(x=>fmap.get(x)?.status!=='ACCEPTED')||fl.e2e?.status!=='PASS'||!nonblank(fl.e2e?.run_ref)||!nonblank(fl.e2e?.environment)||!(fl.evidence||[]).some(e=>evidenceOk(e,root))))bad('FLOW_ACCEPTANCE_GATE:'+fl.id);
 }
 const flmap=new Map(flows.map(x=>[x.id,x]));for(const rel of releases){if(!nonblank(rel.title)||!['PLANNED','STAGED','APPROVED','DEPLOYED'].includes(rel.status)||!Array.isArray(rel.required_flows))bad('RELEASE_FORMAT:'+rel.id);
  for(const fid of rel.required_flows||[])if(!flowIds.has(fid))bad('RELEASE_UNKNOWN_FLOW:'+rel.id+':'+fid);
  if(['APPROVED','DEPLOYED'].includes(rel.status) && (!(rel.required_flows||[]).length||(rel.required_flows||[]).some(fid=>flmap.get(fid)?.status!=='ACCEPTED')||rel.security?.status!=='PASS'||!nonblank(rel.security?.evidence_ref)||rel.rollback?.status!=='VERIFIED'||!nonblank(rel.rollback?.evidence_ref)||rel.approval?.decision!=='APPROVED'||!validDate(rel.approval?.at)||!nonblank(rel.approval?.by)))bad('RELEASE_APPROVAL_GATE:'+rel.id);
 }
 if(project.active_task_id&&!tIds.has(project.active_task_id))bad('ACTIVE_TASK_MISSING');
 if(project.task_source==='external')warnings.push('EXTERNAL_DATA_REQUIRES_LIVE_API_RECONCILIATION');
 return {errors:[...new Set(errors)],warnings:[...new Set(warnings)]};
}
export function createMoment(s,reason,previous=null,at=new Date().toISOString()){
 if(!validDate(at)||!nonblank(reason))throw Error('BAD_MOMENT_INPUT');
 const m={schema_version:'2.0.0',id:'MOM-'+at.replace(/[-:.]/g,'').replace('Z','Z')+'-'+crypto.randomUUID(),captured_at:at,reason,project_id:s.project.id,active_task_id:s.project.active_task_id||null,state_sha256:revision(s),previous_moment_sha256:previous?.moment_sha256||null,state:s};
 m.moment_sha256=hash(m);return m;
}
function listMomentFiles(root){const folder=path.join(root,'pcs/moments');return fs.existsSync(folder)?fs.readdirSync(folder).filter(f=>/^MOM-.+\.json$/.test(f)).sort():[];}
export function readMoments(root){return listMomentFiles(root).map(f=>({filename:f,data:read(root,'pcs/moments/'+f)}));}
function report(s,m){const {project,tasks,features,flows,releases}=s;
 if(scanSensitive(s).length)bad('SENSITIVE_DATA_IN_PCS_STATE:'+scanSensitive(s).slice(0,3).join(','));const counts=Object.fromEntries(taskStates.map(x=>[x,tasks.filter(t=>t.status===x).length]));const active=tasks.find(t=>t.id===project.active_task_id);const escape=t=>String(t??'').replaceAll('|','/').replaceAll('\n',' ');
 const header=`> GENERATED — do not edit. PCS v2.0 / Moment ${m.id} / ${m.captured_at}. Local evidence is verified by hash; remote evidence requires independent readback.\n\n`;
 const checklist=`# CHECKLIST MOMENT — ${project.name}\n\n${header}**Active:** ${active?.id||'NONE'} · **Status:** ${active?.status||'N/A'} · **Last completed:** ${escape(active?.last_completed_step||'NONE')} · **Current:** ${escape(active?.current_step||'NONE')} · **Next:** ${escape(active?.next_action||'Choose task')}\n\n## Tasks\n| ID | Task | Status | QA | Next |\n|---|---|---|---|---|\n${tasks.map(t=>`| ${t.id} | ${escape(t.title)} | ${t.status} | ${t.qa.status} | ${escape(t.next_action)} |`).join('\n')}\n\n## Feature / Flow / Release\n${features.map(f=>`- Feature **${f.id}**: ${f.status}; required tasks ${f.required_tasks.join(', ')||'none'}`).join('\n')}\n${flows.map(f=>`- Flow **${f.id}**: ${f.status}; required features ${f.required_features.join(', ')||'none'}`).join('\n')}\n${releases.map(f=>`- Release **${f.id}**: ${f.status}; environment ${f.environment}; required flows ${f.required_flows.join(', ')||'none'}`).join('\n')}\n\n**Observe:** snapshot is not proof of the currently deployed SHA or authorization.\n`;
 const progress=`# PROJECT PROGRESS — ${project.name}\n\n${header}**Task count:** ${tasks.length}; accepted ${counts.ACCEPTED}, technical done ${counts.TECH_DONE}, in progress ${counts.IN_PROGRESS}, blocked ${counts.BLOCKED}. This is **not** percentage of whole project.\n\n| Status | Count |\n|---|---:|\n${taskStates.map(x=>`| ${x} | ${counts[x]} |`).join('\n')}\n\n**Features:** ${features.filter(f=>f.status==='ACCEPTED').length}/${features.length} accepted. **Flows:** ${flows.filter(f=>f.status==='ACCEPTED').length}/${flows.length} accepted. **Releases:** ${releases.filter(f=>f.status==='APPROVED'||f.status==='DEPLOYED').length}/${releases.length} approved/deployed.\n\n**Checkpoint:** ${m.id} · **State SHA-256:** ${m.state_sha256}. Live external evidence and approval must be checked at action time.\n`;
 return {'docs/project/CHECKLIST_MOMENT.md':checklist,'docs/project/PROJECT_PROGRESS.md':progress};
}
function lock(root){const dir=path.join(root,'pcs/.write-lock');try{fs.mkdirSync(dir);fs.writeFileSync(path.join(dir,'owner.json'),JSON.stringify({pid:process.pid,created_at:new Date().toISOString()}));}catch{throw Error('PCS_LOCKED: concurrent writer or stale lock; inspect before removing');}return()=>fs.rmSync(dir,{recursive:true,force:true});}
export function checkpoint(root,{reason,expect,at}={}){
 if(!nonblank(expect))throw Error('EXPECT_REQUIRED: use `resume --json` to obtain state_revision');
 const unlock=lock(root);try{
  const s=load(root);const working=revision(s);const base=readMoments(root).at(-1)?.data?.state_sha256||working;
  if(base!==expect)throw Error('REVISION_CONFLICT: base '+base+' expected '+expect);
  const pointer=safeRead(root,'pcs/current.json');if(pointer){let c;try{c=JSON.parse(pointer);}catch{throw Error('CURRENT_POINTER_CORRUPT');}const latest=readMoments(root).at(-1)?.data;if(!latest||latest.id!==c.id||latest.moment_sha256!==c.moment_sha256)throw Error('CURRENT_POINTER_CONFLICT');}
  const v=validate(s,root);if(v.errors.length)throw Error('VALIDATION_FAILED: '+v.errors.join(', '));
  const history=readMoments(root);let chain=null;
  for(const {data:hist} of history){const {moment_sha256,...unsigned}=hist;
   if(hash(unsigned)!==moment_sha256||hist.previous_moment_sha256!==(chain?.moment_sha256||null))throw Error('HISTORY_INTEGRITY_INVALID: review prior moment before writing');
   chain=hist;
  }
  const prev=history.at(-1)?.data||null;
  const now=at||new Date().toISOString();const m=createMoment(s,reason,prev,now);
  const fname=m.id+'.json',dest=path.join(root,'pcs/moments',fname);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,JSON.stringify(m,null,2)+'\n',{flag:'wx'});
  // Atomic per file, recoverable if interrupted between files.
  putAtomic(path.join(root,'pcs/current.json'),JSON.stringify({id:m.id,moment_sha256:m.moment_sha256,state_sha256:m.state_sha256,captured_at:m.captured_at},null,2)+'\n');
  for(const [file,contents] of Object.entries(report(s,m)))putAtomic(path.join(root,file),contents);
  return m;
 }finally{unlock();}
}
export function verify(root=ROOT){let state;try{state=load(root);}catch(e){return {errors:['READ_STATE_FAILED:'+e.message],warnings:[]};}
 const out=validate(state,root),errors=[...out.errors],warnings=[...out.warnings],history=readMoments(root),current=safeRead(root,'pcs/current.json');let prev=null;
 if(!history.length)errors.push('NO_MOMENT');
 for(const {filename,data:m} of history){const {moment_sha256,...without}=m;if(hash(without)!==moment_sha256)errors.push('MOMENT_HASH_INVALID:'+filename);
  if(m.previous_moment_sha256!==(prev?.moment_sha256||null))errors.push('MOMENT_CHAIN_BROKEN:'+filename);
  if(m.state_sha256!==revision(m.state))errors.push('MOMENT_STATE_INVALID:'+filename);
  if(filename!==m.id+'.json')errors.push('MOMENT_NAME_INVALID:'+filename);
  prev=m;
 }
 const last=history.at(-1)?.data;if(last){if(!current){errors.push('CURRENT_MISSING');}else{
   let c;try{c=JSON.parse(current);}catch{errors.push('CURRENT_INVALID_JSON');}
   if(c&&(c.id!==last.id||c.moment_sha256!==last.moment_sha256||c.state_sha256!==last.state_sha256))errors.push('CURRENT_NOT_LATEST');
  }
  if(last.state_sha256!==revision(state))errors.push('STATE_DRIFT_AFTER_MOMENT');
  const docs=report(state,last);for(const [f,c] of Object.entries(docs))if(safeRead(root,f)!==c)errors.push('REPORT_DRIFT:'+f);
 }
 // Integrity proof requires a trusted external Git/CI anchor, not only local chain.
 warnings.push('LOCAL_CHAIN_NOT_TAMPER_PROOF: anchor moment hash in protected Git/CI or signed record');
 return {errors:[...new Set(errors)],warnings:[...new Set(warnings)],current_revision:revision(state),last_moment:last?.id||null};
}
export function restorePreview(root,id){const h=readMoments(root).find(x=>x.data.id===id);if(!h)throw Error('MOMENT_NOT_FOUND');const before=load(root),after=h.data.state;return {moment:id,read_only:true,task_state_changes:after.tasks.map(t=>({id:t.id,then:t.status,now:before.tasks.find(x=>x.id===t.id)?.status||'ABSENT'})).filter(x=>x.then!==x.now),historical_state:after};}
const help=`PCS v2 — local verified continuity, no remote calls/deploys\n\nnode tools/pcs.mjs status\nnode tools/pcs.mjs resume [--json]\nnode tools/pcs.mjs verify\nnode tools/pcs.mjs checkpoint --reason=handoff --expect=<base_revision>\nnode tools/pcs.mjs restore-preview --moment=<id>\n\nCapture base_revision from resume BEFORE editing. Edit pcs/*.json and checkpoint with that same base_revision. Use separate worktrees for concurrent agents. Changes are refused if they fail validation. Never assume this tool verifies CI/Cloudflare/URL facts.\n`;
const arg=(k)=>process.argv.find(x=>x.startsWith('--'+k+'='))?.slice(k.length+3);
const direct=process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(direct){try{const cmd=process.argv[2]||'help';const root=arg('root')?path.resolve(arg('root')):ROOT;
  if(cmd==='help'||cmd==='--help')console.log(help);
  else if(cmd==='resume'||cmd==='status'){const s=load(root),id=s.project.active_task_id,task=s.tasks.find(t=>t.id===id),prev=readMoments(root).at(-1)?.data,payload={project:s.project.id,active:task||null,base_revision:prev?.state_sha256||revision(s),working_revision:revision(s),last_moment:prev?.id||null,warning:s.project.task_source==='external'?'Reconcile from external task system before risky action':null};if(process.argv.includes('--json'))console.log(JSON.stringify(payload,null,2));else console.log(`PROJECT ${s.project.name}\nACTIVE ${task?.id||'NONE'} / ${task?.status||'N/A'}\nLAST ${task?.last_completed_step||'NONE'}\nCURRENT ${task?.current_step||'NONE'}\nNEXT ${task?.next_action||'NONE'}\nBASE REVISION ${payload.base_revision}\nWORKING REVISION ${payload.working_revision}\nMOMENT ${payload.last_moment}\n${payload.warning||''}`);}
  else if(cmd==='verify'){const x=verify(root);for(const w of x.warnings)console.warn('WARN '+w);for(const e of x.errors)console.error('FAIL '+e);if(x.errors.length)process.exitCode=1;else console.log('PASS PCS local-state/moment/report consistency (NOT remote acceptance).');}
  else if(cmd==='checkpoint'){const m=checkpoint(root,{reason:arg('reason'),expect:arg('expect')});console.log('CREATED '+m.id+' HASH '+m.moment_sha256);}
  else if(cmd==='restore-preview')console.log(JSON.stringify(restorePreview(root,arg('moment')),null,2));
  else{console.error('Unknown command\n'+help);process.exitCode=2;}
 }catch(e){console.error('PCS ERROR '+e.message);process.exitCode=1;}}
