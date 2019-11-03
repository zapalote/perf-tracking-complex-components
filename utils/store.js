'use strict';
// model layer over AsyncStorage
import AsyncStorage  from '@react-native-community/async-storage';

let setError;
function setErrorMethod (method) {
  setError = method;
}

async function get(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return (value !== null) ? JSON.parse(value) : null;
  } catch (error) {
    setError && setError(error);
  }
}

async function set(key, value) {
  if (!key){
    setError && setError(`undefined ${key}[${value}]`);
    return null;
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    setError && setError(error);
  }
}

async function remove(key) {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    setError && setError(error);
  }
}

export default {
  get,
  set,
  remove,
  setErrorMethod
};
