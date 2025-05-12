// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Mh_0UlMdfVQzDdBuXTmuUU0YTRIbz5Q",
  authDomain: "gotribu-a6d05.firebaseapp.com",
  projectId: "gotribu-a6d05",
  storageBucket: "gotribu-a6d05.firebasestorage.app",
  messagingSenderId: "727634146490",
  appId: "1:727634146490:web:bf86d28914490b843f7e83",
  measurementId: "G-Y2WF2WWMXW"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default appFirebase;