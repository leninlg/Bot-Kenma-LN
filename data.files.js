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

function initDataFiles() {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log('Carpeta "data" creada.');
  }

  archivos.forEach(file => {
    const filePath = path.join(dataFolder, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '{}');
      console.log(`Archivo ${file} creado con contenido vacío.`);
    }
  });
}

function readJSON(fileName) {
  const filePath = path.join(dataFolder, fileName);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    fs.writeFileSync(filePath, '{}');
    return {};
  }
}

function writeJSON(fileName, data) {
  const filePath = path.join(dataFolder, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  initDataFiles,
  readJSON,
  writeJSON
};