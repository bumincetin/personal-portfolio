import fs from 'node:fs';
import sharp from 'sharp';
const dir='artifacts/refinement',out=dir+'/after';
const files=fs.readdirSync(out).filter(f=>f.endsWith('.png')&&!f.includes('-full')&&!f.includes('sheet')&&!f.includes('first-'));
for(const width of [1440,393,768]){
 const group=files.filter(f=>f.startsWith(width+'-')),cellW=360,cellH=270,cols=3;
 const images=[];
 for(let i=0;i<group.length;i++){
  const png=await sharp(`${out}/${group[i]}`).resize(cellW,240,{fit:'contain',background:'#070908'}).toBuffer();
  images.push({input:png,left:(i%cols)*cellW,top:Math.floor(i/cols)*cellH+30});
  const label=Buffer.from(`<svg width="360" height="30"><text x="12" y="21" font-family="Arial" font-size="14" fill="#F2F0E8">${group[i]}</text></svg>`);
  images.push({input:label,left:(i%cols)*cellW,top:Math.floor(i/cols)*cellH});
 }
 if(group.length)await sharp({create:{width:cols*cellW,height:Math.ceil(group.length/cols)*cellH,channels:3,background:'#070908'}}).composite(images).png().toFile(`${dir}/${width}-sheet.png`);
}
fs.writeFileSync(`${dir}/index.html`,`<!doctype html><meta charset="utf-8"><title>Working Volumes — visual refinement</title><style>body{background:#070908;color:#F2F0E8;font:16px Arial;margin:32px}h1{font-weight:400}main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}img{width:100%}a{color:#D8FF55}figure{margin:0}figcaption{padding:12px 0}section{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:48px}</style><h1>Working Volumes — visual refinement</h1><p>Carbon / bone / citron. Open an image for full resolution.</p><section><figure><img src="before/1440-selected-4.png"><figcaption>Before — Volume IV</figcaption></figure><figure><img src="after/1440-inspect-4.png"><figcaption>After — Volume IV</figcaption></figure></section><main>${files.map(f=>`<figure><a href="after/${f}"><img loading="lazy" src="after/${f}"></a><figcaption>${f}</figcaption></figure>`).join('')}</main>`);
