import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { auth } from "./firebase";
import router from "../router";

export const uiConfig = {
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult() {
            router.push("/");
        }
    }
};

export const ui = new firebaseui.auth.AuthUI(auth);
