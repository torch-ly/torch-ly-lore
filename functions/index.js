const functions = require("firebase-functions");

/*
*
* firebase.json
  "emulators": {
        "auth": {
            "port": 9099,
            "host": "127.0.0.1"
        },
        "functions": {
            "port": 5001,
            "host": "127.0.0.1"
        },
        "firestore": {
            "port": 8080,
            "host": "127.0.0.1"
        },
        "hosting": {
            "port": 5001
        },
        "ui": {
            "enabled": true
        },
        "pubsub": {
            "port": 8085,
            "host": "127.0.0.1"
        },
        "storage": {
            "port": 9199,
            "host": "127.0.0.1"
        }
    }
*
* */

const admin = require('firebase-admin');
admin.initializeApp();

// create a new user when they sign up
exports.createUserObject = functions.auth.user().onCreate(async (user) => {
    await admin.firestore().collection("users" ).doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.log("User created:", user.uid);

});
