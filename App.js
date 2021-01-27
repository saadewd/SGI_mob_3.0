import React, {useEffect} from 'react';
import App from './navigation';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import {MenuProvider} from 'react-native-popup-menu';
import store from './src/Store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDDHUykUoX5_2mM13nt3dheRa6wDeKtgMA',
  authDomain: 'tbportal-75e42.firebaseapp.com',
  databaseURL: 'https://tbportal-75e42.firebaseio.com',
  projectId: 'tbportal-75e42',
  storageBucket: 'tbportal-75e42.appspot.com',
  messagingSenderId: '491033399322',
  appId: '1:491033399322:web:2d3d814e3f1b5a868301a3',
  measurementId: 'G-JXCTNEJN0W',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  firebase.storage();
}
export {firebase, Auth};
function setup() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  );
}

setup.propTypes = {};

export default setup;
