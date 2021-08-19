import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA_4m8ldZam33airXnRAEc3tZzHaKOI43E",
    authDomain: "clone-aad75.firebaseapp.com",
    projectId: "clone-aad75",
    storageBucket: "clone-aad75.appspot.com",
    messagingSenderId: "382046264220",
    appId: "1:382046264220:web:d03991c4542024a9b8c659"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };