// Color adaptation for retained vendor output. Vendor inputs stay hash-verifiable.
export function colorRole(hex) {
  let s=hex.replace('#',''); if(s.length===3||s.length===4)s=[...s].map(c=>c+c).join('');
  const [r,g,b]=s.slice(0,6).match(/../g).map(v=>parseInt(v,16)); const l=.2126*r+.7152*g+.0722*b;
  return l<17?'black':l<30?'carbon':l<43?'surface-elevated':l<90?'graphite':l<155?'muted':l<214?'light-muted':l<247?'bone':'soft-white';
}
export function adaptCSSColors(css) {
  return css.replaceAll('rgba(58,43,20,var(--a1,0))','rgb(var(--rgb-carbon) / var(--a1,0))').replaceAll('rgba(58,43,20,var(--a2,0))','rgb(var(--rgb-carbon) / var(--a2,0))').replace(/#[\da-f]{3,8}\b/gi,h=>{let s=h.slice(1);if(s.length===3||s.length===4)s=[...s].map(c=>c+c).join('');const k=colorRole(h);return s.length===8?`rgb(var(--rgb-${k}) / ${(parseInt(s.slice(6),16)/255).toFixed(3)})`:`var(--color-${k})`;})
    .replace(/rgba?\(\s*(\d+)[, ]+\s*(\d+)[, ]+\s*(\d+)(?:\s*[,/]\s*([.\d]+))?\s*\)/g,(_,r,g,b,a)=>{const k=colorRole([r,g,b].map(x=>(+x).toString(16).padStart(2,'0')).join(''));return a?`rgb(var(--rgb-${k}) / ${a})`:`var(--color-${k})`;});
}
export function adaptEngineColors(code) {
  // Preserve pure grayscale masks; remap scene and paint colors only.
  code=code.replace(/\b0x([\da-f]{6})\b/gi,(_,h)=>`housePalette["${colorRole(h)}"]`)
    .replace(/(['"])(#[\da-f]{6})\1/gi,(all,q,h)=>/^#(ffffff|000000|7f7f7f)$/i.test(h)?all:`housePalette["${colorRole(h)}"]`);
  code=code.replace(/(['"])rgba\((\d+),(\d+),(\d+),([.\d]+)\)\1/g,(all,q,r,g,b,a)=>r===g&&g===b?all:`housePalette["${colorRole([r,g,b].map(x=>(+x).toString(16).padStart(2,'0')).join(''))}"] + "${Math.round(+a*255).toString(16).padStart(2,'0')}"`)
    .replaceAll('rgba(92,76,55,','rgba(53,59,61,').replaceAll('${tone - 5},${tone - 13}','${tone},${tone}').replaceAll('${shade - 3},${shade - 9}','${shade},${shade}');
  return 'import housePalette from "@/lib/palette.json";\n'+code;
}
