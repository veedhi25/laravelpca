import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useCreateUserMutation } from "@data/signup-offer/use-create.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerValidationSchema } from "./validation-schema";
import { useEffect } from "react";
import { SignupReward } from "@ts-types/generated";

type FormValues = {
  invitee_reward: string;
  inviter_reward: string;
};

const defaultValues = {
    invitee_reward: "",
    inviter_reward: "",
};
type IProps = {
  initialValues?: SignupReward | null;
};
export default function Form({initialValues}:IProps){
  const { t } = useTranslation();
  const { mutate: registerSignupOffer, isLoading: loading } = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: initialValues?initialValues:defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });
  useEffect(()=>{
    if(initialValues){
      document.getElementById('invitee_reward').value=initialValues?.invitee_reward
      document.getElementById('inviter_reward').value=initialValues?.inviter_reward
    }
  },[initialValues])
  async function onSubmit({ invitee_reward, inviter_reward}: FormValues) {
    registerSignupOffer(
      {
        variables: {
            invitee_reward,
            inviter_reward,
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={("Add your Signup Offer information here")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={("Invitee Reward")}
            {...register("invitee_reward")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.invitee_reward?.message!)}
          />

          <Input
            label={("Inviter Reward")}
            {...register("inviter_reward")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.inviter_reward?.message!)}
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {("Create")}
        </Button>
      </div>
    </form>
  );
};


