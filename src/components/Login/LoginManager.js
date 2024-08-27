import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './FirebaseConfig';

export const initializeLoginFrameWork =()=>{
firebase.initializeApp(firebaseConfig);
}