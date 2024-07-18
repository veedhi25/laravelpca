
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import ShopList from "@components/commission/shop-list";
import Search from "@components/common/search";
import { adminOnly } from "@utils/auth-utils";
import { useShopsQuery } from "@data/shop/use-shops.query";
import { useRefferalCommissionQuery } from "@data/shop/use-referral-commission.query";
import SortForm from "@components/common/sort-form";
import { SortOrder } from "@ts-types/generated";
import ReferalCommissionForm from "@components/commission/referal-commission-form"


export default function AllShopPage() {

  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  
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
  const { data:refferal_commission, isLoading:commissionLoading} = useRefferalCommissionQuery()
  if (loading||commissionLoading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <div className="flex flex-col md:flex-column justify-between mb-8 mt-5">
        <h1 className="text-lg font-semibold text-heading">
          REFERRAL COMMISSION
        </h1>
        <div className="card-body w-full">
          <ReferalCommissionForm initialValues={refferal_commission?.refferal_commission}/>
        </div>
      </div>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("common:sidebar-nav-item-shops")}
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
              { id: 1, value: "name", label: "Name" },
              { id: 1, value: "products_count", label: "Products Count" },
              { id: 1, value: "orders_count", label: "Orders Count" },
              { id: 2, value: "created_at", label: "Created At" },
              { id: 2, value: "updated_at", label: "Updated At" },
            ]}
          />
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
