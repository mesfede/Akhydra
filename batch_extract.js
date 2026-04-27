import fs from 'fs';

const urls = [
  {id: 'arquitectura', url: 'https://akhydra.com.ar/arquitectura/'},
  {id: 'asesoramiento', url: 'https://akhydra.com.ar/asesoramiento/'},
  {id: 'civil', url: 'https://akhydra.com.ar/civil/'},
  {id: 'eng-renovables', url: 'https://akhydra.com.ar/energias-renovables/'},
  {id: 'ferrocarril', url: 'https://akhydra.com.ar/ferrocarril/'},
  {id: 'geologia', url: 'https://akhydra.com.ar/geologia/'},
  {id: 'geotecnia', url: 'https://akhydra.com.ar/geotecnia/'},
  {id: 'gestoria', url: 'https://akhydra.com.ar/gestoria/'},
  {id: 'hidraulica', url: 'https://akhydra.com.ar/hidraulica/'},
  {id: 'higiene', url: 'https://akhydra.com.ar/higiene-seguridad/'},
  {id: 'industrial', url: 'https://akhydra.com.ar/industrial/'},
  {id: 'mecanica', url: 'https://akhydra.com.ar/mecanica/'},
  {id: 'sanitaria', url: 'https://akhydra.com.ar/sanitaria/'},
  {id: 'vial', url: 'https://akhydra.com.ar/vial/'}
];

async function processData() {
  const result = {};
  for (const item of urls) {
    try {
      const res = await fetch(item.url);
      const text = await res.text();
      const images = [...text.matchAll(/src="([^"]*\.(jpg|jpeg|png))"/ig)].map(m => m[1]);
      const uniqueImages = Array.from(new Set(images));
      
      const filteredImages = uniqueImages.filter(img => 
        !img.includes('logo') && 
        !img.includes('-150x150') && 
        !img.includes('avatar')
      );
      
      result[item.id] = filteredImages;
    } catch(err) {
      console.log('Error fetching', item.url, err.message);
    }
  }
  fs.writeFileSync('extracted_images.json', JSON.stringify(result, null, 2));
}

processData().then(() => console.log('Done'));
