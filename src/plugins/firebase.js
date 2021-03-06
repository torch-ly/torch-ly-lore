import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getFunctions } from "firebase/functions";
import { GoogleAuthProvider } from "firebase/auth"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.VUE_APP_CAPTCHA_PUBLIC_KEY),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});

export const functions = getFunctions();

//
// Remove this comment to use the local emulator for firebase
//

/*
import {connectAuthEmulator} from "firebase/auth";
import {connectFirestoreEmulator} from "firebase/firestore";
import {connectFunctionsEmulator} from "firebase/functions";

connectAuthEmulator(auth, 'http://localhost:9099');
connectFunctionsEmulator(functions, 'localhost', 5001);
connectFirestoreEmulator(db, 'localhost', 8080);
*/
