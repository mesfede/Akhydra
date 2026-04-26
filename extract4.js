import fs from 'fs';
const text = fs.readFileSync('output4.html', 'utf8');
const images = [...text.matchAll(/src="([^"]*\.(jpg|jpeg|png))"/ig)].map(m => m[1]);
console.log('--- IMAGES ---');
console.log(Array.from(new Set(images)).join('\n'));
