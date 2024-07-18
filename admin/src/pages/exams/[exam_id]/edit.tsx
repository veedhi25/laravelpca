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
import { useExamQuery } from "@data/exams/use-exam.query";


export default function UpdateExamPage() {

  const { t } = useTranslation();
  const { query } = useRouter();
 

  
  // const { data: course, loading, error } = useCourseQuery(query?.course_id);
  const {data : exam , loading , error} = useExamQuery(query?.exam_id)
  console.log("query" , exam)
  

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  
  if (exam) {
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">Edit Exam</h1>
        </div>
        <CreateOrUpdateCourseForm initialValues={exam} />
      </>
    );
  }
  
  return null;
  
  }
  



UpdateExamPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
