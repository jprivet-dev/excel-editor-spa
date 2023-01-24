export const emptyToNull = (value: any): any => {
  Object.keys(value).forEach(
    (k) => (value[k] = value[k] === '' ? null : value[k])
  );

  return value;
};
