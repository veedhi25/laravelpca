import Layout from "@components/layouts/admin";
import CreateOrUpdateProductForm from "@components/product/product-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useProductQuery } from "@data/product/product.query";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
 import { useCourseQuery } from "@data/courses/use-course.query";
import CreateOrUpdateExamQuestionForm from "../create";
import { useExamQuestionQuery } from "@data/exam-questions/use-exam-question.query";
import { useBookQuery } from "@data/books/use-book.query";
import CreateUpdateBook from "../create";


export default function UpdateBooksPage() {

  const { t } = useTranslation();
  const { query } = useRouter();
  
  

  
  const { data, loading, error } = useBookQuery(query?.book_id);
  console.log('question_id',data)

  if (loading) return <Loader text={t("common:text-loading")} />; 
  if (error) return <ErrorMessage message={error?.message as string} />;
  
  if (data) {
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-heading">Edit Question</h1>
        </div>
        <CreateUpdateBook initialValues={data} />
      </>
    );
  }
  
  return null;  // or any other fallback JSX here.
  
  }
  



UpdateBooksPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
