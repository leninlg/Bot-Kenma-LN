const fs = require('fs');
const path = './data';
const archivos = ['bienvenida.json', 'despedida.json', 'reglas.json', 'advertencias.json', 'cumpleaños.json'];

// Crear carpeta data si no existe
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}

archivos.forEach(file => {
    const filePath = `${path}/${file}`;
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}');
        console.log(`Archivo creado: ${file}`);
    } else {
        console.log(`Archivo ya existe: ${file}`);
    }
});