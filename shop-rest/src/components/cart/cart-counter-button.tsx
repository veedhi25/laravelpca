
import { useUI } from "@contexts/ui.context";
import CartCheckBagIcon from "@components/icons/cart-check-bag";
import { formatString } from "@utils/format-string";
import usePrice from "@utils/use-price";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useTranslation } from "next-i18next";
import { useCheckout } from "@contexts/checkout.context";


const CartCounterButton = () => {

  const { t } = useTranslation();
  const { totalUniqueItems,items, total ,delivery_charges} = useCart();
  const { openSidebar, setSidebarView } = useUI();
  

  const {
    billing_address,
    shipping_address,
    delivery_time,
    checkoutData,
    coupon,
    discount,
  } = useCheckout();
  

  const available_items = items?.filter(
    (item: any) => 
    //check if item have status attribute
     !checkoutData?.unavailable_products.map((item: any) => item.name).includes(item.name) 
  );

  const available_items_total = available_items?.reduce(
    (acc: number, item: any) => acc + item.itemTotal,
    0
  );

  const { price: totalPrice } = usePrice({
    amount: available_items_total ,
  });



  function handleCartSidebar() {
    setSidebarView("CART_VIEW");
    return openSidebar();
  }

  // console.log('total price',totalPrice);

  return (

    <button
      className="hidden product-cart lg:flex flex-col items-center justify-center p-3 pt-3.5 fixed top-1/2 -mt-12 end-0 z-40 shadow-900 rounded rounded-te-none rounded-be-none bg-accent text-light text-sm font-semibold transition-colors duration-200 focus:outline-none hover:bg-accent-hover"
      onClick={handleCartSidebar}
     >
      <span className="flex pb-0.5">
        <CartCheckBagIcon className="flex-shrink-0" width={14} height={16} />
        <span className="flex ms-2">
        {formatString(available_items.length, t("Item"))}
           {/* {formatString(available_items.length, t("common:Items"))} */}

        </span>
      </span>

      <span className="bg-light rounded w-full py-2 px-2 text-accent mt-3">
        {totalPrice == '₹NaN' ? '₹'+''+'0.00' : totalPrice}
      </span>
      
    </button>
  );
};

export default CartCounterButton;
