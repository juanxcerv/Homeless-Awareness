import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

var app = firebase.initializeApp({
  apiKey: "AIzaSyCro5W72Gp7uXOZESS5wZEaIuRXE6tiB6U",
  authDomain: "homeless-awareness.firebaseapp.com",
  databaseURL: "https://homeless-awareness.firebaseio.com",
  projectId: "homeless-awareness",
  storageBucket: "homeless-awareness.appspot.com",
  messagingSenderId: "1039760726529"
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;