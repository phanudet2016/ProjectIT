import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyCnkwco1-0ZiC82eVmgsfhPYvF2ZrvEpZk',
  authDomain: 'projectospital.firebaseapp.com',
  databaseURL: 'https://projectospital.firebaseio.com',
  projectId: 'projectospital',
  storageBucket: 'projectospital.appspot.com',
  messagingSenderId: '969365951070'
})

export const messaging = app.messaging()
export const auth = app.auth()
export const db = app.database()
export const equipmentRef = db.ref('equipments')
export const userRef = db.ref('users')
export const approvetableRef = db.ref('approvetable')
export const scanRef = db.ref('scan')
export const lendRef = db.ref('lendeqm')
export const historyRef = db.ref('history')
export const notiRef = db.ref('noti')
export const dataRef = db.ref('datas')
