import firebase from 'firebase/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBz6GorOZEweY3hke_4w2Xo6ExyooGZ5F4",
  authDomain: "nextfirejs-bagel.firebaseapp.com",
  projectId: "nextfirejs-bagel",
  storageBucket: "nextfirejs-bagel.appspot.com",
  messagingSenderId: "39668228690",
  appId: "1:39668228690:web:5b87700112bd4a1695758b",
  measurementId: "G-N2S1EMT5DF"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
