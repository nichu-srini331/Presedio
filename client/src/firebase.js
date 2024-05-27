import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBC5LEYKvoWtpa4DqypEJnLj5WXMRRPss4",
    authDomain: "rentify-3431e.firebaseapp.com",
    projectId: "rentify-3431e",
    storageBucket: "rentify-3431e.appspot.com",
    messagingSenderId: "1077261625992",
    appId: "1:1077261625992:web:2bb103d018530f9983cd3d",
    measurementId: "G-QZL29WD2E6"
  };

  const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
