import { config } from './firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export { firestore };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();
