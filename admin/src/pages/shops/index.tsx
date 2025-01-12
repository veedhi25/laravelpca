import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopList from "@components/shop/shop-list";
import { useState } from "react";
import Search from "@components/common/search";
import { adminOnly } from "@utils/auth-utils";
import { useShopsQuery } from "@data/shop/use-shops.query";
import SortForm from "@components/common/sort-form";
import { SortOrder } from "@ts-types/generated";
import { useModalAction } from "@components/ui/modal/modal.context";
import { MoreIcon } from "@components/icons/more-icon";
import Button from "@components/ui/button";

export default function AllShopPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { openModal } = useModalAction();
  const {
    data,
    isLoading: loading,
    error,
  } = useShopsQuery({
    text: searchTerm,
    limit: 10,
    page,
    orderBy,
    sortedBy,
  });

  // console.log('shops',data?.data)
  console.log('all shops',data?.shops?.data.map((m)=>{return [{'shop':m?.name,'number':m.owner?.phone_number}]}))

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  function handleImportModal() {
    openModal("EXPORT_IMPORT_SHOPS");
  }
  
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("Company")}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center ms-auto">
          <Search onSearch={handleSearch} />
          <Button
              onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t("common:text-export-import")}
          </Button>
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
              { id: 1, value: "name", label: "Name" },
              { id: 1, value: "products_count", label: "Products Count" },
              { id: 1, value: "orders_count", label: "Orders Count" },
              { id: 2, value: "created_at", label: "Created At" },
              { id: 2, value: "updated_at", label: "Updated At" },
            ]}
          />
          <button
              onClick={handleImportModal}
              className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
            >
            <MoreIcon className="w-3.5 text-body" />
          </button>
        </div>
      </Card>
      <ShopList shops={data?.shops} onPagination={handlePagination} />
    </>
  );
}
AllShopPage.authenticate = {
  permissions: adminOnly,
};
AllShopPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
