
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopForm from "@components/shop/shop-form";
import ShopLayout from "@components/layouts/shop";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { useShopQuery } from "@data/shop/use-shop.query";
import RetailerBrandEditForm from "@components/retailer-brand/retailer-brand-edit-form";
import { useRetailerBrandsQuery } from "@data/retailer-brands/use-retailer-brand-query";
import { useRetailerBrandByIdQuery } from "@data/retailer-brands/fetch-retailer-brand-query";


export default function UpdateRetailerBrand() {

    const { query } = useRouter();
    const { brand_id } = query;
  
    const { t } = useTranslation();
  
    // useRetailerBrandQuery should be a hook that fetches one specific retailer brand based on its ID
    const { data, isLoading: loading, error } = useRetailerBrandByIdQuery(28); // passing the id here
  
    if (loading) return <Loader text={t("loading")} />;
    if (error) return <ErrorMessage message={error.message} />;

    console.log('retailer brand', data);
  
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">
            Edit Brand
          </h1>
        </div>
  
        {/* pass the specific retailer brand to the form, not the entire data object */}
        <RetailerBrandEditForm initialValues={data} /> 
      </>
    );
  }
  
  UpdateRetailerBrand.authenticate = {
    permissions: adminAndOwnerOnly,
  };
  
  UpdateRetailerBrand.Layout = ShopLayout;
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["form", "common"])),
    },
  });
  
