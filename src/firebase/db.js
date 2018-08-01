import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, phonenum) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    phonenum,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...