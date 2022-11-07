import { arrayRemove, arrayUnion, where } from 'firebase/firestore';
import { auth } from '..';
import { FirebaseCRUD } from '../FirebaseCRUD';
import { CartProduct, UserCart } from './UserCart.model';

const userCartsCRUD = new FirebaseCRUD('carts');

export const createCart = (newCart: UserCart) => userCartsCRUD.create(newCart);

export const updateCart = (cartId: string, newCart: UserCart) =>
  userCartsCRUD.update(cartId, newCart);

export const deleteCart = (cartId: string) => userCartsCRUD.delete(cartId);

export const getCart = (cartId: string) => userCartsCRUD.get(cartId);
export const getOneCart = (userId: string) =>
  userCartsCRUD.getOne([where('userId', '==', userId)]);

export const listenCart = (cartId: string, cb: CallableFunction) =>
  userCartsCRUD.listen(cartId, cb);

export const listenUserCarts = (cb: CallableFunction) => {
  const userId = auth.currentUser?.uid;
  userCartsCRUD.listenDocs([where('userId', '==', userId)], cb);
};


export const addItemToUserCart = (cartId: string, item: CartProduct) =>
  userCartsCRUD.update(cartId, { products: arrayUnion({...item, added:{date:new Date().getTime()}}) });

export const removeItemToUserCart = (cartId: string, item: CartProduct) => {
  return userCartsCRUD.update(cartId, { products: arrayRemove(item) });
};
