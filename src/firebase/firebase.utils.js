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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`); // QueryReference

  const snapshot = await userRef.get(); // QuerySnapshot

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, email, createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;