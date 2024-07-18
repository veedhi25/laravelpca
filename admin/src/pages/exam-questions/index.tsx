import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import ProductList from "@components/product/product-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { OrderField } from "@ts-types/index";
import { SortOrder } from "@ts-types/generated";
import { useEffect, useState } from "react";
import { useProductsQuery } from "@data/product/products.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SortForm from "@components/common/sort-form";
import CategoryTypeFilter from "@components/product/category-type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";
import { useModalAction } from "@components/ui/modal/modal.context";
import { MoreIcon } from "@components/icons/more-icon";
import Button from "@components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import CourseList from "@components/courses/courses-list";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import { useExamsQuestionsQuery } from "@data/exam-questions/use-exam-questions.query";
import ExamQuestionsList from "@components/exam-questions/exam-questions-list";
import QuestionListWithDetails from "@components/exam-questions/exam-question-list-with-details";
import { usePaginatedExamQuestionsQuery } from "@data/exam-questions/use-paginated-exam-questions.query";
import { useExamQuestionSearchQuery } from "@data/exam-questions/use-exam-question-search.query";


export default function ExamQuestions() {

  const [searchTerm, setSearchTerm] = useState("");
  // const [type, setType] = useState("");
  // const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  // const [orderBy, setOrder] = useState("created_at");
  // const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  // const [visible, setVisible] = useState(false);
  // const [filterquestion, setFilterQuestion] = useState([]);
  

  const { openModal } = useModalAction();

  const { query } = useRouter();
  console.log("query", query);

  // const toggleVisible = () => {
  //   setVisible((v) => !v);
  // };

  function handleImportModal() {
    openModal("EXPORT_IMPORT_ADMIN_PRODUCT");
  }


  


  
  // useEffect(() => {
  //   console.log("hi this uis saurav");
  //   setFilterQuestion(questions);
  // }, [questions]);

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  const searchParams = { sectionId: '2', tagId: '', questionTypeId: '' };
  const { data, isLoading, error } = useExamQuestionSearchQuery(searchParams);
  
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;
  console.log('search question', data)

  // function handlePagination(current: any) {
  //   setPage(current);
  // }

  return (
    
      <div className="">
        <Card className="flex flex-col mb-8">
          <div className="w-full flex flex-col md:flex-row space-x-2 justify-evenly items-center">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <h1 className="text-lg font-semibold text-heading">
                {t("Exams Questions")}
              </h1>
            </div>

            <div className="w-full md:w-2/4 flex flex-col   items-center ms-auto">
              <Search onSearch={handleSearch} />
            </div>
            <Link href="/exam-questions/create">
              <Button className="bg-green-700">Create Exam Question +</Button>
            </Link>
            <Button
              onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t("common:text-export-import")}
            </Button>
            {/* <button
            className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
            onClick={toggleVisible}
          >
            {t("common:text-filter")}{" "}
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button> */}
            <button
              onClick={handleImportModal}
              className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
            >
              <MoreIcon className="w-3.5 text-body" />
            </button>
          </div>

          {/* <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <CategoryTypeFilter
              className="w-full md:w-2/3 md:mr-5"
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
              }}
            />
            <SortForm
              className="w-full md:w-1/3 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: "name", label: "Name" },
                { value: "price", label: "Price" },
                { value: "max_price", label: "Max Price" },
                { value: "mix_price", label: "Min Price" },
                { value: "sale_price", label: "Sale Price" },
                { value: "quantity", label: "Quantity" },
                { value: "created_at", label: "Created At" },
                { value: "updated_at", label: "Updated At" },
              ]}
            />
          </div>
          
        </div> */}
        </Card>
        <QuestionListWithDetails />
      </div>
    
  );
}

ExamQuestions.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
