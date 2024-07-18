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
import CreateOrUpdateQuestionTypeForm from "../create";
import { useExamSectionsQuery } from "@data/exam-sections/use-exam-section.query";
import { useQuestionTypeQuery } from "@data/question-type/use-question-type.query";


export default function UpdateExamSectionPage() {

  const { t } = useTranslation();
  const { query } = useRouter();
  
  const { data: question_type, loading, error } = useQuestionTypeQuery(query?.question_type_id);
//   const { data: question_type, loading, error } = useExamSectionsQuery(query?.section_id);

 console.log('q type',question_type)
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  
  if (question_type) {
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">Edit Question Type</h1>
        </div>
        <CreateOrUpdateQuestionTypeForm initialValues={question_type?.data} />
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
