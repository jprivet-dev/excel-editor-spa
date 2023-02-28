export const emptyConsole = () => {
  console.log = () => {};
  console.debug = () => {};
};
