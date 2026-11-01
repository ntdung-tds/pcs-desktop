import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {contextDesktop} from '../tools/pcs-desktop-context.mjs';

test('bounded metadata packet does not expose task titles',async()=>{
 const root=await mkdtemp(join(tmpdir(),'pcs-d-'));
 try{
  await mkdir(join(root,'pcs'));
  const put=async(n,obj)=>writeFile(join(root,'pcs',n+'.json'),JSON.stringify(obj));
  await put('project',{id:'P1',active_task_id:'T199'});
  await put('current',{id:'MOM-1'});
  await put('tasks',Array.from({length:200},(_,i)=>({id:'T'+i,status:'PLANNED',
    title:'Confidential '+i,risk:'NORMAL',dependencies:[]})));
  for(const group of ['features','flows','releases'])await put(group,[]);
  const pkt=await contextDesktop(root,{limit:4});
  assert.equal(pkt.task.id,'T199');assert.equal(pkt.backlog.remaining,196);
  assert.ok(!JSON.stringify(pkt).includes('Confidential'));
  await assert.rejects(()=>contextDesktop(root,{limit:100}),/INVALID_LIMIT/);
  await assert.rejects(()=>contextDesktop(root,{taskId:'BAD'}),/TASK_NOT_FOUND/);
 }finally{await rm(root,{recursive:true,force:true});}
});
