// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB74ILdengNov0Y-jYDFfwirJWSMHVFPho",
  authDomain: "devinventary.firebaseapp.com",
  projectId: "devinventary",
  storageBucket: "devinventary.appspot.com",
  messagingSenderId: "919507975360",
  appId: "1:919507975360:web:142361b37de1135a510125",
  measurementId: "G-2XM6T5QFTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
