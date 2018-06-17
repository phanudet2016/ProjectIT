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
export const yearRef = db.ref('year')
export const historyDepartmentRef = db.ref('historyDepartment')
export const requestRef = db.ref('request')
export const lendRef = db.ref('lendeqm')
export const historyRef = db.ref('history')
export const notiRef = db.ref('noti')
export const requestNotiRef = db.ref('requestNoti')
export const dataRef = db.ref('datas')
export const locationRef = db.ref('location')
export const lendMaxRef = db.ref('lendMax')
export const bookEqmRef = db.ref('bookEqm')
export const reportLackRef = db.ref('reportLack')
