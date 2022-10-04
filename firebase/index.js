import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig =
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG

const app = initializeApp(JSON.parse(firebaseConfig))
export const db = getFirestore(app)

export const auth = getAuth(app)
export const storage = getStorage(app)
