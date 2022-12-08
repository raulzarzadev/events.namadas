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

export const setUser = async (itemId: string, newItem: object) =>
  await usersCRUD.setDoc(itemId, newItem)

export const createUser = async (newItem: any) =>
  await usersCRUD.create(newItem)

export const updateUser = async (itemId: string, newItem: Partial<User>) =>
  await usersCRUD.update(itemId, newItem)

export const deleteUser = async (itemId: string) =>
  await usersCRUD.delete(itemId)

export const getUser = async (itemId: string) => await usersCRUD.get(itemId)

export const listenUser = async (itemId: string, cb: CallableFunction) =>
  await usersCRUD.listen(itemId, cb)

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

export async function getVisibleCompanies() {
  return await usersCRUD.getMany([where('companyInfo.isVisible', '==', true)])
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

export async function logout() {
  return await signOut(auth)
}

export const updateCompany = async (
  companyId: string,
  companyInfo: User['companyInfo']
) => await usersCRUD.update(companyId, { companyInfo })
