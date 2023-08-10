import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const storagePushArray = (name: string, item: any) => {
  const rawArray = storage.getString(name);

  if (!rawArray) {
    const newArray = [item];
    storage.set(name, JSON.stringify(newArray));
    return newArray;
  }

  const currentStored = JSON.parse(rawArray);

  if (!(currentStored instanceof Array)) return;

  const newArray = [...currentStored, item];

  storage.set(name, JSON.stringify(newArray));
  return newArray;
};

export const storageDeleteFromArray = (name: string, id: string | number) => {
  const rawArray = storage.getString(name);

  if (!rawArray) return;

  const currentStored = JSON.parse(rawArray);

  if (!(currentStored instanceof Array)) return;

  const newArray = currentStored.filter(item => String(item.id) != String(id));
  storage.set(name, JSON.stringify(newArray));

  return newArray;
};
