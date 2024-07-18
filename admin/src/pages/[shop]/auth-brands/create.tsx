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
import { useRetailerBrandsQuery } from "@data/retailer-brands/use-retailer-brands-query";
import { useCreateTypeMutation } from "@data/type/use-type-create.mutation";
import { useParentCategoriesQuery } from "@data/category/use-parent-categories.query";
import { SortOrder } from "@ts-types/generated";

const brands = [
    { id: 1, name: 'ITC' },
    { id: 2, name: 'HUL' },
    { id: 3, name: 'Nestle' },
    { id: 4, name: 'Dabur' },
    { id: 5, name: 'Britannia' },
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
    const [orderBy, setOrder] = useState("created_at");
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

    // const { data: allBrands, isError, isFetching } = useRetailerBrandsQuery();

    const {
      data:categories,
      // isLoading: loading,
      // error,
    } = useParentCategoriesQuery({
      limit: 20,
      page,
       text: searchTerm,
      orderBy,
      sortedBy,
    });

     

    const { data, isLoading: loading, error } = useUsersQuery({
      limit: 50,
      page,
      text: searchTerm,
    });

    console.log('all brands',categories?.categories?.data);
    const filteredBrands = categories?.categories?.data?.filter((brand)=>brand?.parent==null)

    const mutation = useAuthBrandCreateMutation();

    useEffect(() => {
        if (data) {
          setLoadedOptions(
            data?.users?.data?.map((user) => ({
              label: `${user.name} - ${user.phone_number}`,
              value: user.id,
            }))
          );
        }
      }, [data]);

    const loadUsers = (inputValue, callback) => {
      setSearchTerm(inputValue);
      callback(loadedOptions);
    };


    const onSubmit = (data) => {
      mutation.mutate({
        user_id: selectedUser.value,
        user_name: selectedUser.label.split('-')[0].trim(),
        brands: selectedBrands.map(brand => brand.name)
      });
    };

    
    return (

      <div className="flex flex-col space-y-2">
        
        <Card className="">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading whitespace-nowrap">
              Add Authorized brands
            </h1>
          </div>
        </Card>

        <form
          className="grid grid-cols-2 p-4 place-content-center bg-white gap-4 items-center justify-between  spacce-x-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-1">
            <Label>Retailer Name</Label>
            <AsyncSelect cacheOptions defaultOptions loadOptions={loadUsers} onChange={setSelectedUser} />
          </div>

          <div className="col-span-1">
            <Label>Select brand</Label>
            <Multiselect displayValue="name" options={filteredBrands} onSelect={setSelectedBrands} />
          </div>

          <div className="col-span-2"> 
            <Button className="" type="submit" color="primary">
              Add
            </Button>
          </div>
        </form>
        
      </div>
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
  