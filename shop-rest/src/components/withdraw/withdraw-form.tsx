import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { withdrawValidationSchema } from "./withdraw-validation-schema";
import { useState } from "react";
import Alert from "@components/ui/alert";
import { animateScroll } from "react-scroll";
import { Withdraw } from "@ts-types/generated";
import { useCreateWithdrawMutation } from "@data/withdraw/use-withdraw-create.mutation";

type FormValues = {
  amount: number;
  upi_id: string;
  details: string;
  phone_number: number;
  note: string;
};

type IProps = {
  initialValues?: Withdraw | null;
};
export default function CreateOrUpdateWithdrawForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues,
    resolver: yupResolver(withdrawValidationSchema),
  });

  const { mutate: createWithdraw, isLoading: creating } =
    useCreateWithdrawMutation();

  const onSubmit = (values: FormValues) => {
    const input = {
      amount: +values.amount,
      details: values.details,
      phone_number: values.phone_number,
      upi_id: values.upi_id,
      note: values.note,
    };

    createWithdraw(
      {
        variables: {
          input,
        },
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
            title={("Description")}
            details={`${
              initialValues
                ? ("Edit")
                : ("Add")
            } ${("withdraw request from here")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-full md:w-2/3">
            <Input
              label={("Amount")}
              {...register("amount")}
              required
              error={t(errors.amount?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={("Upi Id")}
              {...register("upi_id")}
              error={t(errors.upi_id?.message!)}
              required
              variant="outline"
              className="mb-5"
            />

             <Input
              label={("Phone Number")}
              {...register("phone_number")}
              required
              error={t(errors.phone_number?.message!)}
              variant="outline"
              className="mb-5"
            />

            {/* <TextArea
              label={("Details")}
              {...register("details")}
              variant="outline"
              className="mb-5"
            />
            <TextArea
              label={("Note")}
              {...register("note")}
              variant="outline"
              className="mb-5"
            /> */}
          </Card>
        </div>
        <div className="mb-4 text-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {("Back")}
            </Button>
          )}

          <Button loading={creating}>
            {initialValues
              ? ("Update Withdraw")
              : ("Request Withdraw")}
          </Button>
        </div>
      </form>
    </>
  );
}
