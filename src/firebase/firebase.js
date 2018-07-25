import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyB4G-Gp1Ghho4vE1s5XYXuHrciA49R8bbI",
    authDomain: "kuski-c3f4f.firebaseapp.com",
    databaseURL: "https://kuski-c3f4f.firebaseio.com",
    projectId: "kuski-c3f4f",
    storageBucket: "kuski-c3f4f.appspot.com",
    messagingSenderId: "268946331884"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  const db = firebase.database();
  const auth = firebase.auth();

export {
  db,
  auth,
};