import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBbTT14x94HGNrx5w7ZqINQIBw3-GntWhw",
    authDomain: "wafa-doc-e826e.firebaseapp.com",
    projectId: "wafa-doc-e826e",
    storageBucket: "wafa-doc-e826e.firebasestorage.app",
    messagingSenderId: "327227209182",
    appId: "1:327227209182:web:74ba91703775f907df194f"
};;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);