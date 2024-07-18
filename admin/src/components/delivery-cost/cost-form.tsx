

import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { deliveryCostValidationSchema } from "./delivery-cost-validation-schema";
import { useCreateDeliveryCostMutation } from "@data/delivery/use-delivery-cost-create.mutation";


type FormValues = {
  cost_upto_5km: string;
  cost_per_km: string;
};

const CostForm = ({ initialValues }: { initialValues?: any }) => {

  const { mutate: createDeliveryCost, isLoading: creating } = useCreateDeliveryCostMutation();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues
      ? {
          defaultValues: {
            ...initialValues,
          },
        }
      : {}),
    resolver: yupResolver(deliveryCostValidationSchema),
  });


  function onSubmit(values: FormValues) {
    
    createDeliveryCost({
      variables: {
        input: {
          ...values,
        },
      },
    });
    
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
            title={("Delivery Cost")}
            details={t("Add your physical delivery cost from here")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={("Cost for upto 5km")}
              {...register("cost_upto_5km")}
              variant="outline"
              className="mb-5"
              error={t(errors.cost_upto_5km?.message!)}
            />
            <Input
              label={("Cost per km")}
              {...register("cost_per_km")}
              variant="outline"
              className="mb-5"
              error={t(errors.cost_per_km?.message!)}
            />
          </Card>
        </div>
        <div className="mb-5 text-end">
          <Button
            loading={creating}
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

export default CostForm;
