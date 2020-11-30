import firebase from 'firebase/app'
import 'firebase/auth'
import config from './config'
import 'firebase/storage'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const store = firebase.storage()
export const db = firebase.database()