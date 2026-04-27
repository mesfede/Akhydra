import fs from 'fs';
const text = fs.readFileSync('output3.html', 'utf8');
const images = [...text.matchAll(/src="([^"]*\.(jpg|jpeg|png))"/ig)].map(m => m[1]);
console.log('--- IMAGES ---');
console.log(Array.from(new Set(images)).join('\n'));
const pTags = [...text.matchAll(/<p[^>]*>(.*?)<\/p>/gs)].map(m => m[1]);
console.log('--- CONTENT ---');
console.log(pTags.map(p => p.replace(/<[^>]+>/g, '').trim()).filter(p => p).join('\n'));
