import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {inspectDesktop,diffDesktop} from '../tools/pcs-desktop-inspect.mjs';

async function fixture(){
 const dir=await mkdtemp(join(tmpdir(),'pcs-desktop-inspect-'));
 await mkdir(join(dir,'pcs'));
 const write=async(k,v)=>writeFile(join(dir,'pcs',k+'.json'),JSON.stringify(v));
 await write('project',{id:'TEST',active_task_id:'T150'});
 await write('current',{id:'MOM-test'});
 await write('tasks',Array.from({length:150},(_,i)=>({id:'T'+(i+1),status:'PLANNED',title:'Sensitive title '+i})));
 for(const k of ['features','flows','releases'])await write(k,[]);
 return {dir,write};
}
test('Desktop inspect bounded and safe from free-text expansion',async()=>{
 const f=await fixture();try{
 const r=await inspectDesktop(f.dir,{limit:8});
 assert.equal(r.total,150);assert.equal(r.shown.length,8);assert.equal(r.shown[0].id,'T150');
 assert.equal(r.remaining,142);assert.ok(!JSON.stringify(r).includes('Sensitive title'));
 await assert.rejects(inspectDesktop(f.dir,{limit:51}),/INVALID_LIMIT/);
 }finally{await rm(f.dir,{recursive:true,force:true})}
});
test('Desktop diff lists changed keys without exposing descriptions',async()=>{
 const a=await fixture(),b=await fixture();
 try{
 const list=Array.from({length:150},(_,i)=>({id:'T'+(i+1),status:i===0?'BLOCKED':'PLANNED',title:'private data '+i}));
 await b.write('tasks',list);
 const d=await diffDesktop(a.dir,b.dir);
 assert.equal(d.groups.tasks.total,1);
 assert.equal(d.groups.tasks.shown[0].status_after,'BLOCKED');
 assert.ok(!JSON.stringify(d).includes('private data'));
 }finally{await rm(a.dir,{recursive:true,force:true});await rm(b.dir,{recursive:true,force:true})}
});
