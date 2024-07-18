import Button from "@components/ui/button";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCreateDeliveryMutation } from "@data/shop-delivery/use-create-order.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ROUTES } from "@utils/routes";


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
    payment_gateway: Yup.string().default("cashfree").oneOf(["cod", "cashfree", "upi", "wallet"]),
});


const PaymentForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { mutate: createPayment, isLoading: loading } = useCreateDeliveryMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      payment_gateway: "cashfree",
    },
  });

  
  const [delivery,setData] = useState([])
  
  function getDelivery(){
    if(localStorage.getItem('delivery')){
      var delivery=JSON.parse(localStorage.getItem('delivery'))
      setData(delivery)
    }
  }

  useEffect(()=>{
    getDelivery()
  },[])
  function onSubmit(values: FormValues) {
    let input = {
      amount: delivery?.amount,
      id: delivery?.id,
      payment_gateway: values.payment_gateway,
    };

    createPayment(input, {
      onSuccess: (order: any) => {
        router.push(`/${router?.query?.shop}${ROUTES.DELIVERY}`);
      },
      onError: (error: any) => {
        // console.log(error?.response?.data?.message);
      },
    });
  }
  return (
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col"
    >
      <div className="flex justify-between  pt-4">
        <p className="text-base font-semibold text-heading">
          {("Total Amount")}
        </p>
        <span className="text-base font-semibold text-heading">{Math.round(delivery?.amount)} ₹</span>
        <input type="hidden" {...register('amount')} value={delivery?.amount}/>
        <input type="hidden" {...register('id')} value={delivery?.id}/>
      </div>

      <div className="my-6">
        <Label>{t("Payment Gateway")}</Label>

        <div className="flex items-center space-s-4">

          <Radio
            id="cod"
            type="radio"
            {...register("payment_gateway")}
            value="cod"
            label={t("Cash On Delivery")}
            className=""
          />

          <Radio
            id="cashfree"
            type="radio"
            {...register("payment_gateway")}
            value="cashfree"
            label={t("Credit Card")}
            className=""
          />

          <Radio
            id="upi"
            type="radio"
            {...register("payment_gateway")}
            value="upi"
            label={t("text-upi")}
            className=""
          />

          <Radio
            id="wallet"
            type="radio"
            {...register("payment_gateway")}
            value="wallet"
            label={t("Wallet")}
            className=""
          />
        </div>
      </div>

     
   
      <Button
        loading={loading}
        className="w-full mt-5 lg:w-auto lg:ms-auto"
      >
        {t("Place Order")}
      </Button>
    </form>
  );
};

export default PaymentForm;
