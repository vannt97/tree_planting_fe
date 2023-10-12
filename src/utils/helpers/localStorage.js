// localStorage.js

const USER_TOKEN = 'USER_TOKEN';

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const getData = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};
const saveState = (key, value) => {
  try {
    const serializedState = value;
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};
const deleteData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export const getToken = () => {
  try {
    const value = getData(USER_TOKEN);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};
export const saveToken = (value) => {
  try {
    saveState(USER_TOKEN, value);
    return true;
  } catch {
    return false;
  }
};
export const deleteToken = () => {
  const result = deleteData(USER_TOKEN);
  return result;
};
