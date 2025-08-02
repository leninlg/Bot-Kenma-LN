const fs = require('fs');
const path = './data';

// Datos iniciales para cada archivo JSON
const archivos = {
  'bienvenida.json': {
    "123456789@g.us": {
      "bienvenida": true,
      "mensaje": "¡Hola @usuario! Bienvenido al grupo @grupo ✨"
    }
  },
  'niveles.json': {
    "521234567890@c.us": {
      "nivel": 3,
      "experiencia": 450
    }
  },
  'monedas.json': {
    "521234567890@c.us": {
      "monedas": 100
    }
  },
  'premium.json': {
    "521234567890@c.us": true,
    "521111111111@c.us": true
  },
  'afk.json': {
    "521234567890@c.us": {
      "afk": true,
      "razon": "Estoy ocupado estudiando",
      "tiempo": 1691189345
    }
  },
  'baneados.json': {
    "521111111111@c.us": {
      "razon": "Uso indebido de comandos",
      "fecha": "2025-08-01"
    }
  },
  'spam.json': {
    "521234567890@c.us": {
      "conteo": 4,
      "ultimoMensaje": 1691189900
    }
  },
  'registro.json': {
    "521234567890@c.us": {
      "nombre": "Kenma",
      "edad": 17,
      "genero": "masculino"
    }
  }
};

// Crear carpeta data si no existe
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

// Crear cada archivo con su contenido JSON
for (const [archivo, contenido] of Object.entries(archivos)) {
  fs.writeFileSync(`${path}/${archivo}`, JSON.stringify(contenido, null, 2));
  console.log(`Archivo ${archivo} creado.`);
}

console.log('¡Todos los archivos JSON fueron creados correctamente en la carpeta data/');
