import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBirUq9_OgECvX8Hx8gPREI5cpVbHvCfoc",
    authDomain: "torch-ly-lore.firebaseapp.com",
    projectId: "torch-ly-lore",
    storageBucket: "torch-ly-lore.appspot.com",
    messagingSenderId: "1071594316949",
    appId: "1:1071594316949:web:f7d8cdde28ce94e402e79c"
});

export const db = firebase.firestore();
export const auth = firebase.auth();
