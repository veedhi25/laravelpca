
import Card from "@components/common/card";
import Search from "@components/common/search";
import OrderList from "@components/order/order-list";
import { LIMIT } from "@utils/constants";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import { useRouter } from "next/router";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { OrderField } from "@ts-types/index";
import { SortOrder } from "@ts-types/generated";
import { useShopQuery } from "@data/shop/use-shop.query";
import SortForm from "@components/common/sort-form";
import { useModalAction } from "@components/ui/modal/modal.context";
import { MoreIcon } from "@components/icons/more-icon";



export default function Orders() {
  
  const {
    query: { shop },
  } = useRouter();

  const { t } = useTranslation();
  const { openModal } = useModalAction();

  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );

  const shopId = shopData?.shop?.id!;
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading: loading,
    error,
  } = useOrdersQuery(
    {
      limit: LIMIT,
      page,
      text: searchTerm,
      orderBy,
      sortedBy,
      shop_id: Number(shopId),
    },
    {
      enabled: Boolean(shopId),
    }
  );

  console.log('admin order',data?.orders)

  if (loading || fetchingShop)
    return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }
  
  function handleImportModal() {
    openModal("EXPORT_IMPORT_SHOP_ORDERS");
  }

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("form:input-label-orders")}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center ms-auto">
          <Search onSearch={handleSearch} />
          <SortForm
            showLabel={false}
            className="w-full md:w-1/2 md:ms-5 mt-5 md:mt-0 flex-shrink-0"
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
        <button
              onClick={handleImportModal}
              className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
            >
             <MoreIcon className="w-3.5 text-body" />
        </button>
      </Card>

      <OrderList orders={data?.orders} onPagination={handlePagination} />
    </>
  );
}

Orders.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
Orders.Layout = ShopLayout;


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
