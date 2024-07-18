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
import { useCreateTypeMutation } from "@data/type/use-type-create.mutation";
import { useCreateCategoryMutation } from "@data/category/use-category-create.mutation";
import { SelectTypes } from "@components/category/category-form";


type FormValues = {
    name?: string | null;
    image: any;
  };
  
  type IProps = {
    initialValues?: FormValues | null;
  };
  
  export default function CreateOrUpdateRetailerBrandForm({ initialValues }: IProps) {
    const router = useRouter();
    const {
        query: { shop },
      } = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit,control, formState: { errors } } = useForm<FormValues>({
        // defaultValues: initialValues ? initialValues : { name: "" },
      });
      const { mutate: createType, isLoading: creating_type } = useCreateTypeMutation();

      
  
    const { mutate: createRetailerBrand, isLoading: creatingg } = useCreateRetailerBrandMutation();
    const { mutate: createCategory, isLoading: creating } =
    useCreateCategoryMutation();

    const onSubmit = (values: FormValues) => {
      const input = {
        name: values.name,
        // details: null,
        image: {
          thumbnail: values?.image?.thumbnail,
          original: values?.image?.original,
          id: values?.image?.id,
        },
        // icon:  "",
        // parent: '',
        type_id: values?.type?.id,
      };
      createCategory(
        {
          variables: {
            input,
          },
        },
        {
          onSuccess: () => {
            router.push(`/${shop}/add-retailer-brand`);
          },
          onError: (error: any) => {
            console.log(error?.response?.data?.message);
            // assuming you have a function animateScroll.scrollToTop();
            animateScroll.scrollToTop();
          },
        }
      );
      createRetailerBrand(
        {
          name: values?.name,
          image: {
            thumbnail: values?.image?.thumbnail,
            original: values?.image?.original,
            id: values?.image?.id,
          },
        },
        {
          onSuccess: () => {
            router.push(`/${shop}/add-retailer-brand`);
          },
          onError: (error: any) => {
            console.log(error?.response?.data?.message);
            // assuming you have a function animateScroll.scrollToTop();
            animateScroll.scrollToTop();
          },
        }
      )

      // createType({
      //   variables: {
      //     input: { name: values.name!, icon: '' ?? "" },
      //   },
        
      // },
      // {
      //   onSuccess: () => {
      //     router.push(`/${shop}/add-retailer-brand`);
      //   },
      //   onError: (error: any) => {
      //     setErrorMessage(error?.response?.data?.message);
      //     // assuming you have a function animateScroll.scrollToTop();
      //     animateScroll.scrollToTop();
      //   },
      // }
      // );
    };
  
  return (
    <>

      {
        errorMessage ? (
          <Alert
            message={(`common:${errorMessage}`)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null 
      }

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col pb-8 border-b border-dashed border-border-base my-5 sm:my-8">

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            
            <Description
              title='Brand Image'
              details={'coverImageInformation'}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="image" control={control} multiple={false} />
            </Card>

          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={("Brand Name")}
              // details={`${
              //   initialValues
              //     ? ("Update")
              //     : ("Add")
              // } ${("form:form-description-attribute-name")}`}
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
                 <SelectTypes control={control} errors={errors} />
            </Card>
          </div>

        </div>

        <div className ="mb-4 text-end">
          
          {
            initialValues && (
            <Button
              variant = "outline"
              onClick = {router.back}
              className = "mr-4"
              type = "button"
            >
              {("form:button-label-back")}
            </Button>
            )
          }

          <Button loading = {creating}>
              { initialValues
              ? ("Update")
              : ("Add")}{" "}
              {("Brand")}
          </Button>

        </div>

      </form>
    </>
  );
}
