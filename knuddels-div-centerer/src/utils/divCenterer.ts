// Centers a given HTML element within parent
export const centerDiv = (element: HTMLElement) => {
  const parent = element.parentElement;
  if (parent) {
    element.style.position = "absolute";
    element.style.top = `${(parent.clientHeight - element.clientHeight) / 2}px`;
    element.style.left = `${(parent.clientWidth - element.clientWidth) / 2}px`;
  }
};
