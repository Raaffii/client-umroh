// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiCiecVaicqwZB1P_V42UePJM9abA2pLo",
  authDomain: "filemern.firebaseapp.com",
  projectId: "filemern",
  storageBucket: "filemern.appspot.com",
  messagingSenderId: "145315727852",
  appId: "1:145315727852:web:cf6e38ecb49bb8dc3758c9",
  measurementId: "G-77VKL3STHY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDb = getStorage(app);
