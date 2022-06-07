import CheckValid from '../js/CheckValid';

test('checking the comma', () => {
  const checkValid = new CheckValid('51.50851 -0.12572');
  const returnValidator = checkValid.validator();

  expect(returnValidator).toBe('Широту и долготу должна разделять одна запятая');
});

test('check latitude value', () => {
  const checkValid = new CheckValid('51.50851., -0.12572');
  const returnValidator = checkValid.validator();

  expect(returnValidator).toBe('Значение широты указано некорректно');
});

test('check longitude value', () => {
  const checkValid = new CheckValid('51.50851, -0.125a72');
  const returnValidator = checkValid.validator();

  expect(returnValidator).toBe('Значение долготы указано некорректно');
});

test('check "-90 < latitude < 90"', () => {
  const checkValid = new CheckValid('151.50851, -0.12572');
  const returnValidator = checkValid.validator();

  expect(returnValidator).toBe('Широта должна быть от -90 до 90');
});

test('check "-180 < longitude < 180"', () => {
  const checkValid = new CheckValid('51.50851, -200.12572');
  const returnValidator = checkValid.validator();

  expect(returnValidator).toBe('Долгота должна быть от -180 до 180');
});

test('check correct value', () => {
  const checkValid = new CheckValid('[51.50851, -0.12572]');
  const returnValidator = checkValid.validator();

  expect(typeof returnValidator).toBe('object');
});
