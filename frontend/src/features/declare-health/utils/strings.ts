export const camelCaseToWords = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};
