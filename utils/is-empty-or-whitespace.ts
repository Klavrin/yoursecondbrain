export const isEmptyOrWhitespace = (str: string) => {
  return typeof str === 'string' && str.trim() === ''
}
