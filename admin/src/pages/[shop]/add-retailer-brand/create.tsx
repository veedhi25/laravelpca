import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import CreateOrUpdateRetailerBrandForm from "@components/retailer-brand/add-retailer-brand-form";

export default function AddRetailerBrand() {

  const { t } = useTranslation();

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {'Create Brand'}
        </h1>
      </div>
      <CreateOrUpdateRetailerBrandForm />
    </>
  );
}

AddRetailerBrand.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
AddRetailerBrand.Layout = ShopLayout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
