import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVMFCG8LNGJfKsqmsbCOwBwCnq0lr_5j8",
    authDomain: "crwn-db-d557d.firebaseapp.com",
    projectId: "crwn-db-d557d",
    storageBucket: "crwn-db-d557d.appspot.com",
    messagingSenderId: "334607399038",
    appId: "1:334607399038:web:7925c389d4e2914a76002f",
    measurementId: "G-MHGXHSXTF4"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ 
    prompt: 'select_account' 
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}