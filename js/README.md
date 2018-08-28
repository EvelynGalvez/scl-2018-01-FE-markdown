# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## Introducción

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con
el sistema operativo, sistema de archivos, redes, etc...
En este proyecto nos alejamos un poco del navegador para construir un programa
que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el
sistema, archivos y con el entorno (proceso, env, stdin/stdout/stderr), ...

## Objetivos

El objetivo práctico de este proyecto es que aprendas cómo crear tu propia
**librería** (o biblioteca - _library_) en JavaScript.
Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus _módulos_
y como será usado por otros developers, debes tener especial consideración en
peculiaridades del lenguaje, convenciones y buenas prácticas.

## Consideraciones generales

Este proyecto se debe "resolver" de manera individual.
La librería debe estar implementada en JavaScript para ser ejecutada con
Node.js.

## Parte obligatoria

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable (_archivo cli_) que podamos invocar en
la línea de comando como una interfaz que podamos importar con `require`
para usarlo programáticamente.

Los tests unitarios deben cubrir un mínimo del 70% de _statements_, _functions_,
_lines_ y _branches_. Te recomendamos explorar [Jest](https://jestjs.io/)
para tus pruebas unitarias.

Para comenzar este proyecto tendrás que hacer un _fork_ y _clonar_ este
repositorio.

Antes de comenzar a codear, es necesario crear un plan de acción. Esto debería
quedar detallado en el `README.md` de tu repo y en una serie de _issues_
y _milestones_ para priorizar y organizar el trabajo, y para poder hacer
seguimiento de tu progreso.

Dentro de cada _milestone_ se crearán y asignarán los _issues_ que cada quien
considere necesarios.

Para este proyecto necesitarás revisar los siguientes tópicos

Tópicos:

- [Node.js](https://nodejs.org/en/)
- [Node.js y npm](https://www.genbeta.com/desarrollo/node-js-y-npm)
- [Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?](http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)
- [Módulos(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
- [Semver](https://semver.org/)
- [Path](https://nodejs.org/api/path.html)
- [File System](https://nodejs.org/api/fs.html)
- [Asíncronía en js](https://carlosazaustre.com/manejando-la-asincronia-en-javascript/)

### Documentación requerida

En el archivo _README_ de tu proyecto tendrás que incluir:

- Descripción general de la librería.
- Instrucciones de instalación.
- Versiones de la librería.
- Documentación de la Librería (Features, link de Demo, test, etc...).
- Ejemplos (_snippets_) de uso.

Y todo lo relevante para que cualquier developer que quiera usar tu librería pueda hacerlo sin inconvenientes

### Archivos del proyecto

- `README.md` con descripción del módulo, instrucciones de instalación, uso y
  documentación del API.
- `index.js`: Desde este archivo debes exportar una función (`mdLinks`).
- `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...)
- `.eslintrc` con configuración para linter. Este archivo no
  se debe cambiar.
- `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
- `test/md-links.spec.js` debe contener los tests unitarios para la función
  `mdLinks()`tu implementación debe pasar estos tests.

### JavaScript API

El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - _currentworking directory_.

- `options`: Un objeto con la siguiente propiedad:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. (tipo de dato booleano)

##### Valor de retorno

La función debe retornar una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

/*
 * HACKER EDITION
 */
mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Línea de comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo y la linea donde aparece, así como
también el texto que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

## Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.

## Hacker edition

- Detectar y recorrer carpetas (recursivamente)
- Agregar una opción `--stats` para mostrar estadísticas del archivo, como
cuántos links encontró.
- Integración continua con Travis o Circle CI.

## Pistas / Tips / Recursos

### Pistas

- [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
- [Publicar packpage](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [Crear módulos en Node.js](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [Leer un archivo](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
- [Leer un Directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
- [Path](https://nodejs.org/api/path.html)
- [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

### Función que extrae links
```javascript
//Es necesario que instales marked como dependencia de tu proyecto
//npm install --save marked
const Marked = require('marked');

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
      });
  };
  Marked(markdown, {renderer: renderer});

  return links;
};
```

### Tutoriales / NodeSchool workshoppers

- [learnyounode](https://github.com/workshopper/learnyounode)
- [how-to-npm](https://github.com/workshopper/how-to-npm)
- [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)

### Otros recursos

- [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
- [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
- [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)
- [Node.js - Wikipedia](https://es.wikipedia.org/wiki/Node.js)
- [What exactly is Node.js? - freeCodeCamp](https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5)
- [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.drauta.com/que-es-nodejs-y-para-que-sirve)
- [¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube](https://www.youtube.com/watch?v=WgSc1nv_4Gw)
- [¿Simplemente qué es Node.js? - IBM Developer Works, 2011](https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html)

## Evaluación

### Tech

| Habilidad              | Nivel esperado |
| ---------------------- | -------------- |
| **JavaScript**         |                |
| Estilo                 | 4              |
| Nomenclatura/semántica | 3              |
| Funciones/modularidad  | 3              |
| Estructuras de datos   | 2              |
| Tests                  | 3              |
| **SCM**                |                |
| Git                    | 3              |
| GitHub                 | 3              |
| **CS**                 |                |
| Lógica                 | 3              |
| Arquitectura           | 3              |
| Patrones/paradigmas    | n/a            |

### Habilidades Blandas

Para este proyecto esperamos que ya hayas alcanzado el nivel 4 en todas tus
habilidades blandas. Te aconsejamos revisar la rúbrica:

| Habilidad                                                  | Nivel esperado |
| ---------------------------------------------------------- | -------------- |
| Planificación y organización                               | 4              |
| Autoaprendizaje                                            | 4              |
| Solución de Problemas                                      | 4              |
| Dar y recibir feedback                                     | 4              |
| Adaptabilidad                                              | 4              |
| Trabajo en equipo (trabajo colaborativo y responsabilidad) | 4              |
| Comunicación eficaz                                        | 4              |
| Presentaciones                                             | 4              |

## Checklist

### General

- [ ] Entrega el link del módulo publicado en npm

### `README.md`

- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [ ] El módulo exporta una función con la interfaz (API) esperada.
- [ ] Implementa soporte para archivo individual
- [ ] Implementa `options.validate`

### CLI

- [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [ ] Se ejecuta sin errores / output esperado
- [ ] Implementa `--validate`

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).
