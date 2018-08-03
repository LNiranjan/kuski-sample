import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, phonenum) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    phonenum,
  });
  export const doCreateDriver = (id, username, email, phonenum) =>
  db.ref(`drivers/${id}`).set({
    username,
    email,
    phonenum,
  });


export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
export const locationTracking = (id, lat, lng) =>
  db.ref(`users/${id}/${new Date().getTime()}`).set({
    lat,
    lng
  })