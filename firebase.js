// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALY6HjzXhHij8qLJ66QZeOtXKHYSpXSyo",
  authDomain: "classroom-959b2.firebaseapp.com",
  projectId: "classroom-959b2",
  storageBucket: "classroom-959b2.appspot.com",
  messagingSenderId: "142587488813",
  appId: "1:142587488813:web:b93cb101aea60d643de6a4",
  measurementId: "G-GQEWHQBPE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);