// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGm6xeS5tf54oIOj9eETr3JA1BirTw52c",
    authDomain: "test-school-ac10b.firebaseapp.com",
    projectId: "test-school-ac10b",
    storageBucket: "test-school-ac10b.firebasestorage.app",
    messagingSenderId: "1010325126667",
    appId: "1:1010325126667:web:9e809a9be7d90ceb36510e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;