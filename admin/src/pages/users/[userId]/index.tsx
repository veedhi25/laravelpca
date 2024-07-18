import Layout from "@components/layouts/admin";
import CustomerCreateForm from "@components/user/user-form";
import { useUserFindQuery } from "@data/user/use-user-find.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function CreateCustomerPage() {
  const { t } = useTranslation();
  const {query} = useRouter();

  const {data : user , isLoading } = useUserFindQuery(query?.userId)
  
  if(!user) return isLoading;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t(" Update Student")}
        </h1>
      </div>
      <CustomerCreateForm initialValues={user}  /> 
    </>
  );
}
CreateCustomerPage.Layout = Layout;

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["table", "form", "common"])),
//   },
// });
