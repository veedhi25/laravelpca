import LogList from "@components/logs/log-list";
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useLogsQuery } from "@data/logs/use-logs.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import SortForm from "@components/common/sort-form";
import TypeFilter from "@components/shop-categories/type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";
import ShopVisitorList from "@components/all-shop-visitors/shop-visitor-list";
import VisitorList from "@components/shop/shop-visitors-list";
import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useRouter } from "next/router";
import ShopLayout from "@components/layouts/shop";


export default function ShopVisitors() {

  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const {
    query: { shop },
  } = useRouter();

  console.log('query', shop)

  const {
    data,
    isLoading: loading,
    error,
  } = useLogsQuery({
    limit: 20,
    // page,
    type,
    text: searchTerm,
    orderBy,
    sortedBy,
  });

  // const shopVisitorLogs = data?.logs?.data?.filter((imt)=> imt.shop.slug == shop)
  // console.log(shopVisitorLogs); 
  console.log(data?.logs?.data);

  if (loading) return <Loader text={t("common:text-loading")} />;

  if (error) return <ErrorMessage message={error.message} />;

  console.log('logs', data?.logs?.data.filter((imt)=>imt.type === 'shop-visited'))

  const filteredLogs = data?.logs?.data.filter((imt)=>imt.type === 'shop-visited');

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
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-semibold text-heading">
              {("Shop Visitors")}
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center">
            <div className="w-full flex items-center">
              <Search onSearch={handleSearch} />
            </div>

            <button
              className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={toggleVisible}
            >
              {t("common:text-filter")}{" "}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <SortForm
              className="w-full md:w-1/2 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { id: 1, value: "name", label: "Name" },
                { id: 2, value: "created_at", label: "Created At" },
                { id: 2, value: "updated_at", label: "Updated At" },
              ]}
            />
          </div>
          
        </div>
      </Card>
      {/* <LogList
        logs={data?.logs}
        onPagination={handlePagination}
      /> */}
       <VisitorList
        logs={data?.logs}
        onPagination={handlePagination}
        shopSlug = {shop}
      />
    </>
  );
}

  ShopVisitors.authenticate = {
    permissions: adminAndOwnerOnly,
  };
  ShopVisitors.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
