import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layouts/admin";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { useUpdateShopMutation } from "@data/shop/use-commission-type-shop-update.mutation";
import { DollarIcon } from "@components/icons/shops/dollar";
import Radio from "@components/ui/radio/radio";
import { useShopQuery } from "@data/shop/use-shop.query";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useEffect } from "react";

export default function UpdateShopPage() {
  const { query } = useRouter();
  const { shop } = query;
  const { data, isLoading: loading, error } = useShopQuery(shop!.toString());
  const { t } = useTranslation();
  const { mutate: updateShop, isLoading: updating } = useUpdateShopMutation();
  useEffect(()=>{
    // // console.log(data);
  })
  function change(e:any) {
    var value=e.target.value
    
    updateShop(
      {
        variables: {
          id: shop as string,
          input:value as any,
        },
      },
      {
        onError: (error: any) => {
          // console.log(error);
        },
      }
    );
  }
  function isChecked(value:string)
  {
    // console.log(value);
    if(data?.shop?.commission_type){

      if(data?.shop?.commission_type == value){
        return true;
      }
    }
    return false
    
  }
  if (loading) return <Loader text={"loading"} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          Shop Commission
        </h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6 mt-6">
        <div className="flex-1 w-full ">
          <div className="flex flex-col w-full h-full p-7 rounded bg-light">
            <div className="w-full flex justify-between mb-auto pb-8">
              <div className="w-full flex flex-col">
                <span className="text-base text-heading font-semibold mb-1">
                  Variable Commission
                </span>
                <span className="text-xs text-body font-semibold">
                </span>
              </div>

              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center ms-3"
                style={{backgroundColor: "#A7F3D0" }}
              >
                <DollarIcon className="w-7 h-7" color="#047857" />
              </div>
            </div>
              <div className="flex justify-between">
                <a
                  className="text-md text-purple-700 no-underline font-semibold"
                  href={"/commission/"+shop+"/variable"}
                >
                  {"Set up"}
                </a>
                <Radio
                  id="radio"
                  value="variable"
                  onChange={change}
                  checked={isChecked("variable")}
                  name="commission_type"
                />
              </div>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="flex flex-col w-full h-full p-7 rounded bg-light">
            <div className="w-full flex justify-between mb-auto pb-8">
              <div className="w-full flex flex-col">
                <span className="text-base text-heading font-semibold mb-1">
                  Standard Commission
                </span>
                <span className="text-xs text-body font-semibold">
                </span>
              </div>

              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center ms-3"
                style={{ backgroundColor: "#93C5FD" }}
              >
                <DollarIcon className="w-7 h-7" color="#1D4ED8" />
              </div>
            </div>
            <div className="flex justify-between">
              <a
                className="text-md text-purple-700 no-underline font-semibold"
                href={"/commission/"+shop+"/standard"}
              >
                {"Set up"}
              </a>
              <Radio
                onChange={change}
                name="commission_type"
                value="standard"
                id="radio1"
                checked={isChecked("standard")}
              />
            </div>
          </div>
        </div>
      </div>
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
