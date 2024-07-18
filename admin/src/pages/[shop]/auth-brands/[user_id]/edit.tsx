import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import CreateOrUpdateRetailerBrandForm from "@components/retailer-brand/add-retailer-brand-form";
import AuthBrandsEditForm from "@components/auth_brands/auth-brands-edit-form";
import { useAuthBrandByIdQuery } from "@data/auth_brands/use-auth-brand-by-id.query";
import { useRouter } from "next/router";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";

export default function EditAuthBrands() {

  const { t } = useTranslation();

  const { query } = useRouter();

  const { user_id } = query;

  const {data, isLoading:loading, error} = useAuthBrandByIdQuery(user_id);

  if (loading) return <Loader text={t("loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  // console.log('retailer', data)

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        {/* <h1 className="text-lg font-semibold text-heading">
          {'Edit '}
        </h1> */}
      </div>
      <AuthBrandsEditForm initialUser={data[0]}  />
    </>
  );
}

EditAuthBrands.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};

EditAuthBrands.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
