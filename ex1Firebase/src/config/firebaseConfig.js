import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOMAqOpmk1NxUceV5K_cnHVoz-gZu_CUg",
  authDomain: "rafael-7periodo-unipam.firebaseapp.com",
  projectId: "rafael-7periodo-unipam",
  storageBucket: "rafael-7periodo-unipam.firebasestorage.app",
  messagingSenderId: "699858255255",
  appId: "1:699858255255:web:8f777d3b470e918c0118d2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
