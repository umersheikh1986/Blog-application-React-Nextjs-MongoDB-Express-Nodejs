// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-cc864.firebaseapp.com",
  projectId: "mern-blog-app-cc864",
  storageBucket: "mern-blog-app-cc864.appspot.com",
  messagingSenderId: "134376819625",
  appId: "1:134376819625:web:36f06deb170332508252b8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAxZWDzN0FGgHnDUOEuh651lpMyvTusPFU",
//   authDomain: "mern-blog-application-4af51.firebaseapp.com",
//   projectId: "mern-blog-application-4af51",
//   storageBucket: "mern-blog-application-4af51.firebasestorage.app",
//   messagingSenderId: "504493934659",
//   appId: "1:504493934659:web:4f9934345d78750a836cf6",

// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
