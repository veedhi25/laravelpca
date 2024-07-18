import ShopLayout from "@components/layouts/shop";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import Multiselect from "multiselect-react-dropdown";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Card from "@components/common/card";
import { useUsersQuery } from "@data/user/use-users.query";
import SelectInput from "@components/ui/select-input";
import { useForm } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import { useAuthBrandCreateMutation } from "@data/auth_brands/use-auth-brand-create.mutations";
import { useIsRTL } from "@utils/locals";
import LinkButton from "@components/ui/link-button";
import SortForm from "@components/common/sort-form";
import { SortOrder } from "@ts-types/generated";
import { Router, useRouter } from "next/router";
import { useRetailerBrandsQuery } from "@data/retailer-brands/use-retailer-brands-query";
import Table from "rc-table";
import CreateOrUpdateRetailerBrandForm from "@components/retailer-brand/add-retailer-brand-form";
import AddRetailerBrand from "./create";
import ActionButtons from "@components/common/action-buttons";
import { useParentCategoriesQuery } from "@data/category/use-parent-categories.query";


const brands = [
    { id: 1, name: 'ITC' },
    { id: 2, name: 'HUL' },
    { id: 3, name: 'Nestle' },
    { id: 4, name: 'Dabur' },
    { id: 5, name: 'Britannia' },
  ];
  
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];


  const FmcgBrands = () => {

    const {
      query: { shop },
    } = useRouter();
    
    const router = useRouter();
    const [orderBy, setOrder] = useState("updated_at");
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    const { data: allBrands, isError, isFetching } = useRetailerBrandsQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);

    const {
      data,
      isLoading: loading,
      error,
    } = useParentCategoriesQuery({
      limit: 20,
      page,
      type,
      text: searchTerm,
      orderBy,
      sortedBy,
    });

    console.log('brands', data?.categories?.data);
  
    const columns = [
      // {
      //   title: "Brand Id",
      //   dataIndex: "id",
      //   key: "id",
      //   align: "left",
      // },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        align: "left",
        render: (image:any)=> (
         <div className="w-20"> 
              <img src={image?.thumbnail} className="border object-contain rounded  "/>
         </div>
        )
       },

      {
        title: "Brand Name",
        dataIndex: "name",
        key: "name",
        align: "left",
      },

      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        align: "left",
        render : (type:any)=> (
          <div className="">{type?.name}</div>
        )
      },

      {
        title: ("Edit"),
        dataIndex: "id",
        key: "actions",
        align: "left",
        width: 80,
        render: (id: string, record: { id: any; }) => (
          <ActionButtons
            id={record?.id}
            editUrl={`${router.asPath}/${id}/edit`}
            deleteModalView="DELETE_PRODUCT"
          />
        ),
      },
      
      // Include other properties of the brand as per your requirement
    ];
  
    // if (isError) {
    //   return <p>Error loading brands</p>;
    // }
  
    // if (isFetching) {
    //   return <p>Loading brands...</p>;
    // }
  
    return (
      <div className="rounded overflow-hidden shadow mb-6">
     
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {("Retailer Brands")}
          </h1>
        </div>

        <div className="flex items-center w-full md:w-3/4 xl:w-2/4 ms-auto">
          <SortForm
            showLabel={false}
            className="w-full"
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

          <LinkButton
            href={`/${shop}/add-retailer-brand/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span className="hidden md:block">
              + {("Add Brand")}
            </span>
            <span className="md:hidden">+ {("Add")}</span>
          </LinkButton>
        </div>
      </Card>       
      <div className="bg-white">  
        <Table
          columns={columns}
          emptyText={"No Brands Available"}
          data={allBrands}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
      </div>
    );
  };
  
   


 export default FmcgBrands;

  
  FmcgBrands.authenticate = {
    permissions: adminOwnerAndStaffOnly,
  };
  
  FmcgBrands.Layout = ShopLayout;
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
  