import { adminOnly } from "@utils/auth-utils";
import Input from "@components/ui/input";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import TextArea from "@components/ui/text-area";
import { useRouter } from "next/router";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import SelectInput from "@components/ui/select-input";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import AdminLayout from "@components/layouts/admin";
import { useWithdrawQuery } from "@data/invoices-reward-data/use-withdraw.query";
import { useApproveWithdrawMutation } from "@data/invoices-reward-data/use-approve-withdraw.mutation";
import Card from "@components/common/card";
import { rest } from "lodash";

type FormValues = {
  status: any;
};
const WithdrawStatus = [
  {
    name: "Approved",
    id: "approved",
  },
  {
    name: "On Hold",
    id: "on_hold",
  },
  {
    name: "Processing",
    id: "processing",
  },
  {
    name: "Pending",
    id: "pending",
  },
  {
    name: "Rejected",
    id: "rejected",
  },
];

const Withdraw = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    query: { id },
  } = router;

  const {
    data,
    error,
    isLoading: loading,
  } = useWithdrawQuery(id as string);

  useEffect(() => {
    if (data?.withdraw?.status) {
      setValue(
        "status",
        WithdrawStatus?.find((status) => status.id === data?.withdraw?.status)
      );
    }
  }, [data?.withdraw?.status]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate: approveWithdraw, isLoading: approving } =
    useApproveWithdrawMutation();
  function getImage(){
    if(data?.withdraw){
      var img=JSON.parse(data?.withdraw?.bill);
      if(img){
        return img.thumbnail;
      }
    }
  }
  function handleApproveWithdraw({ status ,note,approved_amount_percentage}: any) {
    approveWithdraw({
      variables: {
        input: {
          id: id as string,
          note:note,
          approved_amount_percentage:approved_amount_percentage,
          status: status.id,
        },
      },
      
    });
  }

  // console.log('withdraw',data?.withdraw)

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <h3 className="w-full text-xl font-semibold text-heading mb-6">
        {t("Invoice Information")}
      </h3>
      <Card className="flex flex-col">
        <div className="flex flex-col md:flex-row items-start">
        {
            (data?.withdraw?.status!='approved')&&(
              <form
                onSubmit={handleSubmit(handleApproveWithdraw)}
                className="flex  items-start ms-auto w-full md:w-1/2 md:order-2 mb-5 md:mb-0 md:ps-3"
                style={{flexDirection:'column'}}
              >
                <div className="w-full me-5 z-20">
                  <SelectInput
                    name="status"
                    label={"new status"}
                    control={control}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.id}
                    options={WithdrawStatus}
                    placeholder={t("form:input-placeholder-order-status")}
                    rules={{
                      required: "Status is required",
                    }}

                  />

                  <ValidationError message={t(errors?.status?.message)} />
                </div>
                <Input
                  label={("Approved Amount")}
                  type="number"
                  {...register('approved_amount_percentage')}
                  variant="outline"
                  className="mb-5 w-full"
                />
                <div className="flex items-center">
                  <span className="text-heading text-sm font-semibold w-full">
                    <TextArea
                      label={t("form:input-label-note")}
                      variant="outline"
                      className="mb-5 w-full"
                      style={{width:"400px"}}
                      id="note"
                      {...register("note")}
                    /> 
                  </span>
                </div>
                
                <Button loading={approving}>
                  <span className="hidden sm:block">
                    {t("form:button-label-change-status")}
                  </span>
                  <span className="block sm:hidden">
                    {t("form:form:button-label-change")}
                  </span>
                </Button>
              </form>
            )
          }
          

          <div className="w-full md:w-1/2 md:order-1 md:pe-3">
            <div className="flex items-center justify-start mb-2">
              <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
                <span>{t("common:Amount")}</span>
                <span>:</span>
              </div>
              <div className="border border-gray-300 rounded px-4 py-3 w-full xl:w-5/12 items-center flex">
                <span className="text-heading font-semibold">
                  {data?.withdraw?.bill_amount}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
                <span>{t("UPI ID")}</span>
                <span>:</span>
              </div>
              <span className="text-heading text-sm font-semibold w-full">
                {data?.withdraw?.upi_id ?? "N/A"}
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
                <span>{t("common:Status")}</span>
                <span>:</span>
              </div>
              <span className="text-heading text-sm font-semibold w-full">
                {
                  WithdrawStatus?.find(
                    (status) => status.id === data?.withdraw?.status
                  )?.name
                }
              </span>
            </div>
            
            {data?.withdraw?.note && (
              <>
                <div className="mb-2 text-heading font-semibold text-sm">
                  <span>{t("common:text-note")} :</span>
                </div>
                <div className="mb-2 text-heading font-semibold text-sm">
                  <span className="text-body text-sm">{data?.withdraw?.note}</span>
                </div>
              </>
            )}
            {data?.withdraw?.approved_amount > 0&& (
              <>
                <div className="mb-2 text-heading font-semibold text-sm">
                  <span>{("Approved Amount")} :</span>
                </div>
                <div className="mb-2 text-heading font-semibold text-sm">
                  <span className="text-body text-sm">{data?.withdraw?.approved_amount}</span>
                </div>
              </>
            )}
              {
                getImage()&&(
                  <img src={getImage()} alt="" style={{maxWidth:"400px"}} className="mt-4"/>
                )
              }
              
            
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {data?.withdraw?.phone_number && (
          <Card className="flex flex-col">
            <div className="mb-2 text-heading font-semibold text-sm">
              <span>{t("common:Phone Number")} :</span>
            </div>

            <span className="text-body text-sm">{data?.withdraw?.phone_number}</span>
          </Card>
        )}

{
  
}        
          
        
      </div>
    </>
  );
};

export default Withdraw;

Withdraw.authenticate = {
  permissions: adminOnly,
};
Withdraw.Layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["table", "common", "form"])),
  },
});
