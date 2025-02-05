// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYBvgyGebgx_RB8hqtFMDZixgW1GJniI",
  authDomain: "ecommercewebapp-40db9.firebaseapp.com",
  projectId: "ecommercewebapp-40db9",
  storageBucket: "ecommercewebapp-40db9.appspot.com",
  messagingSenderId: "1046760661218",
  appId: "1:1046760661218:web:ce1ff5421dd19d8d563ebb"
};

const app = initializeApp(firebaseConfig);
export const fireDB = getStorage(app);