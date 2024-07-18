import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopForm from "@components/commission/shop-form";
import Layout from "@components/layouts/admin";
import Button from "@components/ui/button";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import Link from "@components/ui/link";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useUpdateShopMutation } from "@data/shop/use-commission-shop-update.mutation";
import Input from "@components/ui/input";
import Card from "@components/common/card";
import { useFormState, Control, FieldErrors,useWatch,Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";


export default function UpdateShopPage() {
  const { query } = useRouter();
  const { shop } = query;
  const { t } = useTranslation();
  
  const { data, isLoading: loading, error } = useShopQuery(shop!.toString());
  const { mutate: updateShop, isLoading: updating } = useUpdateShopMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    shouldUnregister: true,
  });
  useEffect(()=>{
    // console.log(data);
  })
  function onSubmit(values: any) {
    updateShop(
      {
        variables: {
          id: shop as string,
          input: values,
        },
      },
      {
        onError: (error: any) => {
          // console.log(error);
        },
      }
    );
  }

  function getCommission():string{
    // console.log(data);
    if(data?.shop){
      return data?.shop?.commission as string;
    }
    return ""
  }

  return (
    <>
    <Card className="w-full ">

        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">
            Standard Commission
          </h1>
        </div>
        <div className="mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label={"Commission"}
                {...register("commission")}
                variant="outline"
                className="mb-5"
                defaultValue={getCommission()}
                placeholder="Commission percentage"
                error={t(errors.name?.message!)}
              />
            <Button
              loading={updating}
              disabled={updating}
            >
              Save
            </Button>
          </form>
        </div>
        {/* <ShopForm initialValues={data?.shop} /> */}
    </Card>
    </>
  );
}
UpdateShopPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
UpdateShopPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
