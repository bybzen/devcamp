import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDIHoMTpMPyuIDGIp6yl_f08kLOeRsW86w",
    authDomain: "test-predev.firebaseapp.com",
    databaseURL: "https://test-predev.firebaseio.com",
    projectId: "test-predev",
    storageBucket: "test-predev.appspot.com",
    messagingSenderId: "749797199963",
    appId: "1:749797199963:web:eb295d42e9d2d998722f7e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;