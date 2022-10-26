import PreviewImage from "@comps/prevewImage";
import { Price } from "@firebase/Events/event.model";

const OrderSumary = ({items=[]}:{items:Price[]}) => {
  return (
    <div>
      {items.map((item)=>{
        return (
          <div className="flex">
            <div>
              <PreviewImage image={item.image} />
            </div>
            <div className="grid">
              <span>

              {item.title}
              </span>
              <span className="text-sm font-thin">

              {item.description}
              </span>
              <span className="font-bold">
                {item.price}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderSumary;