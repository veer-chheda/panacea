// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOtWYfKWOO7jkENX_daJgbtWxaNl1fFI4",
    authDomain: "panacea-fceb4.firebaseapp.com",
    projectId: "panacea-fceb4",
    storageBucket: "panacea-fceb4.appspot.com",
    messagingSenderId: "420477380847",
    appId: "1:420477380847:web:94ec9f846d675c93aa131a",
    measurementId: "G-9EFLQNGKV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app



