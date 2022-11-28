import { auth } from '@firebase/index'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { where } from 'firebase/firestore'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { User } from './user.model'

const usersCRUD = new FirebaseCRUD('users')

export const setUser = (itemId: string, newItem: object) =>
  usersCRUD.setDoc(itemId, newItem)

export const createUser = (newItem: any) => usersCRUD.create(newItem)

export const updateUser = (itemId: string, newItem: Partial<User>) =>
  usersCRUD.update(itemId, newItem)

export const deleteUser = (itemId: string) => usersCRUD.delete(itemId)

export const getUser = (itemId: string) => usersCRUD.get(itemId)

export const listenUser = (itemId: string, cb: CallableFunction) =>
  usersCRUD.listen(itemId, cb)

export function authStateChanged(cb: CallableFunction) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // console.log('not logged');
      return cb(null)
    }
    getUser(user.uid).then((res) => {
      cb(res)
    })
  })
}

export function getVisibleCompanies() {
  return usersCRUD.getMany([where('companyInfo.isVisible', '==', true)])
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user

      // console.log(user)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}

export function logout() {
  return signOut(auth)
}

export const updateCompany = (
  companyId: string,
  companyInfo: User['companyInfo']
) => usersCRUD.update(companyId, { companyInfo })
