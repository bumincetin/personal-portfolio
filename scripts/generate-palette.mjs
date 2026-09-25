import fs from 'node:fs';
export const palette = JSON.parse(fs.readFileSync('src/lib/palette.json', 'utf8'));
export const aliases = {
  ground:'black', panel:'surface', 'panel-alt':'carbon', 'panel-raised':'surface-elevated',
  text:'bone', 'text-2':'bone', 'text-3':'light-muted', muted:'light-muted', 'muted-light':'muted',
  brass:'citron', 'brass-hi':'bone', 'brass-lo':'muted', 'brass-hover':'bone',
  copper:'citron', 'copper-hi':'bone', 'copper-lo':'muted', positive:'citron', negative:'bone', caution:'bone',
  hairline:'graphite', 'hairline-strong':'muted', 'hairline-control':'muted',
  'scroll-thumb':'graphite', 'scroll-thumb-hover':'muted', 'scan-light':'citron',
};
const rgb = hex => hex.slice(1).match(/../g).map(x=>parseInt(x,16)).join(' ');
const css = `/* Generated from src/lib/palette.json. Run node scripts/generate-palette.mjs. */\n:root {\n${Object.entries(palette).map(([k,v])=>`  --color-${k}: ${v};\n  --rgb-${k}: ${rgb(v)};`).join('\n')}\n${Object.entries(aliases).map(([k,v])=>`  --c-${k}: var(--rgb-${v});`).join('\n')}\n  --line-dark: rgb(var(--rgb-soft-white) / .12);\n  --line-light: rgb(var(--rgb-carbon) / .14);\n}\n`;
const file='src/app/components/experience/palette.css';
if(process.argv.includes('--check')) { if(fs.readFileSync(file,'utf8')!==css) throw Error('Palette CSS is stale'); }
else fs.writeFileSync(file,css);
