import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliveryConfigSchema } from "./delivery-config-validation-schema";
import { useState } from "react";
import Alert from "@components/ui/alert";
import { animateScroll } from "react-scroll";
import { Withdraw } from "@ts-types/generated";
import { useDeliveryConfigMutation } from "@data/shop-delivery/use-delivery-config.mutation";

type FormValues = {
  free_delivery_order_value: string;
  delivery_charges: string;
  id: number;
};

type IProps = {
  initialValues?: Withdraw | null;
};
export default function DeliveryConfigForm({ initialValues }: IProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(deliveryConfigSchema),
    shouldUnregister: true,
    defaultValues:  {
      free_delivery_order_value:initialValues.free_delivery_order_value,
      delivery_charges:initialValues.delivery_charges,
      id:initialValues.id
    }
  });
  
  const { mutate: deliveryConfig, isLoading: creating } =
    useDeliveryConfigMutation();

  const onSubmit = (values: FormValues) => {
    const inputs=values;
    deliveryConfig(
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
            title={("Delivery Config Data")}
            details={`${
             ("Add")
            } ${("Enter Config data here")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-full md:w-2/3">
            
            <input type="hidden" {...register('id')} />
            <Input
              label={("Free Delivery Order Value")}
              {...register("free_delivery_order_value")}
              required
              error={t(errors.free_delivery_order_value?.message!)}
              variant="outline"
              className="mb-5"
            />

            <Input
              label={("Delivery Charges")}
              {...register("delivery_charges")}
              required
              error={t(errors.delivery_charges?.message!)}
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
