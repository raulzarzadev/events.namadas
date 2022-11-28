import Checkout from '@comps/Checkout'
import OrderSummary from '@comps/Checkout/OrderSummary'
import { CartProduct } from '@firebase/UserCart/UserCart.model'
import useAuth from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { validateItemsStillValid } from '../../../utils/validateItemsStillValid'

const CheckoutPage = () => {
  const { userCart } = useAuth()
  const [items, setItems] = useState<CartProduct[]>([])

  useEffect(() => {
    validateItemsStillValid(userCart.products).then((res: CartProduct[]) =>
      setItems(res)
    )
  }, [userCart.products])

  return (
    <div>
      <OrderSummary items={items} />
      <Checkout
        items={items}
        disabled={!!items.find((item) => !!item?.invalidPrice)}
      />
    </div>
  )
}

export default CheckoutPage
