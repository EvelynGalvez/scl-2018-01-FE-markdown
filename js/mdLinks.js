const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const linkExtractor = require('./linkExtractor');
const options = require('../index');

const routeConstruction = () => {
  options.validate = process.argv[3];
  const directory = process.cwd();
  let route = process.argv[2];
  let absRoute = path.resolve(route);
  console.log('ruta: ' + absRoute);
  return absRoute;
};

exports.mdLinks = (markdownLinkExtractor) => {
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
              fetch(link.href).then((response) => {
                if (options.validate) {
                  console.log(link.href + 'Status: ' + response.status + '  ' + response.statusText);
                } else {
                  console.log(link.href);
                }
              });
            });
          }
        });
      }    
    });
  });
  return;
};