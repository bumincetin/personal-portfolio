import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

const out = 'artifacts/redesign/baseline';
if (fs.existsSync(`${out}/source-hashes.json`)) throw new Error('Baseline already exists; refusing to replace the preservation record.');
fs.mkdirSync(out, { recursive: true });
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name).replaceAll('\\','/')]); }
const files = [...walk('src'), ...walk('public'), 'next.config.js', 'package.json'];
const records = files.map(file => ({ file, bytes: fs.statSync(file).size, sha256: crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') }));
fs.writeFileSync(`${out}/source-hashes.json`, JSON.stringify(records,null,2));
const content = [];
for (const file of files.filter(f => /\.(ts|tsx)$/.test(f))) {
  const source = fs.readFileSync(file,'utf8');
  fs.mkdirSync(path.dirname(`${out}/${file}`),{recursive:true});
  fs.copyFileSync(file,`${out}/${file}.txt`);
  const ast = ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  function visit(node) {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) && node.text.trim()) {
      content.push({ file, line: ast.getLineAndCharacterOfPosition(node.getStart(ast)).line+1, text: node.text.trim() });
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);
}
fs.writeFileSync(`${out}/all-source-content.json`,JSON.stringify(content,null,2));
console.log(`Preserved ${records.length} file hashes and ${content.length} source text items.`);
