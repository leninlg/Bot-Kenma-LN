const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, 'data');

const archivos = [
  'bienvenida.json',
  'despedida.json',
  'reglas.json',
  'advertencias.json',
  'cumpleaños.json'
];

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log('Carpeta "data" creada.');
}

archivos.forEach(file => {
  const filePath = path.join(dataFolder, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}');
    console.log(`Archivo ${file} creado con contenido vacío.`);
  } else {
    console.log(`Archivo ${file} ya existe.`);
  }
});

console.log('Inicialización de archivos completada.');