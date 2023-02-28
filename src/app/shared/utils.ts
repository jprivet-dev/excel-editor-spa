export const emptyToNull = (value: any): any => {
  Object.keys(value).forEach(
    (k) => (value[k] = value[k] === '' ? null : value[k])
  );

  return value;
};

// @see https://stackoverflow.com/a/154068
export const toEmpty = (value: any): string => {
  return !value ? '' : value; // Value was empty string, false, 0, null, undefined, ...
};
