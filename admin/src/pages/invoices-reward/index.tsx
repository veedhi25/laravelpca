import Card from '@components/common/card'
import Input from '@components/ui/input'
import React from 'react'
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { BillCashback } from "@ts-types/generated";
import pick from "lodash/pick";
import { adminOnly } from "@utils/auth-utils";
import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from '@components/ui/button';
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceRewardValidationSchema } from "@data/invoices-reward-data/validation-schema";
import Description from "@components/ui/description";
import { useCreateInvoiceRewardMutation } from "@data/invoices-reward/use-invoice-reward.mutation";
import { useBillRewardQuery } from "@data/invoices-reward/use-invoice-reward.query";
import { useEffect } from "react";


interface FormValues {
  cashback_percentage: number;
  max_cashback: number;
  }

  const defaultValues = {
    cashback_percentage: 0,
    max_cashback: 0,
};

  type IProps = {
    initialValues?: BillCashback | null;
  };

export default function InvoicesReward() {

  const { t } = useTranslation("common");
  const { mutate: registerInvoiceReward, isLoading: loading } = useCreateInvoiceRewardMutation();
  const {
    data
  } = useBillRewardQuery();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: data?.reward ? data.reward : defaultValues,
    resolver: yupResolver(invoiceRewardValidationSchema),
  });

  useEffect(()=>{
    if(data){
      // console.log(data.reward,'data')
      document.getElementById('cashback_percentage').value=data.reward?.cashback_percentage
      document.getElementById('max_cashback').value=data.reward?.max_cashback
    }
  },[data])
  
  async function onSubmit({ cashback_percentage, max_cashback}: FormValues) {
    registerInvoiceReward(
      {
        variables: {
          cashback_percentage,
          max_cashback,
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }


    return (
        <>

        <div className='w-full  mb-10  px-auto '>
            {/* <h1 className='font-md text-xl'>Set Cashback</h1> */}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("Invoices Cashback ")}
          details={("Set Cashback Amount")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={("Cashback (%)")}
            {...register("cashback_percentage")}
            type="text"
            variant="outline"
            id="cashback_percentage"
            className="mb-4"
            placeholder='%'
            error={t(errors.cashback_percentage?.message!)}
          />

          <Input
            label={("Max Cashback upto (₹)")}
            {...register("max_cashback")}
            type="text"
            variant="outline"
            className="mb-4"
            placeholder='₹'
            id="max_cashback"
            error={t(errors.max_cashback?.message!)}
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button >
          {("Create")}
        </Button>
      </div>
    </form>
        
        </>
    )
}
InvoicesReward.authenticate = {
  permissions: adminOnly,
};
InvoicesReward.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["form", "common", "table"])),
    },
  });