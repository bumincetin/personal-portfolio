import fs from 'node:fs';
const iconFiles=['src/app/components/experience/world/WorldExperience.tsx','src/app/components/experience/ExperienceNavigation.tsx','src/app/components/experience/ExperienceHome.tsx'];
for(const file of iconFiles){let s=fs.readFileSync(file,'utf8');
 if(!s.includes('import ExperienceIcon')) { const imp=`import ExperienceIcon from './ExperienceIcon';\n`; s=s.startsWith('"use client";')?s.replace('"use client";','"use client";\n'+imp):imp+s; }
 for(const [glyph,name] of Object.entries({'↗':'external','↖':'back','←':'back','→':'arrow','↓':'down','×':'close','＋':'menu'}))s=s.replaceAll(`>${glyph}<`,`><ExperienceIcon name="${name}" /><`).replaceAll(`\n                ${glyph}\n`,`\n                <ExperienceIcon name="${name}" />\n`).replaceAll(`\n              ${glyph}\n`,`\n              <ExperienceIcon name="${name}" />\n`);
 fs.writeFileSync(file,s);
}
// Resolve the contrast audit from the same canonical data, not stale CSS copies.
let c=fs.readFileSync('scripts/check-contrast.mjs','utf8');const start=c.indexOf('const CSS =');const end=c.indexOf('const channelLuminance');
c=c.slice(0,start)+`const palette = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '..', 'src/lib/palette.json'),'utf8'));
const css = fs.readFileSync(path.resolve(import.meta.dirname, '..', 'src/app/components/experience/palette.css'),'utf8');
const tokens = {};
for(const match of css.matchAll(/--c-([\\w-]+): var\\(--rgb-([\\w-]+)\\)/g)) tokens['c-'+match[1]]=palette[match[2]].slice(1).match(/../g).map(v=>parseInt(v,16));
\n`+c.slice(end);fs.writeFileSync('scripts/check-contrast.mjs',c);
// Remove stale editorial descriptions of the retired palette.
let v=fs.readFileSync('src/app/components/shelf/volumes.ts','utf8');v=v.replace(/ \* What is kept from the source and why:[\s\S]*? \* meaning are entirely this site's\./,` * Binding geometry and atlas order are retained. Surface colors now consume the
 * shared carbon/bone palette; the optional cover atlas is rendered in grayscale.
 * Text, routes and meaning remain unchanged.`);fs.writeFileSync('src/app/components/shelf/volumes.ts',v);
let p=fs.readFileSync('src/app/components/experience/atmosphere/shader-presets.ts','utf8').replace('a single stone / olive field','a restrained carbon / blue-black field');fs.writeFileSync('src/app/components/experience/atmosphere/shader-presets.ts',p);
// Preserve the previous profiling evidence in a separate refinement directory.
fs.writeFileSync('scripts/refinement-profile.mjs',fs.readFileSync('scripts/integration-profile.mjs','utf8').replace('artifacts/integration/${stage}','artifacts/refinement/${stage}'));
