const validateFile = require('./js/validateFile');


test('debería retornar true para archivo con extensión md', () => {
  expect(validateFile('../README.md')).toBe(true);
});