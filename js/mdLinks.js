const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const linkExtractor = require('./linkExtractor');
const options = {};

console.log('process.argv: ' + JSON.stringify(process.argv));

// Construcción de la ruta para buscar el archivo.
const routeConstruction = () => {
  if (process.argv[2] !== undefined) {
    options.validate = process.argv[3];
    const directory = process.cwd();
    let route = process.argv[2];
    let absRoute = path.resolve(route);
    console.log('ruta: ' + absRoute);
    return absRoute;
  } else {
    let error = 'Debes ingresar la ruta al archivo que deseas analizar, relativa a tu ubicación actual';
    console.error(error);
  }
  return;
};

exports.mdLinks = () => {
  if (routeConstruction()) {
    let stats = fs.statSync(routeConstruction());
    if (stats.isFile()) {
      console.log('ruta corresponde a un archivo');
      let fileMD = routeConstruction();
      fs.readFile(fileMD, 'utf8', (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          let dataLinks = linkExtractor.markdownLinkExtractor(data);
          dataLinks.forEach(link => {
            fetch(link.href, fileMD).then((response) => {
              if (options.validate === '--validate') {
                console.log(fileMD + ' ' + link.href + ' ' + 'Status: ' + response.status + '  ' + response.statusText);
              } else {
                console.log(fileMD + ' ' + link.href);
              }
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
                let dataLinks = linkExtractor.markdownLinkExtractor(data);
                dataLinks.forEach(link => {
                  fetch(link.href, fileMD).then((response) => {
                    if (options.validate === '--validate') {
                      console.log(fileMD + ' ' + link.href + ' ' + 'Status: ' + response.status + '  ' + response.statusText);
                    } else {
                      console.log(fileMD + ' ' + link.href);
                    }
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
    // return;
  }
};

/*
exports.mdLinks = (markdownLinkExtractor) => {
  if (routeConstruction()) {
    fs.readdir(routeConstruction(), (error, files) => {
      files.forEach(file => {
        if (path.extname(file) === '.md') {
          console.log('se han encontrado archivos .md:');
          console.log(file);
          let fileMD = routeConstruction() + '\\' + file;
          console.log(fileMD);
        *  fs.readFile(fileMD, 'utf8', (err, data) => {
            if (err) {
              console.log(err.message);
            } else {
              let dataLinks = linkExtractor.markdownLinkExtractor(data);
              dataLinks.forEach(link => {
                fetch(link.href, fileMD).then((response) => {
                  if (options.validate === '--validate') {
                    console.log(fileMD + ' ' + link.href + ' ' + 'Status: ' + response.status + '  ' + response.statusText);
                  } else {
                    console.log(fileMD + ' ' + link.href);
                  }
                });
              });
            }
          }); *
        } else {
          console.log('No se encontraron archivos .md');
        }
      });
    });
    return;
  }
};
*/