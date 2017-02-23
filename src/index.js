import * as admin from "firebase-admin";

let options = this.createOptionsFromEnvVariables();

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
                var uid = decodedToken.uid;
            }).catch(function (error) {
                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth is invalid for this user.');
            });
    }

    validateAppId() {
        return Promise.resolve();
    }

    createOptionsFromEnvVariables() {
        let options = {};
        options = this.requiredOrFromEnvironment(options, 'credential', 'FIREBASE_SERVICE_ACCOUNT_KEY');
        options = this.requiredOrFromEnvironment(options, 'databaseURL', 'FIREBASE_DATABASE_URL');
        return options;
    }

    requiredOrFromEnvironment(options, key, env) {
        options[key] = options[key] || process.env[env];
        if (!options[key]) {
            throw `Firebase auth adater requires an ${key}`;
        }
        return options
    }
}

export default FirebaseAuth;
module.exports = FirebaseAuth;
