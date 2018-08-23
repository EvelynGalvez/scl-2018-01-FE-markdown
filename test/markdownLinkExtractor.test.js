// Testear que función reciba un texto markdown.
// Testear que arreglo links contiene links.
// Testear que cada link contiene href, text y title.


const Marked = require('marked');
const fs = require('fs');

mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    validate.isFileOrDirectory(path).then((response) => {
      if (response === 'file') {
        process.file(path).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      } else if (response === 'directory') {
        process.directory(path).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

let validate = {};
let process = {};
process.directory = (path) =>{
  return new Promise((resolve, reject) => {
    fs.readdir(path, 'utf8', (err, files) => {
      console.log(files);
      let promises = [];
      files.forEach(file => {
        if (validate.isMarkDown(file)) {
          promises.push(process.file(path + file).then((response) => {
            return response;
          }).catch((err) => {
            console.log(err);
          }));
        }
      });
      Promise.all(promises).then(values => {
        resolve(values);
      });
    });
  });
};
process.file = (path) => {
  return new Promise((resolve, reject) => {
    if (validate.isMarkDown(path)) {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        let links = markdownLinkExtractor(path, data);
        validate.hasLinks(links) ? resolve(links) : reject('No se encontrarón Enlaces');
      });
    } else {
      reject('No es un archivo mark down');
    }
  });
};
validate.isFileOrDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, function(err, stats) {
      if (err !== null) {
        reject('No es un archivo ni directorio');
      } else if (stats.isFile()) {
        resolve('file');
      } else if (stats.isDirectory()) {
        resolve('directory');
      }
    });
  });
};
validate.isMarkDown = (file) => {
  let allowedExtension = /(\.md)$/i;
  return result = !allowedExtension.exec(file) ? false : true;
};
validate.hasLinks = (array) => {
  return result = array.length === 0 ? false : true;
};
function markdownLinkExtractor(path, markdown) {
  const links = [];
  const renderer = new Marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      path: path,
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      path: path,
    });
  };
  Marked(markdown, { renderer: renderer });

  return links;
};
module.exports = mdLinks;