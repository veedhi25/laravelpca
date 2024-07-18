import Layout from "@components/layouts/admin";
import CreateOrUpdateCategoriesForm from "@components/category/category-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ShopLayout from "@components/layouts/shop";
import CreateOrUpdateBrandForm from "@components/brands/brand-form";


export default function CreateCategoriesPage() {

  const { t } = useTranslation();

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("Create Brand")}
        </h1>
      </div>
      <CreateOrUpdateBrandForm />
    </>
  );
}

CreateCategoriesPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
