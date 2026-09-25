import { build } from 'esbuild';
import { chromium } from 'playwright';
import fs from 'node:fs';
const dir='artifacts/integration/shapes';fs.mkdirSync(dir,{recursive:true});
const source=`import React from 'react';import {createRoot} from 'react-dom/client';import {ShaderGradient,ShaderGradientCanvas} from '@shadergradient/react';import {useThree} from '@react-three/fiber';
function Stats(){const s=useThree();React.useEffect(()=>{window.probe=s;},[s]);return null;}
const type=window.probeShape||'plane';
createRoot(document.getElementById('root')).render(React.createElement(ShaderGradientCanvas,{pixelDensity:1,lazyLoad:false,fov:45},React.createElement(ShaderGradient,{type,shader:'defaults',control:'props',animate:'off',grain:'off',lightType:'3d',brightness:.8,reflection:0,color1:'#17251f',color2:'#52634a',color3:'#bac58b',cDistance:type==='sphere'?2.5:5,cPolarAngle:90,cAzimuthAngle:180,uStrength:.55,uDensity:1.4,uFrequency:3,uAmplitude:.12,uSpeed:.055,rotationZ:-18,enableTransition:false}),React.createElement(Stats)));`;
const result=await build({stdin:{contents:source,resolveDir:process.cwd(),loader:'js'},bundle:true,write:false,format:'iife',minify:true,define:{'process.env.NODE_ENV':'"production"'}});
const browser=await chromium.launch({headless:true,channel:'chromium'}),results=[];
for(const shape of ['plane','sphere','waterPlane']){
 const page=await browser.newPage({viewport:{width:800,height:600}});
 await page.setContent('<html><body style="margin:0;background:#17251f"><div id="root" style="height:100vh"></div></body></html>');
 await page.evaluate(shape=>window.probeShape=shape,shape);await page.addScriptTag({content:result.outputFiles[0].text});await page.waitForFunction(()=>window.probe);await page.waitForTimeout(1500);
 const stats=await page.evaluate(()=>({triangles:window.probe.gl.info.render.triangles,draws:window.probe.gl.info.render.calls,geometries:window.probe.gl.info.memory.geometries}));results.push({shape,...stats});await page.screenshot({path:`${dir}/${shape}.png`});await page.close();
}
fs.writeFileSync(`${dir}/comparison.json`,JSON.stringify(results,null,2));console.log(results);await browser.close();
