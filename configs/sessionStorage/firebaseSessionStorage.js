const express = require('express');
const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
var admin = require("firebase-admin");
const ref = firebase.initializeApp({
  credential: firebase.credential.cert('path/to/serviceAccountCredentials.json'),
  databaseURL: 'https://databaseName.firebaseio.com'
});
module.exports = {
    store : new FirebaseStore({
        database: ref.database()
      })
}