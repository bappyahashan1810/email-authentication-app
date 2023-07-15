// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBADEK6dxWbJTh1R5GBaLenoCXzYnPm2Vo",
    authDomain: "email-authentication-app-fdba8.firebaseapp.com",
    projectId: "email-authentication-app-fdba8",
    storageBucket: "email-authentication-app-fdba8.appspot.com",
    messagingSenderId: "263881236163",
    appId: "1:263881236163:web:4a436c1c933a75500fcc76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;