import React from 'react';
import Input from "@components/ui/input";
import { useUpiPaymentMutation } from '@data/upi/use-upi-payment.mutation';
import { useForm } from 'react-hook-form';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { Button } from '..';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';



export default function UpiPaymentForm(props:any ) {

    const { mutate: createOrder, isLoading: loading } = useUpiPaymentMutation();

    const { data } = useCustomerQuery();

    const router = useRouter();

    const {openModal} = useModalAction();

    // console.log('prop', props?.data?.props);

    const reciever_upi = props?.data?.props;

    const reciever_name = props?.data?.payee_name;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    
        formState: { errors },
      } = useForm ({
        // resolver: yupResolver(paymentSchema),
        
      });

       
  function onSubmit(values:any) {
    
    let input = { 
      //@ts-ignore
       amount: values?.amount,
      //  sender_upi: values?.sender_upi,
       reciever_upi: reciever_upi,
       reciever_name: reciever_name,
    };  

    createOrder(input, {
       //@ts-ignore
        onSuccess: (order: any) => {
          console.log('order link',order);
          if (order?.tracking_number) {
            router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
          }
          if (order)
          console.log(order?.data?.payload)
          {
            openModal('UPI_SCANNER_APPS', {
              data : Object.values(order?.data?.payload),
              amount: values?.amount,
              reciever_upi,
              reciever_name
            });
          }
        },
        onError: (error: any) => {
          // console.log(error?.response?.data?.message);
        },
      });
    }
  


  return (


    <div className='w-screen h-screen bg-white p-4 flex justify-evenly '>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col justify-center"
      >

          <div className='flex flex-col text-center mt-10'>

            <span className='flex items-center space-x-2 text-lg justify-center text-gray-800 font-semibold'>
                <span className='text-gray-700 '>Paying</span>
                <span className='text-gray-700 '>{reciever_name}</span>
            </span>
            <span className='font-light text-gray-700'>
                {reciever_upi}
            </span>
              
          </div>

          <div className='flex flex-col space-y-4 text-center mb-20 mt-20'>
            <Label className='text-xl  text-gray-800 font-semibold '>
              Enter Amount
            </Label>
            <Input
            {...register("contact", { required: "error-contact-required" })}
            // label={("Enter amount")}
            variant="border_less"
            className="flex-1 "
            inputMode='number'
            placeholder='₹ 0.00'
            dimension='big'
            // value={data?.me?.phone_number}
            onChange={(e) => setValue("amount", e.target.value)}
            error={(errors?.contact?.message!)}
            />
          </div>


        <Button
            loading={loading}
            // disabled={!subtotal || total < 0 || notAvailableItems.length > 0}
            className="w-full mt-20 lg:w-auto lg:ms-auto "
          >
            {("Proceed")}
        </Button> 
 
      </form>
        
    </div>

  )
}
