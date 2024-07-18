
import usePrice from "@utils/use-price";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";


interface Props {
  item: any;
  notAvailable?: boolean;
}

const CheckoutCartItem = ({ item, notAvailable }: Props) => {
  
  const { t } = useTranslation("common");
  const router = useRouter();

  const { price } = usePrice({
    amount: item?.itemTotal,
  });
  const { price:delivery_charges } = usePrice({
    amount: parseFloat(item?.shop?.delivery_charges),
  });
  const { price:free_delivery_order_value } = usePrice({
    amount: parseFloat(item?.shop?.free_delivery_order_value),
  });
  
  const { items } = useCart();
  const [shopOrderPrice,setShopOrderPrice]=useState(0)
  const [shopItems,setShopItems]=useState([])


  useEffect(() => {
    var shop_items:any=[];
    var p:number=0;
    items.forEach(element=>{
      if(item?.shop?.slug==element?.shop?.slug){
        shop_items.push(element);
        p=p+parseInt(element?.itemTotal);
      }
    })
    setShopOrderPrice(p)
    setShopItems(shop_items)    
  }, [items])
  

  function isWithDelivery():Boolean{
    if(item?.shop?.delivery_status){
      return true;
    }
    return false
  }

  function calculateTax(){
    var tax=JSON.parse(item?.tax);
    if(tax){
      var itemTotal=(item?.itemTotal)?item.itemTotal:0;
      var rate=(tax.rate)?tax.rate:0;
      var value=(parseFloat(rate)*parseFloat(itemTotal))/100;
      const {price:total}=usePrice({
        amount: value,
      })
      return total;
    }
  }

  return (
    
    <div className=" bg-white p-5">
    <div className={cn("flex  justify-between py-2")} key={item?.id}>
      <p className="flex items-center justify-between text-base">
        <span
          className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
        >
          <span
            className={cn(
              "text-lg",
              notAvailable ? "text-red-500" : "text-heading"
            )}
          >
            Shop :
          </span>
        </span>
      </p>
      <span
        className={cn("text-lg text-gray-700", notAvailable ? "text-red-500" : "text-body")}
      >
        {item?.shop?.name}
      </span>
    </div>
    <div className={cn("flex justify-between py-2")} key={item?.id}>
      <p className="flex items-center justify-between text-base">
        <span
          className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
        >
          <span
            className={cn(
              "text-sm font-bold",
              notAvailable ? "text-red-500" : "text-heading"
            )}
          >
            {item?.quantity}
          </span>
          <span className="mx-2 ">x</span>
          <span className="text-gray-800 font-semibold text-md">{item?.name}</span> | <span>{item?.unit}</span>
        </span>
      </p>
      <span
        className={cn("text-sm", notAvailable ? "text-red-500" : "font-semibold")}
      >
        {!notAvailable ? price : t("text-unavailable")}
      </span>
    </div>
    {
      calculateTax()&&(
        <div className={cn("flex justify-between py-2")} key={item?.id}>
          <p className="flex items-center justify-between text-base">
            <span
              className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
            >
              <span
                className={cn(
                  "text-sm",
                  notAvailable ? "text-red-500" : "text-heading"
                )}
              >
                Tax
              </span>

            </span>
          </p>
          <span
            className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
          >
            {!notAvailable ? calculateTax() : t("text-unavailable")}
          </span>
        </div>
      )
    }


    {
      isWithDelivery()?(
        <>
          <div className={cn("flex justify-between py-2")} key={item?.id}>
            <p className="flex items-center justify-between text-base">
              <span
                className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
              >
                <span className="text-gray-800 ">Delivery </span>
              </span>
            </p>
            <span
              className={cn("text-sm ", notAvailable ? "text-red-500" : "text-gray-500")}
            >
            {
              shopOrderPrice>item?.shop?.free_delivery_order_value
              ?
              <span className="font-semibold text-green-600">Free Delivery</span>
              :
              delivery_charges
            } 
            </span>
          </div>
          <div className={cn("flex justify-between py-2")}>
 
            {
              
              shopOrderPrice>item?.shop?.free_delivery_order_value
              ?
              ""
              :
           
                (
                  <p
                    className="text-sm text-red-500"
                  >
                    Buy items of {free_delivery_order_value} to get free delivery on this item
                    <button onClick={()=>router.push("/shops/"+item?.shop?.slug)} className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 bg-accent text-light border border-transparent hover:bg-accent-hover px-2 py-0 h-8 w-10 mt-5 ml-3" style={{fontSize:"10px"}}>Buy more</button>
                  </p>
                )
          
            } 
          </div>
        </>
      ) :<div className="flex items-center justify-between"> 
      <span className="text-sm text-gray-700">Delivery </span>
        <span
        className={cn("text-sm ", notAvailable ? "text-red-500" : "text-gray-500")}
      >
      {
        shopOrderPrice>item?.shop?.free_delivery_order_value
        ?
        <span className="font-semibold text-green-600">Free Delivery</span>
        :
        delivery_charges
      } 
      </span>
    </div>
    }
    <hr style={{color:"#a1a7af",marginBottom:"10px"}}/>
    
    </div>
  );
};

export default CheckoutCartItem;
