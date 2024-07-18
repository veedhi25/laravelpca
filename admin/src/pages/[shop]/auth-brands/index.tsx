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
import { useAuthBrandQuery } from "@data/auth_brands/use-auth-brand.query";
import { useIsRTL } from "@utils/locals";
import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useRouter } from "next/router";
import SortForm from "@components/common/sort-form";
import { SortOrder } from "@ts-types/generated";
import LinkButton from "@components/ui/link-button";

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

 


const BrandAuthorization = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      control,
    } = useForm();

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadedOptions, setLoadedOptions] = useState([]);
    const [page, setPage] = useState(1);
    const { alignLeft } = useIsRTL();
     const router = useRouter();
     const {
      query: { shop },
    } = useRouter();
    const [orderBy, setOrder] = useState("updated_at");
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

    // const { data, isLoading: loading, error } = useUsersQuery({
    //   limit: 50,
    //   page,
    //   text: searchTerm,
    // });

    const {data:allbrands, isError, isFetching} = useAuthBrandQuery();

    console.log('brands',allbrands);

    // const { data, paginatorInfo } = brands!;


    const loadUsers = (inputValue, callback) => {
      setSearchTerm(inputValue);
      callback(loadedOptions);
    };

   

    const columns = [

        {
            title: ("User Id"),
            dataIndex: "id",
            key: "id",
            align: alignLeft,
          },
      
        {
          title: ("Retailer"),
          dataIndex: "user_name",
          key: "user_name",
          align: alignLeft,
        },
        // {
        //   title: ("Phone Number"),
        //   dataIndex: "phone_number",
        //   key: "phone_number",
        //   align: alignLeft,
        // },
        {
          title: 'Authorised Brands',
          dataIndex: 'brands',
          key: 'brands',
          align: alignLeft,
          render: (brands: any) => (
            <div className="whitespace-normal truncate">
                 {brands?.map((brand: any) => (
           <p className="whitespace-nowrap">{ brand }</p>
          ))}
            </div>
          ),
        },

        {
            title: ("Edit"),
            dataIndex: "user_id",
            key: "actions",
            align: "center",
            width: 80,
            render: (id: string, record: { id: any; }) => (
              <ActionButtons
                id={record?.id}
                editUrl={`${router.asPath}/${id}/edit`}
                deleteModalView="DELETE_PRODUCT"
              />
            ),
        },
      ]

      return (
        <>

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
            href={`/${shop}/auth-brands/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span className="hidden md:block">
              + {("Assign Brands")}
            </span>
            <span className="md:hidden">+ {("Add")}</span>
          </LinkButton>
        </div>
      </Card>       
          <div className="rounded overflow-hidden shadow mb-6">
            {/* @ts-ignore */}
            <Table
              columns={columns}
              emptyText={("table:empty-table-data")}
              data={allbrands}
              rowKey="id"
              scroll={{ x: 800 }}
            />
          </div>
    
          {/* {!!paginatorInfo.total && (
            <div className="flex justify-end items-center">
              <Pagination
                total={paginatorInfo.total}
                current={paginatorInfo.currentPage}
                pageSize={paginatorInfo.perPage}
                onChange={onPagination}
              />
            </div>
          )} */}
        </>
      );
};

  
  

export default BrandAuthorization;

  
  BrandAuthorization.authenticate = {
    permissions: adminOwnerAndStaffOnly,
  };
  
  BrandAuthorization.Layout = ShopLayout;
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
  