import { Price } from "@firebase/Events/event.model";
import useAuth from "hooks/useAuth";

const UserCart = () => {
  const {userCart}=useAuth()
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 p-2">
        {userCart.products.map((item: Price,i) => (
          <div key={`${item.id}+${i}`}>
            <h4>
            {item.title}
            </h4>
            <p>
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCart;