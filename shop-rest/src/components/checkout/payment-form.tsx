import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import { useCheckout } from "@contexts/checkout.context";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ValidationError from "@components/ui/validation-error";
import { ROUTES } from "@utils/routes";
import { useCreateOrderMutation } from "@data/order/use-create-order.mutation";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useLocation } from "@contexts/location/location.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
import { useCustomerQuery } from "@data/customer/use-customer.query";

import { Data } from "@react-google-maps/api";

import BackButton from "@components/ui/back-button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useEffect } from "react";
import Spinner from "@components/ui/loaders/spinner/spinner";
import DefaultLayout from "@components/layout/default-layout";

interface FormValues {
  payment_gateway: "cod" | "cashfree" | "upi" | "wallet";
  contact: string;
  card: {
    number: string;
    expiry: string;
    cvc: string;
    email: string;
  };
}

const paymentSchema = Yup.object().shape({
  contact: Yup.string()
    .min(8, "error-min-contact")
    .required("error-contact-required"),
  payment_gateway: Yup.string().default("cashfree").oneOf(["cod", "cashfree", "upi", "wallet"]),
  // card: Yup.mixed().when("payment_gateway", {
  //   is: (value: string) => value === "cashfree",
  //   then: Yup.object().shape({
  //     number: Yup.string().required("error-card-required"),
  //     expiry: Yup.string().required("error-expiry-date"),
  //     cvc: Yup.string().required("error-cvc"),
  //     email: Yup.string().email().required(" Email required"),
  //   }),
  // }),
});

const PaymentForm = () => {

  const { t } = useTranslation("common");
  const router = useRouter();
  const { mutate: createOrder, isLoading: loading } = useCreateOrderMutation();
  const { data: orderStatusData } = useOrderStatusesQuery();
  const { data } = useCustomerQuery();
  const {getLocation} =useLocation();

  const {openModal} = useModalAction();

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      payment_gateway: "cashfree",
      contact: data?.me?.phone_number,
    },
  });
  
  // console.log('phone number',data?.me?.phone_number)
  const {
    billing_address,
    shipping_address,
    delivery_time,
    checkoutData,
    coupon,
    discount,
  } = useCheckout();

  useEffect(()=>{

    checkoutData && onSubmit()

  },[checkoutData])

  const notAvailableItems = checkoutData.unavailable_products
   
  const allItems = () => {
    let avItems = [];
    for(let i=0;i<notAvailableItems.length;i++){
      avItems = notAvailableItems[i].name
  }
  return avItems
}



  const { items, delivery_charges} = useCart();

 
  const available_items = items?.filter(
    (item: any) => 
    //check if item have status attribute
     !checkoutData?.unavailable_products.map((item: any) => item.name).includes(item.name) 
  );

  const draftProducts = items?.filter(
    (item: any) => 
    checkoutData?.unavailable_products.includes(item.id) 
  );



  const subtotal = calculateTotal(available_items).total;

  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: checkoutData?.total_tax!,
      shipping_charge: checkoutData?.shipping_charge!,
    },
    discount
  );

  const {data:user} = useCustomerQuery();
  console.log('user',user?.me?.phone_number)



  //con

  
  function onSubmit(values: FormValues) {
    
    let input = {
      //@ts-ignore
      location:getLocation?.formattedAddress,
      products: available_items?.map((item) => formatOrderedProduct(item)),
      customer_contact: user?.me?.phone_number,
      status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
      amount: subtotal,
      coupon_id: coupon?.id,
      discount: discount ?? 0,
      paid_total: total,
      total,
      sales_tax: checkoutData?.total_tax,
      delivery_fee: delivery_charges,
     
      delivery_time: delivery_time?.title ,
      payment_gateway: 'cod',
      billing_address: {
        ...(billing_address?.address && billing_address.address),
      },
      shipping_address: {
        ...(shipping_address?.address && shipping_address.address),
      },
    };

    console.log('values',input,available_items?.map((item) => formatOrderedProduct(item)))
    
    // if (values.payment_gateway !== "cod") {
    //   // @ts-ignore
    //   input.card = {
    //     number: values?.card?.number,
    //     expiryMonth: values?.card?.expiry?.split("/")[0],
    //     expiryYear: values?.card?.expiry?.split("/")[1],
    //     cvv: values?.card?.cvc,
    //     email: values?.card?.email,
    //   };
    // }

    
    createOrder(input, {
      onSuccess: (order: any) => {
        console.log('order link',order?.paymentLink);
        if (order?.tracking_number) {
          router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
        }
        if (order?.paymentLink)
        {
          window.location.replace(order?.paymentLink)
        }
        // if (order )
        // console.log(order?.paymentLink)
        // {
        //   openModal('UPI_APPS', {
        //     data : Object.values(order?.data?.payload)
        //   });
        // }
      },
      onError: (error: any) => {
        // console.log(error?.response?.data?.message);
      },
    });
  }

  const isCashOnDelivery = watch("payment_gateway");

  return (
    <>
    {/* <div className="sticky z-50 top-12 w-full bg-white  px-2 py-3">
      <BackButton/>
      </div> */}
      <Spinner text='Placing Order.....'/>
    </>
  );
};

PaymentForm.layout = DefaultLayout;

export default PaymentForm;
