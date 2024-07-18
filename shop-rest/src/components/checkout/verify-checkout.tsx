
import Button from "@components/ui/button";
import { useCheckout } from "@contexts/checkout.context";
import usePrice from "@utils/use-price";
import CheckoutCartItem from "@components/checkout/checkout-cart-item";
import { useRouter } from "next/router";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import EmptyCartIcon from "@components/icons/empty-cart";
import { loggedIn } from "@utils/is-loggedin";
import { useEffect, useState } from "react";
import ValidationError from "@components/ui/validation-error";
import { useVerifyCheckoutMutation } from "@data/order/use-checkout-verify.mutation";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useWindowSize } from "@utils/use-window-size";
import dynamic from "next/dynamic";
import Scrollbar from "@components/ui/scrollbar";
import { useOrdersQuery } from "@data/order/use-orders.query";
import PaymentForm from "./payment-form";


const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);


const VerifyCheckout = () => {

  const { t } = useTranslation("common");
  const { width } = useWindowSize();
  const router = useRouter();
  const [errorMessage, setError] = useState("");
  const { billing_address, setCheckoutData, checkoutData } = useCheckout();
  const { items, total, isEmpty } = useCart();
  const { openModal } = useModalAction();
 
  
  const {
    data:ordersData,
   
  } = useOrdersQuery({});

  function containsProduct(ordersData: any[], productId: number) {
    return ordersData?.some((order: any) => {
      return order?.products.some((product: any) => {
        return product?.id === productId;
      });
    });
  }

  console.log('items cart', items)



  const available_items = items?.filter(
    (item: any) => 
    //check if item have status attribute
     !checkoutData?.unavailable_products.map((item: any) => item.name).includes(item.name) 
  );

  const available_items_total = available_items?.reduce(
    (acc: number, item: any) => acc + item.itemTotal,
    0
  );

  const { price: subtotal } = usePrice(
    available_items && {
      amount: available_items_total,
    }
  );

  // console.log('item',items)

  const { mutate: verifyCheckout, isLoading: loading } =
        useVerifyCheckoutMutation();
  
  async function handleVerifyCheckout() {

    if (loggedIn()) {

      if ( billing_address ) {
        
        verifyCheckout(
          {
            amount: total,
            products: items?.map((item) => formatOrderedProduct(item)),

            billing_address: {
              ...(billing_address?.address && billing_address.address),
            },
            
            // shipping_address: {
            //   ...(shipping_address?.address && shipping_address.address),
            // },
          },

          {
            onSuccess: (data) => {
              // router.reload();
              setCheckoutData(data);
              router.push("/order");
            },
            onError: (error) => {
              // console.log(error, "error");
            },

          }
        );
      } else {
        setError("Please add both address");
      }

    } else {
      openModal("LOGIN_VIEW");
    }
  }

  const {
  
    removeItemFromCart,
   
  } = useCart();

  

  // check if available_items have product with id 14110
  

  return (

    <div className="w-full h-screen relative">
      <div style={{top: '102px'}} className="flex flex-col space-y-2 mt-4  p-2 sticky border border-blue-100  bg-blue-50">

        <div className="flex items-center justify-between space-s-4 mb-4">
          <span className="text-base font-bold text-heading">
            {t("Your Order")}
          </span>
          <span className="text-md text-gray-800">{available_items.length + ' ' + 'items'} </span>
        </div>

        <div className=" ">
            <div className="flex  items-center justify-between">
              <p className="text-lg font-semibold text-gray-900 ">{t(" Total")}</p>
              <span className="text-md font-semibold text-magenta">{subtotal}</span>
            </div>
            <div className="flex justify-between">
              {/* <p className="text-sm text-body">{t("text-tax")}</p> */}
              {/* <span className="text-sm text-body">
                {t("text-calculated-checkout")}
              </span> */}
            </div>
        </div>
      </div>

      <Scrollbar
                className="w-full h-full lg:h-110"
                // style={{ height: "calc(100% - 80px)" }}
              >  
        <div className="flex flex-col py-3 border-b border-border-200">
          {isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center mb-4">
              <EmptyCartIcon width={140} height={176} />
              <h4 className="mt-6 text-base font-semibold">
                {t(" No Products")}
              </h4>
            </div>
            
          ) : (
            // map over available_items and check if it includes product with id 14110 if true then check if that product is also present in orders list if true then push that item in notAvailable

            available_items?.map((item: any) => {
              if (item.id === 14110 || item.id === 14358) {
                if (containsProduct(ordersData?.pages?.[0].data, 14110 || 14358)) {
                  removeItemFromCart(14110);
                }
              }
              return (
                <CheckoutCartItem
                  key={item.id}
                  item={item}
                />
              );
            }

            )
          )}

      </div>
      </Scrollbar>
      {/* <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-sm text-body">{t("Sub Total")}</p>
          <span className="text-sm text-body">{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-body">{t("text-tax")}</p>
          <span className="text-sm text-body">
            {t("text-calculated-checkout")}
          </span>
        </div>
       
      </div> */}
      {/* <div className="shadow-700 bg-light p-5 md:p-8">
            <PaymentForm />
          </div> */}

      <Button
        loading={loading}
        className="w-full -mt-4 sticky bottom-14  md:bottom-2"
        onClick={handleVerifyCheckout}
        disabled={isEmpty }
      >
        {  subtotal + '  |' + '  '+  'Proceed to Checkout'}
      </Button>

      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
       {width > 1023 && <CartCounterButton />}
    </div>
  );
};

export default VerifyCheckout;
