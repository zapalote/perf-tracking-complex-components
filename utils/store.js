'use strict';
// model layer over AsyncStorage
import AsyncStorage  from '@react-native-community/async-storage';

async function get(key, setError) {
  try {
    const value = await AsyncStorage.getItem(key);
    return (value !== null) ? JSON.parse(value) : null;
  } catch (error) {
    setError && setError(error);
  }
}

async function set(key, value, setError) {
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

async function remove(key, setError) {
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
};
