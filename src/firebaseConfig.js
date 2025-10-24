// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSQKn4Xkuz4qqN2BADuWhue8cRb25XnC0",
  authDomain: "mi-app-modular-25745.firebaseapp.com",
  projectId: "mi-app-modular-25745",
  storageBucket: "mi-app-modular-25745.firebasestorage.app",
  messagingSenderId: "914118416101",
  appId: "1:914118416101:web:70b2a1aa772c9e8f5d260c",
  measurementId: "G-LEB3TSHR1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);

/*
Hacer que la lista de tareas guarde un historico de las tareas completadas con la fecha de cuando se completaron y tareas eliminadas con la fecha en que se eliminaron.
*/