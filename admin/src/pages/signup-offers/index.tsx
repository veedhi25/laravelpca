import Layout from "@components/layouts/admin";
import Form from "@components/signup-offers/form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSignupQuery } from "@data/signup-offer/use-signup.query";

export default function CreateCustomerPage() {
  const { t } = useTranslation();
  const {
    data
  } = useSignupQuery();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {("Signup Offer")}
        </h1>
      </div>
      <Form initialValues={data}/>
    </>
  );
}
CreateCustomerPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "form", "common"])),
  },
});
