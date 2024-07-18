
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import OrderList from "@components/order/order-list";
import { useEffect, useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { MoreIcon } from "@components/icons/more-icon";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import CategoryTypeFilter from "@components/master-products/category-type-filter";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import cn from "classnames";
import ShopNameFilter from "@components/order/shop-name-filter";
import { useDateRangeQuery } from "@data/order/use-date-range.query";
import { CloseIcon } from "@components/icons/close-icon";


export default function Orders() {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [searchTerm, setSearchTerm] = useState();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { openModal } = useModalAction();
  const [visible, setVisible] = useState(false);

  const[shopNameFilter, setShopNameFilter] = useState(false);

  const [shopName, setShopName] = useState("");
  const [shopCategory, setShopCategory] = useState(""); 
  const [searchType, setSearchType] = useState<"name" | "email" | "phone" | "address">("name");


  const convertStartDate = () => {
    const d = new Date(startDate);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const convertEndDate = () =>{
    const d = new Date(endDate);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const {
    data,
    isLoading: loadingProducts,
    error: err,
  } = useDateRangeQuery(
      // {page,limit:15},
      //@ts-ignore
    convertStartDate(),
    convertEndDate(),
    // shopName,
  
  );


  const {
    data: allOrders,
    isLoading: loading,
    error,
  } = useOrdersQuery({
    limit: 15,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
    searchType,
    // shopName,
    // shopCategory,
  });
 


  if (loading) return <Loader text={t("common:text-loading")} />;

  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  
  function handlePagination(current: any) {
    setPage(current);
  }

  function handleImportModal() {
    openModal("EXPORT_IMPORT_ORDERS");
  }

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading">
              {t("form:input-label-orders")}
            </h1>
          </div>
          
          <div className="w-full md:w-full flex  items-center ms-auto">
            <select
                  className="  text-gray-600 p-4 text-sm items-center mr-4 bg-white border rounded flex "
                  onChange={(e) => setSearchType(e.target.value)}
                  value={searchType}
                  defaultValue="Search by"
                >
                  <option value="name">{t("form:input-label-name")}</option>
                  {/* <option value="email">{t("form:input-label-email")}</option> */}
                  <option value="phone_number">{t("Phone Number")}</option>
                  <option value='tracking_number'>Tracking number</option>
                  <option value='email_id'>Email</option>
                  <option value='shop_name'>Shop Name</option>
                  <option value='status'>Status</option>
                  
              </select> <Search onSearch={handleSearch} />
          </div>

          <Button
              onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t("common:text-export-import")}
          </Button>

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
          <button
              onClick={handleImportModal}
              className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
            >
             <MoreIcon className="w-3.5 text-body" />
          </button>
          </div>
         

          <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
         <div className="flex flex-col md:flex-row md:space-x-4 md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
          <div className="flex items-center "> <span className="text-gray-700 font-light mx-4">From</span> 
            <div className="relative flex items-center"> 
            <DatePicker clearButtonTitle="clear"
             selected={startDate} onChange={(date:Date ) => setStartDate(date)} 
             dateFormat= "dd/MM/yyyy"
             className=""
            //  clearIcon={null}
              /><span className={` ${startDate !== null ? 'block' : 'hidden'} cursor-pointer absolute right-2 text-gray-600  rounded-full `} onClick={()=>setStartDate(null)}><CloseIcon className="w-4 h-4"/></span>
              

            </div>
            <span className="text-gray-700 font-light mx-4">to</span> 
            <div className="relative items-center w-60"><DatePicker
              // clearIcon={null}
              selected={endDate} onChange={(date:Date) => setEndDate(date)} 
              dateFormat= "dd/MM/yyyy"
              />
              <span className={` ${endDate !== null ? 'block' : 'hidden'} cursor-pointer absolute right-2 text-gray-600 top-4 rounded-full `} onClick={()=>setEndDate(null)}><CloseIcon className="w-4 h-4"/></span>
            </div>
             
          </div>
           
          <ShopNameFilter
              className="w-full md:w-full md:mr-5"
              onShopCategoryFilter={({ slug }: { slug: string }) => {
                setShopCategory(slug);
              }}
              onShopNameFilter={({ slug }: { slug: string }) => {
                setShopName(slug);
              }}
              shopCategory={shopCategory}
              shopName={shopName}
             
            />
          <SortForm
            showLabel={false}
            className="w-full md:w- md:ms-5 mt-5 md:mt-0"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: "total", label: "Total" },
              { value: "created_at", label: "Created At" },
              { value: "updated_at", label: "Updated At" },
            ]}
          />
          </div>
          
        </div>
      </Card>

      <OrderList orders={
         endDate === null ?
          allOrders?.orders
          : data?.orders
           } onPagination={handlePagination} />
    </>
  );
}

Orders.Layout = Layout;


export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});


