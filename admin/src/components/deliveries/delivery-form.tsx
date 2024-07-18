import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import SelectInput from "@components/ui/select-input";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { withdrawValidationSchema } from "./withdraw-validation-schema";
import { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import { animateScroll } from "react-scroll";
import { Withdraw } from "@ts-types/generated";
import { useCreateDeliveryMutation } from "@data/shop-delivery/use-delivery-create.mutation";
import GooglePlacesAutocomplete from "@components/form/form-google-places-autocomplete";
import GetCurrentLocation from "@components/geoCode/from-current-location"

type FormValues = {
  sender_name: string;
  reciever_name: string;
  pickup_location: string;
  drop_location: string;
  sender_complete_address: string;
  reciever_complete_address: string;
  sender_phone_number: string;
  reciever_phone_number: string;
  package_type: string;
  package_name: string;
  package_weight: string;
  package_qty: string;
  total_weight: string;
  amount: number;
  payment_method: string;
  distance: number;
};

type IProps = {
  initialValues?: Withdraw | null;
};
export default function CreateOrUpdateDeliveryForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string | null>(null);
  const [dropLocation, setdropLocation] = useState<string | null>(null);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(withdrawValidationSchema),
  });
  const options=[
    {name:"Food"},
    {name:"Medicine"},
    {name:"Groceries"},
    {name:"Documents"},
    {name:"Electronics"},
    {name:"Cloths"},
    {name:"Others"}
  ]
  
  const { mutate: createWithdraw, isLoading: creating } =
    useCreateDeliveryMutation();

  function changePickupLocation(data:any){
      var location=JSON.stringify(data);
      // console.log(data);
      document.getElementById("pickup_location_id").value=data;
      setPickupLocation(data)
  }
  function changedropLocation(data:any){
    document.getElementById("drop_location_id").value=data;
    setdropLocation(data)
  }
  
  const onSubmit = (values: FormValues) => {
    values.package_type=(values.package_type)?values.package_type.name:"";
    values.pickup_location=pickupLocation
    values.drop_location=dropLocation
    const inputs=values;
    createWithdraw(
      {
          inputs,
        
      },
      {
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
          animateScroll.scrollToTop();
        },
      }
    );
  };
  useEffect(()=>{
    // console.log(errors,'errors')
  },[errors])
  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={("Sender Data")}
            details={`${
             ("Add")
            } ${("Enter Sender data from here")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-full md:w-2/3">
            <Input
              label={("Sender Name")}
              {...register("sender_name")}
              required
              error={t(errors.sender_name?.message!)}
              variant="outline"
              className="mb-5"
            />
            <div className="mb-5">
              <label
              className="block text-body-dark font-semibold text-sm leading-none mb-3"
            >
              Pickup Location
            </label>
              <GooglePlacesAutocomplete  onChange = {changePickupLocation} address={pickupLocation} /> 
              {/* <GetCurrentLocation onChange = {changePickupLocation} />   */}
              <input type="hidden" {...register("pickup_location")} id="pickup_location_id" required/>
              <p className="my-2 text-xs text-red-500">
                {(errors)?errors.pickup_location?.message:''}
              </p>
              
            </div>

            <Input
              label={("Sender Complete Address")}
              {...register("sender_complete_address")}
              required
              error={t(errors.sender_complete_address?.message!)}
              variant="outline"
              className="mb-5"
            />

             <Input
              label={("Sender Phone Number")}
              {...register("sender_phone_number")}
              required
              error={t(errors.sender_phone_number?.message!)}
              variant="outline"
              className="mb-5"
            />

          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={("Reciever Data")}
            details={`${
              ("Add")
            } ${("Enter reciever data from here")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-full md:w-2/3">
            <Input
              label={("Reciever Name")}
              {...register("reciever_name")}
              required
              error={t(errors.reciever_name?.message!)}
              variant="outline"
              className="mb-5"
            />
            <div className="mb-5">
              <label
              className="block text-body-dark font-semibold text-sm leading-none mb-3"
            >
              Drop Location
            </label>
              <GooglePlacesAutocomplete  onChange = {changedropLocation} address={dropLocation} /> 
              {/* <GetCurrentLocation onChange = {changedropLocation} />   */}
              <input type="hidden" {...register("drop_location")} id="drop_location_id" required/>
              <p className="my-2 text-xs text-red-500">
                {(errors)?errors.drop_location?.message:''}
              </p>
            </div>

            <Input
              label={("Reciever Complete Address")}
              {...register("reciever_complete_address")}
              required
              error={t(errors.reciever_complete_address?.message!)}
              variant="outline"
              className="mb-5"
            />

             <Input
              label={("Reciever Phone Number")}
              {...register("reciever_phone_number")}
              required
              error={t(errors.reciever_phone_number?.message!)}
              variant="outline"
              className="mb-5"
            />

          </Card>
        </div>

        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={("Package Data")}
            details={`${
                ("Add")
            } ${("Enter reciever data from here")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-full md:w-2/3">
            <Input
              label={("Package Name")}
              {...register("package_name")}
              required
              error={t(errors.package_name?.message!)}
              variant="outline"
              className="mb-5"
            />
            <div className="mb-5">
              <label
                className="block text-body-dark font-semibold text-sm leading-none mb-3"
              >
                Package Type
              </label>
              <SelectInput
                name="package_type"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.name}
                options={options}
                isClearable={true}
              />
            </div>
            <Input
              label={("Package Weight")}
              {...register("package_weight")}
              required
              error={t(errors.package_weight?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={("Package qty")}
              {...register("package_qty")}
              required
              error={t(errors.package_qty?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={("Total Weight")}
              {...register("total_weight")}
              required
              error={t(errors.total_weight?.message!)}
              variant="outline"
              className="mb-5"
            />
            

          </Card>
        </div>

        <div className="mb-4 text-end">

          <Button loading={creating}>
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
