import { firebaseApp } from './firebase.config';
import 'firebase/firestore';

export { firestore };

const firestore = firebaseApp.firestore();

try {
  firestore
    .enablePersistence()
    .then(() => {
      // Initialize Cloud Firestore through firebase
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
} catch (e) {}
