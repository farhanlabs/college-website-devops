import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set, update, remove, onValue, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAakin_nGepRvW-t3tww9b74Uyga2TpekQ",
  authDomain: "mecw-c144c.firebaseapp.com",
  databaseURL: "https://mecw-c144c-default-rtdb.firebaseio.com",
  projectId: "mecw-c144c",
  storageBucket: "mecw-c144c.firebasestorage.app",
  messagingSenderId: "556421945718",
  appId: "1:556421945718:web:39032addf8a0eff4a10257",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const addItem = async (path: string, data: Record<string, any>) => {
  const newRef = push(ref(db, path));
  await set(newRef, { ...data, id: newRef.key });
  return newRef.key;
};

export const updateItem = (path: string, id: string, data: Record<string, any>) =>
  update(ref(db, `${path}/${id}`), data);

export const deleteItem = (path: string, id: string) =>
  remove(ref(db, `${path}/${id}`));

export const subscribeToData = (path: string, callback: (items: any[]) => void) =>
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    callback(data ? Object.entries(data).map(([key, val]: [string, any]) => ({ ...val, id: key })) : []);
  });

export const subscribeToValue = (path: string, callback: (val: any) => void) =>
  onValue(ref(db, path), (snapshot) => callback(snapshot.val()));

export const setValue = (path: string, data: any) => set(ref(db, path), data);

export const getData = async (path: string) => {
  const snapshot = await get(ref(db, path));
  return snapshot.val();
};
