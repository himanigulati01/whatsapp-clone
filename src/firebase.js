import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyANupSkkTqgQzoC4W3ndd7XJW4yrdLNEE0",
    authDomain: "whatapp-clone-9613c.firebaseapp.com",
    projectId: "whatapp-clone-9613c",
    storageBucket: "whatapp-clone-9613c.appspot.com",
    messagingSenderId: "61306379609",
    appId: "1:61306379609:web:0ab95bf0bd8a1f29ae8048",
    measurementId: "G-YDXRD8PEPH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db  = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();


export {auth, provider}
export default db;