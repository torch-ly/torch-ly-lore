import 'firebase/firestore'
import 'firebase/auth'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseApp = initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
});
export const db = getFirestore();
export const auth = getAuth();
auth.useDeviceLanguage();

export const googleProvider = new GoogleAuthProvider();
