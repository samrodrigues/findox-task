export const sortLowerCase = (a, b) => {
  const stringA = typeof a === 'string' ? a : String(a);
  const stringB = typeof b === 'string' ? b : String(b);

  return stringA.localeCompare(stringB, undefined, { sensitivity: 'base' });
};

export const pluralize = (word, number, pluralSuffix = 's') => {
  return word + (number > 1 ? pluralSuffix : '');
}
