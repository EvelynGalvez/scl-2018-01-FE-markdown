const mdLinks = require('../js/mdLinks');

test('función routeConstruction debería retornar un valor', () => {
  expect(directory('')).toBe(true);
});

test('debería retornar true para archivo con extensión .md', () => {
  expect(isMd('../README.md')).toBe(true);
});

test('debería retornar false para archivo con extensión distinta a .md', () => {
  expect(isMd('ruta de archivo que no es md')).toBe(false);
});