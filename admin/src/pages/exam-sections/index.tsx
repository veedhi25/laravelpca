import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import ProductList from "@components/product/product-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { OrderField } from "@ts-types/index";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
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
import Link from 'next/link';
import { useRouter } from "next/router";
import CourseList from "@components/courses/courses-list";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import { useExamSectionsQuery } from "@data/exam-sections/use-exam-section.query";
import ExamSectionList from "@components/exam-sections/exam-section-list";


export default function ExamsSections() {

    const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const { t } = useTranslation();
    const [orderBy, setOrder] = useState("created_at");
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    const [visible, setVisible] = useState(false);

    const { openModal } = useModalAction();

    const {query} = useRouter();
    console.log('query', query)

    const toggleVisible = () => {
        setVisible((v) => !v);
      };


    function handleImportModal() {
        openModal("EXPORT_IMPORT_ADMIN_PRODUCT");
      }

      const {data:sections} = useExamSectionsQuery();
    console.log('sections',sections?.data);

      function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
        setPage(1);
      }
      
      function handlePagination(current: any) {
        setPage(current);
      }

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row space-x-2 justify-evenly items-center">
          
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading">
              {t("Exam Sections")}
            </h1>
          </div>

          <div className="w-full md:w-2/4 flex flex-col   items-center ms-auto">
            <Search onSearch={handleSearch} />
          </div>
          <Link href='/exam-sections/create'><Button className="bg-green-700">
            Create Section +
          </Button></Link>
          <Button
              onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t("common:text-export-import")}
          </Button>
          
          <button
              onClick={handleImportModal}
              className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
            >
            <MoreIcon className="w-3.5 text-body" />
          </button>
          
        </div>

        

        
        
      </Card>
      <ExamSectionList exam_sections={sections} onPagination={handlePagination} />
    </>
  )
}

ExamsSections.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
