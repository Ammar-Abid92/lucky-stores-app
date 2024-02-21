// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw6RjOQwSUZ0IejRiWDfmF8JiTa7rurpw",
  authDomain: "lucky-stores-fb252.firebaseapp.com",
  projectId: "lucky-stores-fb252",
  storageBucket: "lucky-stores-fb252.appspot.com",
  messagingSenderId: "206970926034",
  appId: "1:206970926034:web:637b8d8b5cfd3918fb4e0b",
  measurementId: "G-K9CG6KT43L"
};

// initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const database = getFirestore();

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}
// console.log("APP------>", app.firestore().collection('categories').get().then(res=>console.log("===>",res.docs.map(doc => doc.data()))))
export const database = app.firestore();
export const auth = firebase.auth();
export default app;

