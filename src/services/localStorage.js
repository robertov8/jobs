export const saveToLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getFromLocalStorage = (name, option = false) => {
  return JSON.parse(localStorage.getItem(name)) || option;
};
