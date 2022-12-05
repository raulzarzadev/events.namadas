import { arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { auth } from '..'
import { FirebaseCRUD } from '../FirebaseCRUD'
import { CartProduct, UserCart } from './UserCart.model'

type UserCartDTO = Partial<UserCart>

const userCartsCRUD = new FirebaseCRUD('carts')
export const createCart = async (newCart: UserCartDTO) =>
  await userCartsCRUD.create(newCart)

export const updateCart = async (cartId: string, newCart: UserCart) =>
  await userCartsCRUD.update(cartId, newCart)

export const deleteCart = async (cartId: string) =>
  await userCartsCRUD.delete(cartId)

export const getCart = async (cartId: string) => await userCartsCRUD.get(cartId)
export const getOneCart = async (userId: string) =>
  await userCartsCRUD.getOne([where('userId', '==', userId)])

export const listenCart = async (cartId: string, cb: CallableFunction) =>
  await userCartsCRUD.listen(cartId, cb)

export const listenUserCarts = (cb: CallableFunction) => {
  const userId = auth.currentUser?.uid
  userCartsCRUD.listenDocs([where('userId', '==', userId)], cb)
}

export const addItemToUserCart = async (cartId: string, item: CartProduct) => {
  return await userCartsCRUD.update(cartId, {
    products: arrayUnion({ ...item, added: { date: new Date().getTime() } })
  })
}
export const removeItemToUserCart = async (
  cartId: string,
  item: CartProduct
) => {
  const originalCartPrice = await getCart(cartId).then(
    ({ products }: any) => products.find((price: any) => price.id === item.id)
    // products.find((price) => price.id === item.id)
    //  res.prices.find((price) => price.id === item.id)
  )
  return await userCartsCRUD.update(cartId, {
    products: arrayRemove(originalCartPrice)
  })
}
