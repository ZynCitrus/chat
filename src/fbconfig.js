import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDiuv7QIgiBKYuEWponjqhD77NRXM4K8Xo",
    authDomain: "chatt-2db2f.firebaseapp.com",
    projectId: "chatt-2db2f",
    storageBucket: "chatt-2db2f.firebaseapp.com",
    messagingSenderId: "115540686066",
    appId: "1:115540686066:web:30d02d9901201182750c6b",
    measurementId: "G-X5CT4JMCK8",
  };
  
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);