// The Cloud Functions for Firebase SDK to create Cloud Functions
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// MY CUSTOM CLOUD FUNCTION YAYYYYY
exports.myFunction = functions.pubsub.schedule("45 0 * * *")
    .timeZone("America/New_York")
    .onRun((context) => {
      console.log("We will run this at 12:30 AM");
      return null;
    });
