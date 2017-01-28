import * as admin from "firebase-admin";

class FirebaseAuth {

    constructor() {
        
        //let options = createOptionsFromEnvVariables();

        // admin.initializeApp({
        //     credential: admin.credential.cert(require(options.serviceAccountKey)),
        //     databaseURL: options.databaseURL
        // });

    }

    validateAuthData(authData,options) {

        admin.initializeApp({
            credential: admin.credential.cert(require(options.serviceAccountKey)),
            databaseURL: options.databaseURL
        });

        return admin.auth().verifyIdToken(authData.access_token)
        .then(function(decodedToken){
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
        options = this.requiredOrFromEnvironment(options, 'serviceAccountKey', 'FIREBASE_SERVICE_ACCOUNT_KEY');
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

function createFirebaseAuth() {
    return new FirebaseAuth();
}

let ParseFirebaseAuth = {
    createFirebaseAuth
}

export {
    ParseFirebaseAuth
}