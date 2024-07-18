import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Attribute } from "@ts-types/generated";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useCreateAttributeMutation } from "@data/attributes/use-attribute-create.mutation";
import { useUpdateAttributeMutation } from "@data/attributes/use-attribute-update.mutation";
import { useState } from "react";
import Alert from "@components/ui/alert";
import { animateScroll } from "react-scroll";
import { useCreateRetailerBrandMutation } from "@data/retailer-brands/use-create-retailer-brand.mutation";
import FileInput from "@components/ui/file-input";
import { getFormattedImage } from "@utils/get-formatted-image";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import ShopLayout from "@components/layouts/shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUpdateRetailerBrandMutation } from "@data/retailer-brands/use-update-retailer-brand-mutations";

type FormValues = {
    id?: string | null;
    name?: string | null;
    image: any;
};

type IProps = {
    initialValues?: FormValues | null;
};

export default function RetailerBrandEditForm({ initialValues }: IProps) {
    
  const router = useRouter();

    const {
        query: { shop },
    } = useRouter();

    const {
      query: { brand_id },
  } = useRouter();


    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let parsedImage = "";
    try {
      parsedImage = JSON.parse(initialValues?.image);
    } catch (error) {
      console.error('There was an error parsing the image JSON', error);
    }

    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
      setValue,
      setError,
      clearErrors,
      watch,
    } = useForm<FormValues>({
      defaultValues: initialValues ? { name: initialValues.name, image: parsedImage } : { name: "", image: "" },
    });

     
    const { mutate: updateRetailerBrand, isLoading: updating } = useUpdateRetailerBrandMutation(); // add this hook

    const onSubmit = (values: FormValues) => {
       
        const formattedValues = {
            name: values.name!,
            image:values.image,
        };

        console.log('values',formattedValues)

        if (values) {
            // we're updating an existing retailer brand
            updateRetailerBrand(
                //@ts-ignore
                {
                    id: brand_id,
                    data:formattedValues,
                },
                {
                    onSuccess: () => {
                     
                        router.push(`/${shop}/add-retailer-brand`);
                    },
                    onError: handleError,
                }
            );
        }
    };

    const handleError = (error: any) => {
        setErrorMessage(error?.response?.data?.message);
        animateScroll.scrollToTop();
    };

  
  return (
    <>

      {errorMessage ? (
        <Alert
          message={(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col pb-8 border-b border-dashed border-border-base my-5 sm:my-8">

        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title='Brand Image'
            // details={'coverImageInformation'}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="image" control={control} multiple={false} />
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={("Brand Name")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
 

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={("Name")}
              {...register("name", { required: "Name is required" })}
              error={(errors.name?.message!)}
              variant="outline"
              
              className="mb-5"
            />
          </Card>

        </div>
        </div>


        <div className="mb-4 text-end">
            <Button loading={updating}>
               Update
            </Button>

        </div>
      </form>
    </>
  );
}

 
  
  // RetailerBrandEditForm.authenticate = {
  //   permissions: adminOwnerAndStaffOnly,
  // };
  
  // RetailerBrandEditForm.Layout = ShopLayout;
  
  // export const getServerSideProps = async ({ locale }: any) => ({
  //   props: {
  //     ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  //   },
  // });
  
