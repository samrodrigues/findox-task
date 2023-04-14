export const sortLowerCase = (a, b) => {
  const lowerA = typeof a === 'string' ? a.toLowerCase() : a;
  const lowerB = typeof b === 'string' ? b.toLowerCase() : b;
  if (lowerA < lowerB) return -1;
  if (lowerA > lowerB) return 1;
  return 0;
}
