// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// export const signup = async (email, password, additionalData) => {
//   const { user } = await createUserWithEmailAndPassword(auth, email, password);
//   await createUserProfile(user, additionalData);
// };

// export const login = (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// export const logout = () => {
//   return signOut(auth);
// };

// export const createUserProfile = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = doc(db, `users/${user.uid}`);
//   await setDoc(userRef, {
//     email: user.email,
  
//   });
// };

// export const getUserProfile = async (uid) => {
//   if (!uid) return null;

//   const userRef = doc(db, `users/${uid}`);
//   const snapshot = await getDoc(userRef);

//   if (snapshot.exists()) {
//     return snapshot.data();
//   } else {
//     return null;
//   }
// };
