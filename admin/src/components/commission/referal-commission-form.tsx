import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useFormState, Control, FieldErrors,useWatch,Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@components/common/card";
import { ReferalValidationSchema } from "./referal-commsion-validation-schema";
import { useCommsionReferalMutation } from "@data/shop/use-referal-commission-update.mutation";
import { useEffect } from "react";

type FormValues = {
  customer_commission: string;
  level1_commission: string;
  level2_commission: string;
  level3_commission: string;
};

const ReferalCommissionForm = ({ initialValues }: { initialValues?: any }) => {

  const { mutate: updateReferalCommission, isLoading: updating } = useCommsionReferalMutation();
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues
      ? {
          defaultValues: {
            ...initialValues
          },
        }
      : {}),
    resolver: yupResolver(ReferalValidationSchema),
  });
  useEffect(()=>{
    // console.log(initialValues,"initialValues")
  },[initialValues])
  function onSubmit(values: FormValues) {
    
    updateReferalCommission({
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
        <div className="flex flex-wrap pb-8 border-b border-dashed my-5 sm:my-8">
          <Card className="w-full">
            
            <Input
              label={("Customer Commission")}
              {...register("customer_commission")}
              variant="outline"
              className="mb-5"
              placeholder="Enter Percentage"
              error={t(errors.customer_commission?.message!)}
            />
            <Input
              label={("Level 1 Commission")}
              {...register("level1_commission")}
              variant="outline"
              className="mb-5"
              placeholder="Enter Percentage"
              error={t(errors.level1_commission?.message!)}
            />
            <Input
              label={("Level 2 Commission")}
              {...register("level2_commission")}
              variant="outline"
              placeholder="Enter Percentage"
              className="mb-5"
              error={t(errors.level2_commission?.message!)}
            />
            <Input
              label={("Level 3 Commission")}
              {...register("level3_commission")}
              variant="outline"
              className="mb-5"
              placeholder="Enter Percentage"
              error={t(errors.level3_commission?.message!)}
            />
          </Card>
        </div>
        <div className="mb-5 text-end">
          <Button
            loading={updating}
            disabled={updating}
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

export default ReferalCommissionForm;
