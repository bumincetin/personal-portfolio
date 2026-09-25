// One-time, reviewable migration. Kept as an audit of every replaced literal.
import fs from 'node:fs';
import { palette, aliases } from './generate-palette.mjs';
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
const files=walk('src').filter(f=>/\.(css|tsx?|js)$/.test(f)&&!f.includes('.test.')&&!f.endsWith('/engine.js')&&!f.endsWith('/shelf.css')&&!f.endsWith('/sketchbook.css'));
const snapshot=Object.fromEntries(walk('src').filter(f=>/\.(css|tsx?|js)$/.test(f)).map(f=>[f,fs.readFileSync(f,'utf8')]));
if(fs.existsSync('artifacts/refinement/before/source.json')) throw Error('Refinement baseline already exists; refusing to overwrite it.');
fs.writeFileSync('artifacts/refinement/before/source.json',JSON.stringify(snapshot));
const exact={
 '181c18':'black','151e1a':'black','17251f':'black','18251e':'black','141914':'carbon',
 'eae8dd':'bone','e8e7d9':'bone','e0d5b5':'bone','d4de95':'citron','acbb8c':'light-muted',
 'b3baa9':'light-muted','202820':'surface','596251':'surface-elevated','7f8770':'graphite',
 '202d29':'carbon','566453':'graphite','35483f':'carbon','b5ae72':'muted','ae704f':'blue-black',
 '778c90':'muted','ebedbf':'bone','d9e8a4':'bone','bfd6b9':'light-muted','233029':'carbon',
 'e1e5c0':'bone','52634a':'blue-black','bac58b':'electric-blue','f4eed2':'bone','233e31':'surface',
 'fff0ce':'soft-white','c5ddc5':'light-muted','cad49e':'bone','203229':'carbon','aab780':'light-muted','e0dcaa':'bone','d6df9f':'electric-blue',
 'd4ac81':'light-muted','a7b684':'light-muted','d4de95':'citron','a6b6cf':'light-muted'
};
export function role(hex){
 let s=hex.replace('#','').toLowerCase();if(s.length===3||s.length===4)s=[...s].map(x=>x+x).join('');s=s.slice(0,6);
 if(exact[s])return exact[s];
 const [r,g,b]=s.match(/../g).map(x=>parseInt(x,16)); const l=.2126*r+.7152*g+.0722*b;
 return l<17?'black':l<30?'carbon':l<43?'surface-elevated':l<90?'graphite':l<155?'muted':l<214?'light-muted':l<247?'bone':'soft-white';
}
const audit=[];
for(const file of files){
 if(file.endsWith('/palette.css'))continue;
 let s=fs.readFileSync(file,'utf8'); const before=s;
 if(file.endsWith('.css')){
  s=s.replace(/#[\da-f]{3,8}\b/gi,h=>{let raw=h.slice(1);if(raw.length===3||raw.length===4)raw=[...raw].map(x=>x+x).join('');const k=role(h);const a=raw.length===8?parseInt(raw.slice(6),16)/255:1;return a===1?`var(--color-${k})`:`rgb(var(--rgb-${k}) / ${a.toFixed(3)})`;});
  s=s.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([.\d]+))?\s*\)/g,(_,r,g,b,a)=>{const k=role('#'+[r,g,b].map(x=>(+x).toString(16).padStart(2,'0')).join(''));return a?`rgb(var(--rgb-${k}) / ${a})`:`var(--color-${k})`;});
  s=s.replace(/--c-([\w-]+):\s*[\d ]+;/g,(all,k)=>aliases[k]?`--c-${k}: var(--rgb-${aliases[k]});`:all);
 }else{
  // JSX attributes need expression braces; other string values use JS tokens.
  s=s.replace(/(fill|stroke|color)=(['"])(#[\da-f]{6})\2/gi,(_,a,q,h)=>`${a}={palette["${role(h)}"]}`);
  s=s.replace(/(['"])(#[\da-f]{6})\1/gi,(_,q,h)=>`palette["${role(h)}"]`);
  s=s.replace(/\b0x([\da-f]{6})\b/gi,(_,h)=>`palette["${role(h)}"]`);
  if(s.includes('palette['))s=s.replace(/^("use client";|'use client';)/,'$1\nimport palette from "@/lib/palette.json";');
  if(s.includes('palette[')&&!s.includes('import palette'))s='import palette from "@/lib/palette.json";\n'+s;
 }
 if(s!==before){fs.writeFileSync(file,s);audit.push(file);}
}
fs.writeFileSync('artifacts/refinement/color-migration.json',JSON.stringify(audit,null,2));
console.log('Migrated',audit.length,'source files');
