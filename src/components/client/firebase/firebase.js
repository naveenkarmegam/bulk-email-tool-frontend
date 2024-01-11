import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const app = initializeApp({
    apiKey: "AIzaSyBVFelGlqmcBabpcvp6pr4sKDrFv9eaOHI",
    authDomain: "bulk-mailer-90741.firebaseapp.com",
    projectId: "bulk-mailer-90741",
    storageBucket: "bulk-mailer-90741.appspot.com",
    messagingSenderId: "314293473033",
    appId: "1:314293473033:web:0ba93799f70932ed670dd8",
    measurementId: "G-8F87448FLB"
  });

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return { user };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
