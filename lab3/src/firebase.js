import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCKKvtsFoK8C-FQT1bU7fOBQjqdjSdiVFI",
    authDomain: "lab4-c1a51.firebaseapp.com",
    projectId: "lab4-c1a51",
    storageBucket: "lab4-c1a51.firebasestorage.app",
    messagingSenderId: "930448246984",
    appId: "1:930448246984:web:a5103582e884266bbf3dfd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);