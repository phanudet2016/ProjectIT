import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyBpkoZ_P1UenoaUBV3PR5kXOGEIp56IIhs',
  authDomain: 'projectit-c357b.firebaseapp.com',
  databaseURL: 'https://projectit-c357b.firebaseio.com',
  projectId: 'projectit-c357b',
  storageBucket: 'projectit-c357b.appspot.com',
  messagingSenderId: '736030153954'
})

export const db = app.database()
export const equipmentRef = db.ref('equipments')
