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
import { useFormState, Control, FieldErrors,useWatch,Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "@components/ui/input";
import { useProductsQuery } from "@data/product/products.query";
import Card from "@components/common/card";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { useUpdateProductMutation } from "@data/product/product-commission-update.mutation";
import { useEffect } from "react";

export default function UpdateShopPage() {
  const { query } = useRouter();
  const { shop } = query;
  const { t } = useTranslation();
  // const { data, isLoading: loading, error } = useShopQuery(shop as string);
  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();
  const {
      data,
      isLoading: loading,
      error,
    } = useProductsQuery(
    {
      limit:200,  
      shop_id: Number(shop),
    },
    {
      enabled: Boolean(shop),
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    shouldUnregister: true,
      
  });

  function onSubmit(values: any) {
    updateProduct(
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
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <Card className="w-full ">

        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">
            Shop Commission Variable
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {
            data?.products?.data.map((product,_id)=>{
              return(
                <div className="flex" key={_id}>
                  <div className="flex-1 flex">
                         < Image        quality='40'
                        src={product.image?.thumbnail ?? siteSettings.product.placeholder}
                        alt={product.name}
                        layout="fixed"
                        width={42}
                        height={42}
                        className="rounded overflow-hidden"
                      />
                      <span className="m-2">
                        {product.name}
                      </span>
                  </div>
                  <div className="flex-1 flex">
                    <Input
                          variant="outline"
                          {...register("commission"+product.id)}
                          placeholder="commission %"
                          id={product.id}
                          defaultValue={product.commission}
                      />
                  </div>
                </div>
              )
            })
          }
          <Button>
            Save
          </Button>
        </form>
      </Card>
      {/* <ShopForm initialValues={data?.shop} /> */}
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
