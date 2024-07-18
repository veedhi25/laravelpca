import Card from "@components/common/card";
import Search from "@components/common/search";
import ProductList from "@components/product/product-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layouts/admin";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useProductsQuery } from "@data/product/brand-offers.query";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import CategoryTypeFilter from "@components/product/category-type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";
import BrandOfferList from "@components/product/brand-offer-list";
import { useClassesQuery } from "@data/class/use-classes.query";
import ClassesList from "@components/classes-list";
import router, { useRouter } from "next/router";
import BatchesList from "@components/batches-list";
import { useBatchesQuery } from "@data/batch/use-batches.query";
import { useBooksQuery } from "@data/books/use-books.query";
import BooksList from "@components/books-list";

export default function Books() {

  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useBooksQuery();
 
  console.log('batch', data);

  if (loading)
    return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  
  
  return (

    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading">
              Books
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center">
            <div className="w-full flex items-center">
              <Search onSearch={handleSearch} />
            </div>

            <button
              className="text-white rounded px-3 bg-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={()=>router.push(`${router.asPath}/create`)}
            >
             Add Book +
            </button>
          </div>
        </div>

        <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
          
        </div>
      </Card>
      <BooksList books={data} onPagination={handlePagination} />
    </>
  );
}

Books.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
Books.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
