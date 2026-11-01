// PCS Desktop 2.1 optional read-only project-state inspector (no dependencies).
// Does not alter the legacy 103-file distribution or claim GitHub synchronization.
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const GROUPS=['tasks','features','flows','releases'];
function limitOf(n) {const k=n===undefined?12:Number(n);if(!Number.isSafeInteger(k)||k<1||k>50)throw Error('INVALID_LIMIT');return k;}
function groupOf(g){const x=g??'tasks';if(!GROUPS.includes(x))throw Error('INVALID_GROUP');return x;}
async function load(root){
 const json=async name=>JSON.parse(await readFile(join(root,'pcs',name+'.json'),'utf8'));
 const project=await json('project');
 const current=await json('current');
 const items={};
 for(const g of GROUPS){const x=await json(g);if(!Array.isArray(x))throw Error('INVALID_GROUP_DATA: '+g);const ids=new Set();for(const t of x){if(typeof t?.id!=='string'||!t.id||ids.has(t.id))throw Error('INVALID_ID: '+g);ids.add(t.id);}items[g]=x;}
 if(typeof project.active_task_id!=='string'&&project.active_task_id!==null)throw Error('INVALID_ACTIVE_TASK');
 return {project,current,items};
}
export async function inspectDesktop(root,{group='tasks',limit=12}={}){
 const g=groupOf(group),n=limitOf(limit),p=await load(root),rows=p.items[g];
 const pending=rows.filter(x=>!['ACCEPTED','CANCELLED'].includes(x.status));
 const active=p.project.active_task_id;
 const sorted=[...pending].sort((a,b)=>{
   const score=x=>x.id===active?0:['BLOCKED','IN_PROGRESS','TECH_DONE','INTEGRATION_PENDING'].includes(x.status)?1:2;
   return score(a)-score(b);
 });
 const chosen=sorted.slice(0,n);
 return {schema:'pcs.desktop.inspect.v1',group:g,total:rows.length,open:pending.length,
   active_task:active,pointer_present:!!p.current.id,shown:chosen.map(x=>({id:x.id,status:x.status})),
   remaining:pending.length-chosen.length,
   warning:'Read-only overview; run the installed PCS toolkit verify when it exists. No external acceptance claim.'};
}
export async function diffDesktop(beforeRoot,afterRoot,{limit=12}={}){
 const n=limitOf(limit),a=await load(beforeRoot),b=await load(afterRoot);
 if(a.project.id!==b.project.id)throw Error('PROJECT_MISMATCH');
 const out={};
 for(const g of GROUPS){
   const x=new Map(a.items[g].map(z=>[z.id,z])),y=new Map(b.items[g].map(z=>[z.id,z]));
   const changes=[];
   for(const [id,obj] of y)if(!x.has(id))changes.push({id,kind:'ADDED'});
     else if(JSON.stringify(x.get(id))!==JSON.stringify(obj)){
       const prev=x.get(id);
       changes.push({id,kind:'CHANGED',status_before:prev.status??null,status_after:obj.status??null,
         fields_changed:[...new Set([...Object.keys(prev),...Object.keys(obj)])].filter(key=>JSON.stringify(prev[key])!==JSON.stringify(obj[key])).slice(0,20)});
     }
   for(const [id] of x)if(!y.has(id))changes.push({id,kind:'REMOVED'});
   out[g]={total:changes.length,shown:changes.slice(0,n),remaining:Math.max(0,changes.length-n)};
 }
 return {schema:'pcs.desktop.diff.v1',project:a.project.id,groups:out,warning:'Structural diff only; no evidence/approval verification.'};
}
async function main(){
 const [cmd,...params]=process.argv.slice(2),a={};for(const p of params){const i=p.indexOf('=');if(!p.startsWith('--')||i<3)throw Error('INVALID_OPTION');a[p.slice(2,i)]=p.slice(i+1);}
 if(cmd==='inspect')return inspectDesktop(a.root??'.',a);
 if(cmd==='diff'){if(!a.before||!a.after)throw Error('MISSING_ROOT');return diffDesktop(a.before,a.after,a);}
 throw Error('Usage: inspect --root=/project [--group=tasks] [--limit=12] | diff --before=/snapshot1 --after=/snapshot2');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
 main().then(x=>process.stdout.write(JSON.stringify(x,null,2)+'\n')).catch(e=>{console.error('PCS_DESKTOP_INSPECT: '+e.message);process.exitCode=1;});
