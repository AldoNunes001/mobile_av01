// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  Auth,
} from 'firebase/auth';

// @ts-ignore 
// import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getReactNativePersistence } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKpERPffLDrxPOE5cPsAEhCd7ZksYt0Jo",
  authDomain: "e-commerce-73d3c.firebaseapp.com",
  projectId: "e-commerce-73d3c",
  storageBucket: "e-commerce-73d3c.firebasestorage.app",
  messagingSenderId: "603814386319",
  appId: "1:603814386319:web:ec4a1773d229d552f02efa",
  measurementId: "G-RMJ5YQ4N3S"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let auth: Auth;
if (getApps().length === 0) {
  // primeira carga (sem hot-reload)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  // hot-reload: só pega a instância já criada
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };