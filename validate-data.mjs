import fs from "node:fs";
import vm from "node:vm";
const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("config.js","utf8"),ctx);
vm.runInContext(fs.readFileSync("data.js","utf8"),ctx);
const d=ctx.window.ENERGY2027_DATA;
const c=ctx.window.ENERGY2027_CONFIG;
const ids=new Set([...d.organizations,...d.actors,...d.sources].map(x=>x.id));
const errors=[];
const unique=(arr,label)=>{const seen=new Set();for(const x of arr){if(seen.has(x.id))errors.push(`ID dupliqué ${label}: ${x.id}`);seen.add(x.id)}};
for(const [k,v] of Object.entries(d))if(Array.isArray(v)&&v.length&&v.every(x=>x&&x.id))unique(v,k);
for(const r of d.relations){if(!ids.has(r.fromId))errors.push(`${r.id}: fromId inconnu`);if(!ids.has(r.toId))errors.push(`${r.id}: toId inconnu`);for(const x of r.sourceIds||[])if(!ids.has(x))errors.push(`${r.id}: source inconnue ${x}`)}
for(const x of d.claims){if(!ids.has(x.subjectId))errors.push(`${x.id}: sujet inconnu`);for(const s of x.sourceIds||[])if(!ids.has(s))errors.push(`${x.id}: source inconnue ${s}`)}
for(const p of d.positions){if(!ids.has(p.holderId))errors.push(`${p.id}: holder inconnu`);if(!c.criteria.some(x=>x.id===p.topicId))errors.push(`${p.id}: critère inconnu`)}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`OK — ${d.organizations.length} camps, ${d.actors.length} acteurs, ${d.relations.length} relations, ${d.claims.length} affirmations, ${d.sources.length} sources.`);
