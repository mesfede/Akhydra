import fs from 'fs';
const text = fs.readFileSync('output.html', 'utf8');
const pTags = [...text.matchAll(/<p[^>]*>(.*?)<\/p>/gs)].map(m => m[1]);
console.log(pTags.map(p => p.replace(/<[^>]+>/g, '').trim()).filter(p => p).join('\n'));
