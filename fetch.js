import fs from 'fs';
fetch('https://akhydra.com.ar/barrio-privado-ayres-de-cardales-campana-buenos-aires/')
  .then(res => res.text())
  .then(text => {
    fs.writeFileSync('output.html', text);
    console.log('Done');
  });
