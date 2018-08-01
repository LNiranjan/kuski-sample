import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBx5DgzrI7hlA9-gBDq6iMSlB2t5CpARvg",
  authDomain: "kuski-af7b5.firebaseapp.com",
  databaseURL: "https://kuski-af7b5.firebaseio.com",
  projectId: "kuski-af7b5",
  storageBucket: "kuski-af7b5.appspot.com",
  messagingSenderId: "1086173666533"
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