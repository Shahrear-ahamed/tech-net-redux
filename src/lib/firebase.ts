import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBoFLymeixFwyIrPNymWMQ1pgBb23gKYgo',
  authDomain: 'tech-net-shahrear.firebaseapp.com',
  projectId: 'tech-net-shahrear',
  storageBucket: 'tech-net-shahrear.appspot.com',
  messagingSenderId: '223732925820',
  appId: '1:223732925820:web:890189f247743c40dc50f9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
