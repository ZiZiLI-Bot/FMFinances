// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYZ4oLXzHWj5N4qLyyy3INgcZSEGz6m90',
  authDomain: 'fmfinances-e99c7.firebaseapp.com',
  projectId: 'fmfinances-e99c7',
  storageBucket: 'fmfinances-e99c7.appspot.com',
  messagingSenderId: '457839443957',
  appId: '1:457839443957:web:d10108f83fc65954ceaabc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
