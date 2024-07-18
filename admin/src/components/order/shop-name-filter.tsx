import Select from "@components/ui/select/select";

import React from "react";
import { useTranslation } from "next-i18next";
import Label from "@components/ui/label";
import cn from "classnames";
import { useTypesQuery } from "@data/type/use-types.query";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useShopsQuery } from "@data/shop/use-shops.query";
import { useParentCategoriesQuery } from "@data/shop-categories/use-parent-categories.query";

type Props = {
  onShopCategoryFilter: Function;
  onShopNameFilter: Function;
  shopCategory: string;
  shopName: string;
  className?: string;
};

export default function ShopNameFilter({
  onShopNameFilter,
  onShopCategoryFilter,
  className,
  shopCategory,
  shopName,
}: Props) {
  const { t } = useTranslation();

  // const { data, isLoading: loading } = useTypesQuery();

  // const { data: categoryData, isLoading: categoryLoading } = useCategoriesQuery(
  //   {
  //     limit: 9999,
  //   }
  // );

  const {
    data:shopData,
    isLoading: shopNameLoading,
    // error,
  } = useShopsQuery({
    // text: searchTerm,
    limit: 9999,
    // type: 'Groceries',
    // page,
    // orderBy,
    // sortedBy,
  });

  const categorySlug = shopCategory.replace(/\s/g, "-");
  // and capitalise the first letter
  const categorySlugCapitalised = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  // console.log('cartegorySlugCapitalised', categorySlugCapitalised);

  const filteredShops = shopData?.shops?.data?.filter((shop) => shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','').includes(categorySlugCapitalised[0]?.toUpperCase()));
  // console.log('filteredshops', filteredShops);

  // console.log('shop data',shopData);
  
  // renderShopNames('chandigarh-home-salon')

  // console.log('on category filter',shopCategory);
  // console.log('on shop filter',shopName);


  const {
    data: shopCategoryData,
    isLoading: shopCategoryLoading,
   
  } = useParentCategoriesQuery({
    limit: 20,
    page:1,
    // type,
    // text: searchTerm,
    // orderBy,
    // sortedBy,
   
  });



  // console.log(shopData?.shops?.data)
  // console.log(shopCategoryData)

  // filter shops based on type selected

   



  return (

    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full",
        className
      )}
    >
      <div className="w-full">
        {/* <Label>{t("common:filter-by-group")}</Label> */}
        <Select
          options={shopCategoryData?.categories?.data}
          isLoading={shopCategoryLoading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t("Filter by Category")}
          onChange={onShopCategoryFilter}
        />
      </div>
      <div className="w-full">
        {/* <Label>{t("common:filter-by-category")}</Label> */}
        <Select
          options={filteredShops}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t("Filter by Shop name")}
          isLoading={shopNameLoading}
          onChange={onShopNameFilter}
        />
      </div>
    </div>
  );
}
