import { firebaseApp } from './firebase.config';
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';

export { loginWithUI, logout, auth };

const auth = firebaseApp.auth();

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      try {
      } catch (e) {}
      return true;
    },
    uiShown: () => {},
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>',
};

// Initialize the FirebaseUI Widget using Firebase.
const loginWithUI = (targetID: string) => {
  const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
  ui.start(targetID, uiConfig);
};

const logout = async () => {
  await firebase.auth().signOut();
};
