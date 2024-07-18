import Card from "@components/common/card";
import Search from "@components/common/search";
import ProductList from "@components/master-products/shop-master-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import { useRouter } from "next/router";
import LinkButton from "@components/ui/link-button";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useProductsQuery } from "@data/master-products/products.query";
import { SortOrder } from "@ts-types/generated";
import { OrderField } from "@ts-types/index";
import SortForm from "@components/common/sort-form";
import CategoryTypeFilter from "@components/master-products/category-type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";
import ProductsFeed from "./products-feed"

export default function ProductsPage() {
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );
  const shopId = shopData?.shop?.id!;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading">
              {t("form:input-label-products")}
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
            <CategoryTypeFilter
              className="w-full md:w-2/3 md:me-5"
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
        </div>
      </Card>
      <Card className="flex flex-col mb-8 overflow-x-scroll w-full">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0">
            <ProductsFeed 
                shopId={shopId}
                searchTerm={searchTerm}
                category={category}
              
                
                type={type}
                orderBy={orderBy}
                sortedBy={sortedBy}
              />
          </div>
        </div>
      </Card>
    </>
  );
}
ProductsPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
ProductsPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({

  props: {

    ...(await serverSideTranslations(locale,[
          "table",
          "common",
          "form"
        ])),
        
  },
});
