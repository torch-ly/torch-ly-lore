const admin = require("firebase-admin");

async function getUid(req) {
    if (!req.get('Authorization')) {
        return  null;
    }

    const tokenId = req.get('Authorization').split('Bearer ')[1];

    let {uid} = await admin.auth().verifyIdToken(tokenId);

    return uid;
}

async function isGM(uid, campaign) {

    const {gms} = (await admin.firestore().collection('campaigns').doc(campaign).get()).data();

    return gms.includes(uid);
}

exports.isGM = isGM;
exports.getUid = getUid;
