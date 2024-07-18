import Image from "next/image";
import { motion } from "framer-motion";
import { siteSettings } from "@settings/site.settings";
import Counter from "@components/ui/counter";
import { CloseIcon } from "@components/icons/close-icon";
import { fadeInOut } from "@utils/motion/fade-in-out";
import usePrice from "@utils/use-price";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import { useLocation } from "@contexts/location/location.context";
import { useCheckout } from "@contexts/checkout.context";
import { useEffect } from "react";


interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {

  const { t } = useTranslation("common");
  const { totalUniqueItems,items, total ,delivery_charges} = useCart();
  
  const draftItems = items?.filter(
    (item: any) => 
    //check if item have status attribute
     !checkoutData?.unavailable_products.map((item: any) => item?.name).includes(item?.name) 
  );

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
     !checkoutData?.unavailable_products.map((item: any) => item?.name).includes(item?.name) 
  );

  // console.log('item', item)


  const {isProductAvailable, isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCart();

  const { price } = usePrice({
    amount: item?.price,
  });

  const { price: itemPrice } = usePrice({
    amount: item?.itemTotal,
  });

  const { mutate: createLog} = useCreateLogMutation();

  const {getLocation} =useLocation();

  const notAvailableItems = checkoutData?.unavailable_products


  //items whose id matches with the notAvailabelItems id
  const notAvailableItem = notAvailableItems?.filter(
    (itm: any) => itm?.id === item?.id
  );

  function handleIncrement(e: any) {
    e.stopPropagation();
    addItemToCart(item, 1);

    createLog({
      location:getLocation?.formattedAddress,
      product:item,
      type:'item-added'
    }, {
      onSuccess: (data: any) => {
        // console.log(data)
      },
    });

  }

  const handleRemoveClick = (e: any) => {

    e.stopPropagation();
    removeItemFromCart(item?.id);

    createLog({
      location:getLocation?.formattedAddress,
      product:item,
      type:'item-removed'
    }, {
      onSuccess: (data: any) => {
        // console.log(data)
      },
    });

  };

  // // console.log('cart item status', item)

  // // console.log('json shop categories', JSON.parse(item?.shop?.shop_categories).map((category: any) => category?.name)[0])

  const outOfStock = !isInStock(item?.id) && !isProductAvailable(item,item?.id);

  return (

    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className={` ${!item?.status  ? '' : ''}  flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border-200 border-opacity-75`}
    >

      <div  className="flex-shrink-0">
        <Counter
          value={item?.quantity}
          onDecrement={handleRemoveClick}
          onIncrement={item?.quantity > item?.stock ? null : handleIncrement}
          variant="pillVertical"
          disabled={outOfStock || !item?.status }
        />
      </div>

      <div className="w-10 sm:w-16 h-10 sm:h-16 flex items-center justify-center overflow-hidden bg-gray-100 mx-4 flex-shrink-0 relative">
           < Image        quality='40'
          src={item?.image ?? siteSettings?.product?.placeholderImage}
          alt={item?.name}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div>
        <h3 className="font-bold text-heading">{item?.name}</h3>
        <p className="my-2.5 font-semibold text-accent">{price}</p>
        <span className="text-xs text-body">
          {item?.quantity} X {item?.unit}
        </span>
      </div>

      <div className="flex h-full w-full flex-col">
        <div className="flex items-center">
          <span className="ms-auto font-bold text-heading">{itemPrice}</span>
          <button
            className="w-7 h-7 ms-3 -me-2 flex items-center justify-center rounded-full 
                        text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 
                        focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
            onClick={() => clearItemFromCart(item?.id)}
          >
            <span className="sr-only">{t("text-close")}</span>
            <CloseIcon className="w-3 h-3" />
          </button>
        </div>

       <span className="flex justify-end  mb-0 h-full ml-10 mt-5  text-xs font-light text-red-500">
          {notAvailableItem?.length ? 
          'Sorry, this product is not available' : 
          null ||  item?.stock <= item?.quantity ?
          `Sorry, only ${item?.stock} item available` : 
          JSON.parse(item?.shop?.shop_categories)?.map((category: any) => category?.name)[0] !== 'Salon & Spa' ? (item?.stock + ' ' + 'Available') : ''  }
       </span>

      </div>
    </motion.div>
  );
};

export default CartItem;
