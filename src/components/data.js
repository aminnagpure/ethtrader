
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
const provider = new firebase.auth.GoogleAuthProvider();
// firebase init goes here

const config = {
    apiKey: "AIzaSyAAm-5bCOVlzXeJFb_AxUPLEHZl66dkvxc",
    authDomain: "ether-51ed0.firebaseapp.com",
    databaseURL: "https://ether-51ed0.firebaseio.com",
    projectId: "ether-51ed0",
    storageBucket: "ether-51ed0.appspot.com",
    messagingSenderId: "258682462546"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

//const exchangesgroup=db.collection('exchangesgroup')



export {
    db,
    provider,
    currentUser, 
    auth
    

}