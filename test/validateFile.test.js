const validateFile = require('../js/validateFile');

test('debería retornar true para path absoluto', () => {
  expect(isAbsolut('')).toBe(true);
});

test('debería retornar true para archivo con extensión .md', () => {
  expect(isMd('../README.md')).toBe(true);
});

test('debería retornar false para archivo con extensión distinta a .md', () => {
  expect(isMd('ruta de archivo que no es md')).toBe(false);
});