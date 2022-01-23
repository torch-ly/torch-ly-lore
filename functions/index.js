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
const {isGM, getUser} = require("./authorised");
const cors = require('cors')({origin: true});

admin.initializeApp();

// create a new user when they sign up
exports.createUserObject = functions.auth.user().onCreate(async (user) => {
    await admin.firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.log("User created:", user);

});

exports.getInviteLink = functions.https.onCall(async (data, context) => {
    const campaign = data.campaign;

    if (campaign === undefined || campaign === null || campaign === "") {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a campaign.');
    }

    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    if (!(await isGM(context.auth.uid, campaign))) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'by a GM.');
    }

    const {id} = await admin.firestore().collection('campaigns').doc(campaign).collection("invites").add({
        createdBy: context.auth.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.log("Invite link created:", id);

    return id;
});

exports.joinCampaign = functions.https.onCall(async (data, context) => {
    const campaign = data.campaign;
    const key = data.key;

    if (campaign === undefined || campaign === null || campaign === "") {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a campaign.');
    }

    if (key === undefined || key === null || key === "") {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a key.');
    }

    if (context.auth == null) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    const invite = await admin.firestore().collection('campaigns').doc(campaign + "").collection("invites").doc(key + "").get();
    if (!invite.exists) {
        throw new functions.https.HttpsError('not-found', 'The invite does not exist.');
    }

    let {users, gms} = (await admin.firestore().collection('campaigns').doc(campaign + "").get()).data();
    if (users.includes(context.auth.uid) || gms.includes(context.auth.uid)) {
        throw new functions.https.HttpsError('failed-precondition', 'You are already in this campaign.');
    }

    await admin.firestore().collection('campaigns').doc(campaign + "").collection("invites").doc(key + "").delete();

    users.push(context.auth.uid);
    await admin.firestore().collection('campaigns').doc(campaign + "").update({
        users: users
    });

    functions.logger.log("User " + context.auth.uid + " joined campaign:", campaign);
});
