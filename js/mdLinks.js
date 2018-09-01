const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const linkExtractor = require('./linkExtractor');
const options = {};

// Verifica si ruta es absoluta
const routeIsAbsolute = () => {
  if (path.isAbsolute(process.argv[3])) {
    return true;
  }
};

// Verifica si ruta es relativa 
const ruoteIsRelative = () => {
  if (path.isRelative(process.argv[3])) {
    return true;
  };
};

// Construcción de la ruta para buscar el archivo.
const routeConstruction = () => {
  if (process.argv[2] !== undefined) {
    options.validate = process.argv[3];
    const directory = process.cwd();
    let route = process.argv[2];
    let absRoute = path.resolve(route);
    return absRoute;
  } else {
    let error = 'Debes ingresar la ruta al archivo que deseas analizar, relativa a tu ubicación actual';
    console.error(error);
  }
  return;
};


exports.mdLinks = () => {
  if (routeConstruction()) { // Si existe la ruta, se realiza el análisis de archivos y/o directorios
    let stats = fs.statSync(routeConstruction());
    if (stats.isFile()) {
      console.log('ruta corresponde a un archivo');
      let fileMD = routeConstruction();
      fs.readFile(fileMD, 'utf8', (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          let line = data.split('\n').map((element, index) => linkExtractor.markdownLinkExtractor(element, index + 1));
          line = line.filter(element => element.length !== 0);
          let lineLinks = line.reduce((value1, value2) => value1.concat(value2));
          let dataLinks = linkExtractor.markdownLinkExtractor(data);
          lineLinks.forEach(element => {
            fetch(element.href, fileMD).then((response) => {
              if (options.validate === '--validate') {
                console.log(fileMD + ' ' + element.href + ' ' + '  linea en documento: ' + element.line + ' ' + 'Status: ' + response.status + '  ' + response.statusText);
              } else {
                console.log(fileMD + ' ' + element.href + '  linea en documento: ' + element.line);
              }
            }).catch((error) => {
              console.log(fileMD + ' ' + element.href + '  linea en documento: ' + element.line + '  ' + 'link caído');
            });
          });
        }
      });     
    } else if (stats.isDirectory()) {
      console.log('ruta corresponde a un directorio');
      fs.readdir(routeConstruction(), (error, files) => {
        files.forEach(file => {
          if (path.extname(file) === '.md') {
            console.log('se han encontrado archivos .md:');
            console.log(file);
            let fileMD = routeConstruction() + '\\' + file;
            console.log(fileMD);
            fs.readFile(fileMD, 'utf8', (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                let line = data.split('\n').map((element, index) => linkExtractor.markdownLinkExtractor(element, index + 1));
                line = line.filter(element => element.length !== 0);
                let lineLinks = line.reduce((value1, value2) => value1.concat(value2));
                let dataLinks = linkExtractor.markdownLinkExtractor(data);
                lineLinks.forEach(element => {
                  fetch(element.href, fileMD).then((response) => {
                    if (options.validate === '--validate') {
                      console.log(fileMD + ' ' + element.href + ' ' + '  linea en documento: ' + element.line + ' ' + 'Status: ' + response.status + '  ' + response.statusText);
                    } else {
                      console.log(fileMD + ' ' + element.href + '  linea en documento: ' + element.line);
                    }
                  }).catch((error) => {
                    console.log(fileMD + ' ' + element.href + '  linea en documento: ' + element.line + '  ' + 'link caído');
                  });
                });
              }
            });
          } else {
            console.log('No se encontraron archivos .md');
          }
        });
      });
    } else {
      console.log('no es una ruta válida');
    }
  }
};