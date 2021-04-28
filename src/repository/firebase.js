import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.Firebase_AipKey,
  authDomain: process.env.Firebase_AuthDomain,
  databaseURL: process.env.Firebase_DatabaseUrl,
  projectId: process.env.Firebase_ProjectId,
  storageBucket: process.env.Firebase_StorageBucket,
  messagingSenderId: process.env.Firebase_MessagingSenderId,
  appId: process.env.Firebase_AppID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };
