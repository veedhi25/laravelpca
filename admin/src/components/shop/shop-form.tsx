

import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useFormState, Control, FieldErrors,useWatch,Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import FileInput from "@components/ui/file-input";
import LicenseFileInput from "@components/ui/license-file-input";

import TextArea from "@components/ui/text-area";
import { shopValidationSchema } from "./shop-validation-schema";
import { getFormattedImage } from "@utils/get-formatted-image";
import { useCreateShopMutation } from "@data/shop/use-shop-create.mutation";
import { useUpdateShopMutation } from "@data/shop/use-shop-update.mutation";

import {
  BalanceInput,
  ShopSettings,
  ShopSocialInput,
  UserAddressInput,
} from "@ts-types/generated";


import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import Label from "@components/ui/label";
import { getIcon } from "@utils/get-icon";
import SelectInput from "@components/ui/select-input";
import * as socialIcons from "@components/icons/social";
import omit from "lodash/omit";
import { useShopCategoryQuery } from "@data/shop-categories/use-categories.query";
import ValidationError from "@components/ui/form-validation-error";
import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState } from "react";
import * as geoLocation from '@components/form/google-places-autocomplete'


const socialIcon = [
  {
    value: "FacebookIcon",
    label: "Facebook",
  },
  {
    value: "InstagramIcon",
    label: "Instagram",
  },
  {
    value: "TwitterIcon",
    label: "Twitter",
  },
  {
    value: "YouTubeIcon",
    label: "Youtube",
  },
];


export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex space-s-4 items-center text-body">
      <span className="flex w-4 h-4 items-center justify-center">
        {getIcon({
          iconList: socialIcons,
          iconName: item.value,
          className: "w-4 h-4",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});


type FormValues = {
  name: string;
  description: string;
  cover_image: any;
  gst_certificate: any;
  cancelled_cheque: any;
  // pan_card_image: any;
  // tan_certificate_image: any;
  fssai_certificate: any;
  gst_number : any;
  pan_number: any;
  tan_number: any;
  fssai_number: number;

  logo: any;
  balance: BalanceInput;
  address: UserAddressInput;
  settings: ShopSettings;
};

const ShopForm = ({ initialValues }: { initialValues?: any }) => {

  const { mutate: createShop, isLoading: creating } = useCreateShopMutation();
  const { mutate: updateShop, isLoading: updating } = useUpdateShopMutation();
  const [options,selectOption] = useState([])
  const { t } = useTranslation();
  const { data, isLoading } = useShopCategoryQuery();
  
  
  useEffect(()=>{
    // console.log(initialValues,"initialValues");
    if(initialValues){
      if(initialValues.shop_categories){
        selectOption(JSON.parse(initialValues.shop_categories))
      }
    }
    // // console.log(initialValues);
  },[])

  

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues
      ? {
          defaultValues: {
            ...initialValues,
            logo: getFormattedImage(initialValues.logo),
            cover_image: getFormattedImage(initialValues.cover_image),
            fssai_certificate:getFormattedImage(JSON.parse(initialValues.fssai_certificate)),
            gst_certificate:getFormattedImage(JSON.parse(initialValues.gst_certificate)),
            cancelled_cheque:getFormattedImage(JSON.parse(initialValues.cancelled_cheque)),
            settings: {
              ...initialValues?.settings,
              socials: initialValues?.settings?.socials
                ? initialValues?.settings?.socials.map((social: any) => ({
                    icon: updatedIcons?.find(
                      (icon) => icon?.value === social?.icon
                    ),
                    url: social?.url,
                  }))
                : [],
            },
          },
        }
      : {}),
    resolver: yupResolver(shopValidationSchema),
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "settings.socials",
  });

  function onSelect(selectedList:any, selectedItem:any) {
    // console.log(selectedList);
    selectOption(selectedList);
  }

  function onRemove(selectedList:any, removedItem:any) {
    // console.log(selectedList);
    selectOption(selectedList);
  }

  function onSubmit(values: FormValues) {
    const settings = {
      ...values?.settings,
      location: { ...omit(values?.settings?.location, "__typename") },
      socials: values?.settings?.socials
        ? values?.settings?.socials?.map((social: any) => ({
            icon: social?.icon?.value,
            url: social?.url,
          }))
        : [],
    };
    
    if (initialValues) {
      console.log(initialValues)
      const { ...restAddress } = values.address;
      updateShop({
        variables: {
          id: initialValues.id,
          input: {
            ...values,
            address: restAddress,
            shop_categories:options,
            settings,
            balance: {
              id: initialValues.balance?.id,
              ...values.balance,
            },
          },
        },
      });
    } else {
      createShop({
        variables: {
          input: {
            ...values,
            shop_categories:options,
            settings,
            balance: {
              ...values.balance,
            },
          },
        },
      });
    }
  }
  // console.log('geoLocation',getValues("settings.location.sector"))

  const coverImageInformation = (
    <span>
      {t("form:shop-cover-image-help-text")} <br />
      {t("form:cover-image-dimension-help-text")} &nbsp;
      <span className="font-bold">1170 x 435{t("common:text-px")}</span>
    </span>
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:input-label-logo")}
            details={t("form:shop-logo-help-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="logo" control={control} multiple={false} />
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:shop-cover-image-title")}
            details={coverImageInformation}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="cover_image" control={control} multiple={false} />
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:shop-basic-info")}
            details={t("form:shop-basic-info-help-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-name")}
              {...register("name")}
              variant="outline"
              className="mb-5"
              error={t(errors.name?.message!)}
            />
            <TextArea
              label={t("form:input-label-description")}
              {...register("description")}
              variant="outline"
              error={t(errors.description?.message!)}
            />
            
            {/* <SelectShopCategory control={control} errors={errors} />*/}
            <div className="mb-5">
              <Label>Select Shop Category</Label>
              <Multiselect
                displayValue="name"
                options={data} 
                selectedValues={options}
                // selectedValues={selectedValue} 
                onSelect={onSelect} 
                onRemove={onRemove} 
              />
            </div>
          </Card>
        </div>



          {/* Document and Lincenses form */}

        <div className="  flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("form:Documents and Licenses**")}
            // details={t("form:shop-basic-info-help-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:GST Number")}
              {...register("gst_number")}
              variant="outline"
              className="  mb-5"
              error={t(errors.gst_number?.message!)}
            />

            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("form:GST Certificate")}
                details='Upload your clear GST Certificate '
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />

              <Card className="w-full sm:w-8/12 md:w-2/3">
                <LicenseFileInput name="gst_certificate" control={control} multiple={false} />
              </Card>
            </div>
        
            <Input
              label={t("form:FSSAI Number")}
              {...register("fssai_number")}
              variant="outline"
              className=" mb-5"
              error={t(errors.fssai_number?.message!)}
            /> 

            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("form:FSSAI Certificate")}
                details='Upload your clear FSSAI Certificate '
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />

              <Card className="w-full sm:w-8/12 md:w-2/3">
                <LicenseFileInput name="fssai_certificate" control={control} multiple={false} />
              </Card>
            </div>

            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("form:Cancelled Cheque ")}
                details='Upload your cancelled Cheque Copy '
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />

              <Card className="w-full  sm:w-8/12 md:w-2/3">
                <LicenseFileInput name="cancelled_cheque" control={control} multiple={false} />
              </Card>
            </div>

            <Input
              label={t("form:TAN Number")}
              {...register("tan_number")}
              variant="outline"
              className=" mb-5"
              error={t(errors.tan_number?.message!)}
            /> 

            {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("form:TAN Certificate ")}
                details='Upload your cancelled Cheque Copy '
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />

              <Card className="w-full  sm:w-8/12 md:w-2/3">
                <FileInput name="tan_certificate_image" control={control} multiple={false} />
              </Card>
            </div> */}



            <Input
              label={t("form:PAN Number")}
              {...register("pan_number")}
              variant="outline"
              className=" mb-5"
              error={t(errors.pan_number?.message!)}
            /> 

            {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("form:PAN Card ")}
                details='Upload your PAN Card'
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />

              <Card className="w-full  sm:w-8/12 md:w-2/3">
                <FileInput name="pan_card_image" control={control} multiple={false} />
              </Card>
            </div> */}
          
          
          </Card>
        </div>


        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
            title={t("form:shop-payment-info")}
            details={t("form:payment-info-helper-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-account-holder-name")}
              {...register("balance.payment_info.name")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.name?.message!)}
            />
            <Input
              label={t("form:input-label-account-holder-email")}
              {...register("balance.payment_info.email")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.email?.message!)}
            />
            <Input
              label={t("form:input-label-bank-name")}
              {...register("balance.payment_info.bank")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.bank?.message!)}
            />
            <Input
              label={t("form:IFSC Code")}
              {...register("balance.payment_info.ifsc")}
              variant="outline"
              className="mb-5"
              error={t(errors.balance?.payment_info?.ifsc?.message!)}
            />
            <Input
              label={t("form:input-label-account-number")}
              {...register("balance.payment_info.account")}
              variant="outline"
              error={t(errors.balance?.payment_info?.account?.message!)}
            />
          </Card>
        </div>
         
        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          
          <Description
            title={t("form:shop-settings")}
            details={t("form:shop-settings-helper-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="mb-5">
              <Label>{t("form:input-label-autocomplete")}</Label>
              <Controller
                control={control}
                name="settings.location"
                render={({ field: { onChange } }) => (
                  <GooglePlacesAutocomplete
                    onChange={onChange }
                    data={getValues("settings.location")!}
                  />
                )}
              />
            </div>
            <Input
              label={t("form:input-label-contact")}
              {...register("settings.contact")}
              variant="outline"
              className="mb-5"
              error={t(errors.settings?.contact?.message!)}
            />
            <Input
              label={t("form:input-label-website")}
              {...register("settings.website")}
              variant="outline"
              className="mb-5"
              error={t(errors.settings?.website?.message!)}
            />
            <div>
              {fields.map(
                (item: ShopSocialInput & { id: string }, index: number) => (
                  <div
                    className="border-b border-dashed border-border-200 first:border-t last:border-b-0 first:mt-5 md:first:mt-10 py-5 md:py-8"
                    key={item.id}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                      <div className="sm:col-span-2">
                        <Label>{t("form:input-label-select-platform")}</Label>
                        <SelectInput
                          name={`settings.socials.${index}.icon` as const}
                          control={control}
                          options={updatedIcons}
                          isClearable={true}
                          defaultValue={item?.icon!}
                        />
                      </div>
                      {/* <Input
                        className="sm:col-span-2"
                        label={t("form:input-label-icon")}
                        variant="outline"
                        {...register(`settings.socials.${index}.icon` as const)}
                        defaultValue={item?.icon!} // make sure to set up defaultValue
                      /> */}
                      <Input
                        className="sm:col-span-2"
                        label={t("Url")}
                        variant="outline"
                        {...register(`settings.socials.${index}.url` as const)}
                        defaultValue={item.url!} // make sure to set up defaultValue
                      />
                      <button
                        onClick={() => {
                          remove(index);
                        }}
                        type="button"
                        className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                      >
                        {t("form:button-label-remove")}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            <Button
              type="button"
              onClick={() => append({ icon: "", url: "" })}
              className="w-full sm:w-auto"
            >
              {t("form:button-label-add-social")}
            </Button>
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
           
            title={t("form:shop-address")}
            details={t("form:shop-address-helper-text")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              
               value={getValues("settings.location.country")}
              label={t("form:input-label-country")}
              {...register("address.country")}
              onChange={(e) => setValue("address.country", e.target.value)}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.country?.message!)}
            />
             <Input
              // defaultValue={getValues("settings.location.state")}
              value={getValues("settings.location.state")}
              label={t("form:input-label-state")}
              {...register("address.state")}
              onChange={(e) => setValue("address.state", e.target.value)}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.state?.message!)}
            />
            <Input
            //  defaultValue={getValues("settings.location.city")}
               value={getValues("settings.location.city")}
              label={t("form:input-label-city")}
              {...register("address.city")}
              onChange={(e) => setValue("address.city", e.target.value)}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.city?.message!)}
            />
             <Input
              // defaultValue={getValues("settings.location.sector")}
              value={getValues("settings.location.sector")  }
              
              label={t("Area / Sector / Locality")}
              {...register("address.sector")}
              onChange={(e) => setValue("address.sector", e.target.value)}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.sector?.message!)}
            />
            <Input
            //  defaultValue={getValues("settings.location.zip")}
              value={getValues("settings.location.zip")}
              label={t("form:input-label-zip")}
              {...register("address.zip")}
              variant="outline"
              className="mb-5"
              error={t(errors.address?.zip?.message!)}
            />
            <TextArea
            //  defaultValue={getValues("settings.location.formattedAddress")}
             value={getValues("settings.location.formattedAddress")}
              label={t("form:input-label-street-address")}
              {...register("address.street_address")}
              variant="outline"
              error={t(errors.address?.street_address?.message!)}
            />
          </Card>
        </div>

        <div className="mb-5 text-end">
          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            {initialValues
              ? t("form:button-label-update")
              : t("form:button-label-save")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ShopForm;

 

 // **important old code

// import Button from "@components/ui/button";
// import Input from "@components/ui/input";
// import { useFormState, Control, FieldErrors,useWatch,Controller, useFieldArray, useForm } from "react-hook-form";
// import { useTranslation } from "next-i18next";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Description from "@components/ui/description";
// import Card from "@components/common/card";
// import FileInput from "@components/ui/file-input";
// import LicenseFileInput from "@components/ui/license-file-input";

// import TextArea from "@components/ui/text-area";
// import { shopValidationSchema } from "./shop-validation-schema";
// import { getFormattedImage } from "@utils/get-formatted-image";
// import { useCreateShopMutation } from "@data/shop/use-shop-create.mutation";
// import { useUpdateShopMutation } from "@data/shop/use-shop-update.mutation";

// import {
//   AttachmentInput,
//   BalanceInput,
//   ShopSettings,
//   ShopSocialInput,
//   UserAddressInput,
// } from "@ts-types/generated";


// import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
// import Label from "@components/ui/label";
// import { getIcon } from "@utils/get-icon";
// import SelectInput from "@components/ui/select-input";
// import * as socialIcons from "@components/icons/social";
// import omit from "lodash/omit";
// import { useShopCategoryQuery } from "@data/shop-categories/use-categories.query";
// import ValidationError from "@components/ui/form-validation-error";
// import Multiselect from 'multiselect-react-dropdown';
// import { useEffect, useState } from "react";
// import * as geoLocation from '@components/form/google-places-autocomplete'


// const socialIcon = [
//   {
//     value: "FacebookIcon",
//     label: "Facebook",
//   },
//   {
//     value: "InstagramIcon",
//     label: "Instagram",
//   },
//   {
//     value: "TwitterIcon",
//     label: "Twitter",
//   },
//   {
//     value: "YouTubeIcon",
//     label: "Youtube",
//   },
// ];





// export const updatedIcons = socialIcon.map((item: any) => {
//   item.label = (
//     <div className="flex space-s-4 items-center text-body">
//       <span className="flex w-4 h-4 items-center justify-center">
//         {getIcon({
//           iconList: socialIcons,
//           iconName: item.value,
//           className: "w-4 h-4",
//         })}
//       </span>
//       <span>{item.label}</span>
//     </div>
//   );
//   return item;
// });


// type FormValues = {
//   name: string;
//   description: string;
//   cover_image: AttachmentInput;
//   gst_certificate: any;
//   cancelled_cheque: any;
//   // pan_card_image: any;
//   // tan_certificate_image: any;
//   fssai_certificate: any;
//   gst_number : any;
//   pan_number: any;
//   tan_number: any;
//   fssai_number: number;
//   is_empty: number;

//   logo: any;
//   balance: BalanceInput;
//   address: UserAddressInput;
//   settings: ShopSettings;

// };

// const defaultValues = {
//   cover_image: [],
// };

// const ShopForm = ({ initialValues }: { initialValues?: any }) => {

//   const { mutate: createShop, isLoading: creating } = useCreateShopMutation();
//   const { mutate: updateShop, isLoading: updating } = useUpdateShopMutation();
//   const [options,selectOption] = useState([])
//   const { t } = useTranslation();
//   const { data, isLoading } = useShopCategoryQuery();
  
  
//   useEffect(()=>{
//     // console.log(initialValues,"initialValues");
//     if(initialValues){
//       if(initialValues.shop_categories){
//         selectOption(JSON.parse(initialValues.shop_categories))
//       }
//     }
//     // // console.log(initialValues);
//   },[])


//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//     control,
//   } = useForm<FormValues>({
//     shouldUnregister: true,
//     ...(initialValues
//       ? {
//           defaultValues: {
//             ...initialValues,
//             logo: getFormattedImage(initialValues.logo),
//             // cover_image:[ initialValues.cover_image.map(({ thumbnail, original, id }: any) => ({
//             //   thumbnail,
//             //   original,
//             //   id,
//             // }))],
//             fssai_certificate:getFormattedImage(JSON.parse(initialValues.fssai_certificate)),
//             gst_certificate:getFormattedImage(JSON.parse(initialValues.gst_certificate)),
//             cancelled_cheque:getFormattedImage(JSON.parse(initialValues.cancelled_cheque)),
//             settings: {
//               ...initialValues?.settings,
//               socials: initialValues?.settings?.socials
//                 ? initialValues?.settings?.socials.map((social: any) => ({
//                     icon: updatedIcons?.find(
//                       (icon) => icon?.value === social?.icon
//                     ),
//                     url: social?.url,
//                   }))
//                 : [],
//             },
//           },
//         }
//       : {}),
//     resolver: yupResolver(shopValidationSchema),
//   });


//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "settings.socials",
//   });

//   function onSelect(selectedList:any, selectedItem:any) {
//     // console.log(selectedList);
//     selectOption(selectedList);
//   }

//   function onRemove(selectedList:any, removedItem:any) {
//     // console.log(selectedList);
//     selectOption(selectedList);
//   }

//   function onSubmit(values: FormValues) {
//     const settings = {
//       ...values?.settings,
//       cover_image: values?.cover_image?.map(({ thumbnail, original, id }: any) => ({
//         thumbnail,
//         original,
//         id,
//       })),
//       location: { ...omit(values?.settings?.location, "__typename") },
//       socials: values?.settings?.socials
//         ? values?.settings?.socials?.map((social: any) => ({
//             icon: social?.icon?.value,
//             url: social?.url,
//           }))
//         : [],
//     };
    
//     if (initialValues) {
//       const { ...restAddress } = values.address;
//       updateShop({
//         variables: {
//           id: initialValues.id,
//           input: {
//             ...values,
//             address: restAddress,
//             shop_categories: options,
//             settings,
//             balance: {
//               id: initialValues.balance?.id,
//               ...values.balance,
//             },
//           },
//         },
//       });
//     } else {
//       createShop({
//         variables: {
//           input: {
//             ...values,
//             shop_categories:options,
//             settings,
//             balance: {
//               ...values.balance,
//             },
//           },
//         },
//       });
//     }
//   }
//   // console.log('geoLocation',getValues("settings.location.sector"))

//   const coverImageInformation = (
//     <span>
//       {t("form:shop-cover-image-help-text")} <br />
//       {t("form:cover-image-dimension-help-text")} &nbsp;
//       <span className="font-bold">1170 x 435{t("common:text-px")}</span>
//     </span>
//   );

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//           <Description
//             title={t("form:input-label-logo")}
//             details={t("form:shop-logo-help-text")}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />

//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <FileInput name="logo" control={control} multiple={false} />
//           </Card>
//         </div>

//         <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//           <Description
//             title={t("form:shop-cover-image-title")}
//             details={coverImageInformation}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />

//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <FileInput name="cover_image" control={control}   />
//           </Card>
//         </div>

//         <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//           <Description
//             title={t("form:shop-basic-info")}
//             details={t("form:shop-basic-info-help-text")}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />
//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <Input
//               label={t("form:input-label-name")}
//               {...register("name")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.name?.message!)}
//             />
//             <TextArea
//               label={t("form:input-label-description")}
//               {...register("description")}
//               variant="outline"
//               error={t(errors.description?.message!)}
//             />
            
//             {/* <SelectShopCategory control={control} errors={errors} />*/}
//             <div className="mb-5">
//               <Label>Select Shop Category</Label>
//               <Multiselect
//                 displayValue="name"
//                 options={data} 
//                 selectedValues={options}
//                 // selectedValues={selectedValue} 
//                 onSelect={onSelect} 
//                 onRemove={onRemove} 
//               />
//             </div>
//           </Card>
//         </div>







//           {/* Document and Lincenses form */}

//         <div className="  flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//           <Description
//             title={t("form:Documents and Licenses**")}
//             // details={t("form:shop-basic-info-help-text")}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />
//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <Input
//               label={t("form:GST Number")}
//               {...register("gst_number")}
//               variant="outline"
//               className="  mb-5"
//               error={t(errors.gst_number?.message!)}
//             />

//             <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//             <Description
//               title={t("form:GST Certificate")}
//               details='Upload your clear GST Certificate '
//               className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//             />

//             <Card className="w-full sm:w-8/12 md:w-2/3">
//               <LicenseFileInput name="gst_certificate" control={control} multiple={false} />
//             </Card>
//           </div>

        
//             <Input
//               label={t("form:FSSAI Number")}
//               {...register("fssai_number")}
//               variant="outline"
//               className=" mb-5"
//               error={t(errors.fssai_number?.message!)}
//             /> 

//             <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//               <Description
//                 title={t("form:FSSAI Certificate")}
//                 details='Upload your clear FSSAI Certificate '
//                 className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//               />

//               <Card className="w-full  sm:w-8/12 md:w-2/3">
//                 <LicenseFileInput name="fssai_certificate" control={control} multiple={false} />
//               </Card>
//             </div>

//             <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//               <Description
//                 title={t("form:Cancelled Cheque ")}
//                 details='Upload your cancelled Cheque Copy '
//                 className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//               />

//               <Card className="w-full  sm:w-8/12 md:w-2/3">
//                 <LicenseFileInput name="cancelled_cheque" control={control} multiple={false} />
//               </Card>
//             </div>

//             <Input
//               label={t("form:TAN Number")}
//               {...register("tan_number")}
//               variant="outline"
//               className=" mb-5"
//               error={t(errors.tan_number?.message!)}
//             /> 

//             {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//               <Description
//                 title={t("form:TAN Certificate ")}
//                 details='Upload your cancelled Cheque Copy '
//                 className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//               />

//               <Card className="w-full  sm:w-8/12 md:w-2/3">
//                 <FileInput name="tan_certificate_image" control={control} multiple={false} />
//               </Card>
//             </div> */}



//             <Input
//               label={t("form:PAN Number")}
//               {...register("pan_number")}
//               variant="outline"
//               className=" mb-5"
//               error={t(errors.pan_number?.message!)}
//             /> 

//             {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
//               <Description
//                 title={t("form:PAN Card ")}
//                 details='Upload your PAN Card'
//                 className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//               />

//               <Card className="w-full  sm:w-8/12 md:w-2/3">
//                 <FileInput name="pan_card_image" control={control} multiple={false} />
//               </Card>
//             </div> */}
          
          
//           </Card>
//         </div>









//         <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
//           <Description
//             title={t("form:shop-payment-info")}
//             details={t("form:payment-info-helper-text")}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />

//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <Input
//               label={t("form:input-label-account-holder-name")}
//               {...register("balance.payment_info.name")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.balance?.payment_info?.name?.message!)}
//             />
//             <Input
//               label={t("form:input-label-account-holder-email")}
//               {...register("balance.payment_info.email")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.balance?.payment_info?.email?.message!)}
//             />
//             <Input
//               label={t("form:input-label-bank-name")}
//               {...register("balance.payment_info.bank")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.balance?.payment_info?.bank?.message!)}
//             />
//             <Input
//               label={t("form:IFSC Code")}
//               {...register("balance.payment_info.ifsc")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.balance?.payment_info?.ifsc?.message!)}
//             />
//             <Input
//               label={t("form:input-label-account-number")}
//               {...register("balance.payment_info.account")}
//               variant="outline"
//               error={t(errors.balance?.payment_info?.account?.message!)}
//             />
//           </Card>
//         </div>
         
//         <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
//           <Description
//             title={t("form:shop-settings")}
//             details={t("form:shop-settings-helper-text")}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />

//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <div className="mb-5">
//               <Label>{t("form:input-label-autocomplete")}</Label>
//               <Controller
//                 control={control}
//                 name="settings.location"
//                 render={({ field: { onChange } }) => (
//                   <GooglePlacesAutocomplete
//                     onChange={onChange }
//                     data={getValues("settings.location")!}
//                   />
//                 )}
//               />
//             </div>
//             <Input
//               label={t("form:input-label-contact")}
//               {...register("settings.contact")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.settings?.contact?.message!)}
//             />
//             <Input
//               label={t("form:input-label-website")}
//               {...register("settings.website")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.settings?.website?.message!)}
//             />
//             <div>
//               {fields.map(
//                 (item: ShopSocialInput & { id: string }, index: number) => (
//                   <div
//                     className="border-b border-dashed border-border-200 first:border-t last:border-b-0 first:mt-5 md:first:mt-10 py-5 md:py-8"
//                     key={item.id}
//                   >
//                     <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
//                       <div className="sm:col-span-2">
//                         <Label>{t("form:input-label-select-platform")}</Label>
//                         <SelectInput
//                           name={`settings.socials.${index}.icon` as const}
//                           control={control}
//                           options={updatedIcons}
//                           isClearable={true}
//                           defaultValue={item?.icon!}
//                         />
//                       </div>
//                       {/* <Input
//                         className="sm:col-span-2"
//                         label={t("form:input-label-icon")}
//                         variant="outline"
//                         {...register(`settings.socials.${index}.icon` as const)}
//                         defaultValue={item?.icon!} // make sure to set up defaultValue
//                       /> */}
//                       <Input
//                         className="sm:col-span-2"
//                         label={t("Url")}
//                         variant="outline"
//                         {...register(`settings.socials.${index}.url` as const)}
//                         defaultValue={item.url!} // make sure to set up defaultValue
//                       />
//                       <button
//                         onClick={() => {
//                           remove(index);
//                         }}
//                         type="button"
//                         className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
//                       >
//                         {t("form:button-label-remove")}
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//             <Button
//               type="button"
//               onClick={() => append({ icon: "", url: "" })}
//               className="w-full sm:w-auto"
//             >
//               {t("form:button-label-add-social")}
//             </Button>
//           </Card>
//         </div>

//         <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
//           <Description
           
//             title={t("form:shop-address")}
//             details={t("form:shop-address-helper-text")}
//             className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//           />

//           <Card className="w-full sm:w-8/12 md:w-2/3">
//             <Input
//               // defaultValue={getValues("settings.location.country")}
//               value={getValues("settings.location.country")}
//               label={t("form:input-label-country")}
//               {...register("address.country")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.address?.country?.message!)}
//             />
//              <Input
//               // defaultValue={getValues("settings.location.state")}
//               value={getValues("settings.location.state")}
//               label={t("form:input-label-state")}
//               {...register("address.state")}
              
//               variant="outline"
//               className="mb-5"
//               error={t(errors.address?.state?.message!)}
//             />
//             <Input
//             //  defaultValue={getValues("settings.location.city")}
//                value={getValues("settings.location.city")}
//               label={t("form:input-label-city")}
//               {...register("address.city")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.address?.city?.message!)}
//             />
//              <Input
//               // defaultValue={getValues("settings.location.sector")}
//               value={   getValues("settings.location.sector")  }
//               label={t("Area / Sector / Locality")}
//               {...register("address.sector")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.address?.sector?.message!)}
//             />
//             <Input
//             //  defaultValue={getValues("settings.location.zip")}
//               value={getValues("settings.location.zip")}
//               label={t("form:input-label-zip")}
//               {...register("address.zip")}
//               variant="outline"
//               className="mb-5"
//               error={t(errors.address?.zip?.message!)}
//             />
//             <TextArea
//             //  defaultValue={getValues("settings.location.formattedAddress")}
//              value={getValues("settings.location.formattedAddress")}
//               label={t("form:input-label-street-address")}
//               {...register("address.street_address")}
//               variant="outline"
//               error={t(errors.address?.street_address?.message!)}
//             />
//           </Card>
//         </div>

//         <div className="mb-5 text-end">
//           <Button
//             loading={creating || updating}
//             disabled={creating || updating}
//           >
//             {initialValues
//               ? t("form:button-label-update")
//               : t("form:button-label-save")}
//           </Button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default ShopForm;
