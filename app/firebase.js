// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ9xUneTaaKP8GCk4LHPlgPRWa5TbZqt4",
  authDomain: "wishlist-6f382.firebaseapp.com",
  projectId: "wishlist-6f382",
  storageBucket: "wishlist-6f382.appspot.com",
  messagingSenderId: "346768114023",
  appId: "1:346768114023:web:b763d160f3261d534e2fc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user;
}

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user;
}

// Database stuff
const db = getFirestore(app);

export const createWishlistUser = async (wishlistUser) => { 
  await setDoc(doc(db, "wishlistUsers", wishlistUser.id), wishlistUser);
}