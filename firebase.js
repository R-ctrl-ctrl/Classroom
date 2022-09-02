import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

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

const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

export  {auth,storage,db}