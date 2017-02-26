import * as admin from "firebase-admin";
import { FirebaseUtil } from './util';

let options = FirebaseUtil.createOptionsFromEnvironment();

admin.initializeApp({
    credential: admin.credential.cert(require(options.credential)),
    databaseURL: options.databaseURL
});

export class FirebaseAuth {

    constructor() {
    }

    validateAuthData(authData, options) {
        return admin.auth().verifyIdToken(authData.access_token)
            .then(function (decodedToken) {
                if (decodedToken && decodedToken.uid == authData.id) {
                    return;                    
                }

                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');

            }).catch(function (error) {
                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth is invalid for this user.');
            });
    }

    validateAppId() {
        return Promise.resolve();
    }
}

export default FirebaseAuth;
module.exports = FirebaseAuth;
