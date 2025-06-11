export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return null;
  }
  return a - b;
}
