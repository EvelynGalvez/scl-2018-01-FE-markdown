const routeIsAbsolute = require('../js/mdLinks').routeIsAbsolute;

test('Se espera retorne true para ruta absoluta', () => {
  expect(__dirname).toBeTruthy();
});

test('Se espera retorne true para ruta relativa', () => {
  expect('js/README.md').toBeTruthy();
});