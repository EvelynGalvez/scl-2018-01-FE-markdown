const validateFile = require('./js/validateFile');

test('debería retornar true para archivo con extensión md', () => {
  expect(validateFile('../README.md')).toBe(true);
});

test('debería retornar false para archivo que no es md', () => {
  expect(validateFile('ruta de archivo que no es md')).toBe(false);
});