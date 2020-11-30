import firebase from 'firebase/app'
import 'firebase/auth'
import config from './config'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const store = firebase.storage()