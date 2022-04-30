import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCKP8SoeUzBVrVSFIE06pYKvcjlW18WUVI",
    authDomain: "fir-auth-92059.firebaseapp.com",
    projectId: "fir-auth-92059",
    storageBucket: "fir-auth-92059.appspot.com",
    messagingSenderId: "589401310488",
    appId: "1:589401310488:web:f504e6f0a5a6f6c2d74a6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginFirebase = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }catch (e) {
        console.log(e);
        return(e.message);
        // alert(e.message);
    }
}

const signupFirebase = async (name, email, password) => {
    try {
        await createUserWithEmailAndPassword(name, email, password);
    }catch (e) {
        console.error(e);
        alert(e.message);
    }
}

export {auth, loginFirebase, signupFirebase}