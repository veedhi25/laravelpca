import Layout from "@components/layouts/admin";
import CreateOrUpdateProductForm from "@components/product/product-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useProductQuery } from "@data/product/product.query";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CreateOrUpdateMarkingSchemeForm from "../create";
import { useCourseQuery } from "@data/courses/use-course.query";
import { useMarkingSchemeQuery } from "@data/marking-scheme/use-marking-scheme.query";


export default function UpdateMarkingSchemePage() {

  const { t } = useTranslation();
  const { query } = useRouter();

  const { data: marking_scheme, loading, error } = useMarkingSchemeQuery(query?.marking_scheme_id);
  
  console.log('marking scheme query',marking_scheme?.data);

  if (loading) return <Loader text={t("common:text-loading")} />;
  
  if (error) return <ErrorMessage message={error?.message as string} />;
  
  if (marking_scheme) {
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">Edit Question Type</h1>
        </div>
        <CreateOrUpdateMarkingSchemeForm initialValues={marking_scheme?.data} />
      </>
    );
  }
  
  return null;  // or any other fallback JSX here.
  
  }
  



UpdateMarkingSchemePage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
