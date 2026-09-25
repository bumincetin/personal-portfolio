import fs from 'node:fs';
import { adaptCSSColors } from './palette-adapter.mjs';
// Keep the imported vendor CSS unchanged; maintain a complete color adaptation
// after it so uncommon states cannot fall back to the vendor's old palette.
const source=fs.readFileSync('src/app/components/shelf/shelf.css','utf8');
fs.writeFileSync('src/app/components/shelf/shelf-palette.css','/* Generated color adaptation. Run node scripts/refinement-legacy-css.mjs. */\n'+adaptCSSColors(source));
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${d}/${e.name}`):[`${d}/${e.name}`]);
for(const f of walk('src').filter(f=>f.endsWith('.css')&&!f.endsWith('/shelf.css')&&!f.endsWith('/palette.css'))){const s=fs.readFileSync(f,'utf8');fs.writeFileSync(f,adaptCSSColors(s));}
