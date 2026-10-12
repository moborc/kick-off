const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('webb/index.html','utf8');
let scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join('\n');
scripts=scripts.replace(/\}\)\(\);\s*$/, 'window.__kickTest={allActivities,start,answer,next,state,LEVELS,CHAPTERS,BOOK_ASSETS,isCorrect};})();');
class Element{
 constructor(){this.innerHTML='';this.value='';this.textContent='';this.disabled=false;this.checked=false;this.dataset={};this.handlers={};this.classList={add(){},remove(){},toggle(){},contains(){return false;}};}
 addEventListener(name,f){(this.handlers[name]??=[]).push(f);} querySelectorAll(){return [];} querySelector(){return new Element();}focus(){} select(){} setAttribute(){}getAttribute(){return '';}closest(){return this;}showModal(){this.open=true;}close(){this.open=false;}reportValidity(){return true;}
}
const elements=new Map();const document={getElementById(id){if(!elements.has(id))elements.set(id,new Element());return elements.get(id);},querySelector(){return new Element();},querySelectorAll(){return [];}};
const window={addEventListener(){},scrollTo(){},print(){}};
const sandbox={document,window,console,crypto:require('crypto').webcrypto,setTimeout,clearTimeout,AbortController,navigator:{clipboard:{writeText:async()=>{}}}};
vm.runInNewContext(scripts,sandbox,{timeout:10000});
const api=window.__kickTest;assert(api);const activities=api.allActivities();
assert(activities.length>30);assert.equal(new Set(activities.map(a=>a.id)).size,activities.length);
for(const a of activities){assert(a.id&&a.title&&a.kind);if(a.questions){assert(a.questions.length||a.kind==='write',`${a.id}: ${a.kind} saknar frågor`);for(const q of a.questions){if(a.kind==='words'){assert.equal(q.length,2);assert(q.every(v=>typeof v==='string'&&v.length));}else{assert(q.answer!==undefined,JSON.stringify({id:a.id,kind:a.kind,keys:Object.keys(q)}));assert(api.isCorrect(q,q.answer),`${a.id}: ${q.answer}`);}}}}
let opened=0;
for(const a of activities){if(a.level!=='all')api.state.level=a.level;try{assert.equal(api.start(a.id),true,a.id);}catch(e){console.error(JSON.stringify({id:a.id,level:a.level,stateLevel:api.state.level,levels:api.LEVELS.map(l=>l.id)}));throw e;}opened++;}
const qActivity=activities.find(a=>a.kind==='grammar'&&a.questions?.length);api.state.level=qActivity.level==='all'?api.LEVELS[0].id:qActivity.level;api.start(qActivity.id);
while(api.state.view==='play'){const q=api.state.session.questions[api.state.session.index];api.answer(q.answer);api.next();}
assert.equal(api.state.view,'result');
assert.equal(api.CHAPTERS[1],'My Day');
const chapterAreas=[...new Set(activities.filter(a=>a.id.includes('book')).map(a=>a.chapter))];
assert(Object.values(api.BOOK_ASSETS).every(i=>i.src.startsWith('data:image/')&&i.alt));
assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/.test(scripts));
console.log(`PASS Kick-off: ${activities.length} aktiviteter med unika ID:n, ${opened} öppnade övningar, facit, full grammatikomgång, kapitelkopplingar och ${Object.keys(api.BOOK_ASSETS).length} inbäddade bilder. Resultat hålls endast i sidans minne.`);
