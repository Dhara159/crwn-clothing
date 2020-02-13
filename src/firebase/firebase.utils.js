import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBDqStIxQMpAODYRD19kzLWy8gv8K_2-ac",
  authDomain: "crwn-db-f6657.firebaseapp.com",
  databaseURL: "https://crwn-db-f6657.firebaseio.com",
  projectId: "crwn-db-f6657",
  storageBucket: "crwn-db-f6657.appspot.com",
  messagingSenderId: "383742723416",
  appId: "1:383742723416:web:88bba0f8782dd440ea112d"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;