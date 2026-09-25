import {chromium} from 'playwright';
const b=await chromium.launch({channel:'chromium',headless:true});const p=await b.newPage();
console.log(await p.evaluate(()=>{const c=document.createElement('canvas'),gl=c.getContext('webgl2'),ext=gl?.getExtension('WEBGL_debug_renderer_info');return {renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null};}));await b.close();
