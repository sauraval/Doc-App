// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSKoPAVP9DQMACO4iOxacIvW0_lDEdpqc",
  authDomain: "docapp-e2fdf.firebaseapp.com",
  projectId: "docapp-e2fdf",
  storageBucket: "docapp-e2fdf.appspot.com",
  messagingSenderId: "832636776102",
  appId: "1:832636776102:web:f16fdf7436016cb07ece67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)