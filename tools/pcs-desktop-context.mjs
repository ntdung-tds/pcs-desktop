// Optional read-only PCS Desktop 2.1 context packet; preserves the legacy state format.
import {readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {inspectDesktop} from './pcs-desktop-inspect.mjs';

const FLAGS=['production','destructive','iam_change','credentials_change','external_spend','security_sensitive','requires_owner_approval'];
export async function contextDesktop(root,{taskId,limit=6}={}){
  const n=Number(limit);
  if(!Number.isSafeInteger(n)||n<1||n>12)throw Error('INVALID_LIMIT');
  const overview=await inspectDesktop(root,{group:'tasks',limit:n});
  const load=async file=>JSON.parse(await readFile(join(root,'pcs',file),'utf8'));
  const [project,tasks,current]=await Promise.all([load('project.json'),load('tasks.json'),load('current.json')]);
  const id=taskId??project.active_task_id;
  const task=id?tasks.find(t=>t.id===id):null;
  if(id&&!task)throw Error('TASK_NOT_FOUND');
  const flags=FLAGS.filter(k=>task?.[k]===true);
  const risk=task?.risk??'UNCLASSIFIED';
  const elevated=!!task&&(!['LOW','NORMAL'].includes(String(risk).toUpperCase())||flags.length>0);
  return {schema:'pcs.desktop.context.v1',project:project.id,
    current_pointer_present:!!current.id,active_task:project.active_task_id,
    task:task?{id:task.id,status:task.status,risk:String(risk).toUpperCase(),
      dependencies:(task.dependencies??[]).slice(0,20),
      dependencies_remaining:Math.max(0,(task.dependencies??[]).length-20),
      sensitive_flags:flags,owner_review_required:elevated}:null,
    backlog:{total:overview.total,open:overview.open,shown:overview.shown,remaining:overview.remaining},
    handoff_contract:{task_id:task?.id??null,scope:'READ_PROJECT_SOURCE',
      acceptance:'VERIFY_REQUIREMENTS',changed_paths:'NOT_VERIFIED',tests:'NOT_VERIFIED',
      commit:'NOT_VERIFIED',owner_approval:'NOT_VERIFIED'},
    next_reads:['current Moment','selected task source and affected code','relevant tests and external evidence'],
    warning:'This is a metadata projection, not a PCS verify run, GitHub sync, test PASS or owner approval.'};
}
async function main(){
  const a={};for(const p of process.argv.slice(2)){const i=p.indexOf('=');if(!p.startsWith('--')||i<3)throw Error('INVALID_OPTION');a[p.slice(2,i)]=p.slice(i+1);}
  const result=await contextDesktop(a.root??'.',{taskId:a.task,limit:a.limit===undefined?6:Number(a.limit)});
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
  main().catch(e=>{console.error('PCS_DESKTOP_CONTEXT: '+e.message);process.exitCode=1;});
