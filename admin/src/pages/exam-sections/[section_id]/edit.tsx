import Layout from "@components/layouts/admin";
import CreateOrUpdateProductForm from "@components/product/product-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useProductQuery } from "@data/product/product.query";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CreateOrUpdateCourseForm from "../create";
import { useCourseQuery } from "@data/courses/use-course.query";
import CreateOrUpdateExamSectionForm from "../create";
import { useExamSectionsQuery , useExamSectionQuery } from "@data/exam-sections/use-exam-section.query";


export default function UpdateExamSectionPage() {

  const { t } = useTranslation();
  const { query } = useRouter();
  
  const { data: sections, loading, error } = useExamSectionQuery(query?.section_id);

  console.log("saurav" , sections)

  
  

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  
  if (sections) {
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">Edit Product</h1>
        </div>
        <CreateOrUpdateExamSectionForm initialValues={sections?.data} />
      </>
    );
  }
  
  return null;  // or any other fallback JSX here.
  
  }
  



UpdateExamSectionPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
