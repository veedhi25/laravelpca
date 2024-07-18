import { adminOnly } from "@utils/auth-utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ProgressBox from "@components/ui/progress-box/progress-box";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import SelectInput from "@components/ui/select-input";
import ValidationError from "@components/ui/form-validation-error";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import AdminLayout from "@components/layouts/admin";
import { useDeliveryQuery } from "@data/delivery/use-delivery.query";
import { useOrderStatusesQuery } from "@data/order-status/use-order-statuses.query";
import { useApproveDeliveryMutation } from "@data/delivery/use-approve-delivery.mutation";
import Card from "@components/common/card";

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
  } = useDeliveryQuery(id as string);
  const { data: orderStatusData } = useOrderStatusesQuery({});

  useEffect(() => {
    if (data?.delivery?.status) {
      setValue(
        "status",
        WithdrawStatus?.find((status) => status.id === data?.delivery?.status)
      );
    }
  }, [data?.delivery?.status]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate: approveWithdraw, isLoading: approving } =
    useApproveDeliveryMutation();
  const renderStatusBadge = (status: string) => {
    var value=""
    if(orderStatusData){
      orderStatusData?.order_statuses?.data.forEach((element:any)=>{
        
        if(element.serial==status){
          value= element.name
        }
      })
    }
    return value;
  };

  function handleApproveWithdraw({ status }: any) {
    approveWithdraw({
      variables: {
        input: {
          id: id as string,
          status: status.id,
        },
      },
    });
  }

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <h3 className="w-full text-xl font-semibold text-heading mb-6">
        {("Delivery Information")}
      </h3>

      <Card className="flex flex-col">
      <div className="flex flex-col md:flex-row items-start">

        <div className="w-full md:w-1/2 md:order-1 pr-5 pl-5">

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Package Name")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.package_name}
            </span>
          </div>

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Package Type")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.package_type}
            </span>
          </div>

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Sender Name")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.sender_name}
            </span>
          </div>
          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Reciever Name")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.reciever_name}
            </span>
          </div>

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{t("common:Status")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {
                renderStatusBadge(data?.delivery?.status)
              }
            </span>
          </div>
          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{t("Distance")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {
                data?.delivery?.distance+" Km"
              }
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:order-1 pr-5 pl-5">

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Package Weight")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.package_weight} kg
            </span>
          </div>

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Package Quantity")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.package_qty}
            </span>
          </div>

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Sender Address")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.sender_complete_address}
            </span>
          </div>
          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{("Reciever Address")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.reciever_complete_address}
            </span>
          </div>

          <div className="flex items-center justify-start mb-4">
            <div className="w-4/12 me-5 flex justify-between text-body text-sm flex-shrink-0">
              <span>{t("common:Amount")}</span>
              <span>:</span>
            </div>
            <span className="text-heading text-sm font-semibold w-full text-end">
              {data?.delivery?.amount} ₹
            </span>
          </div>
        </div>
        </div>

        
      </Card>
      <Card className="mt-5">
        <div className=" flex justify-center items-center">
          <ProgressBox
            data={orderStatusData?.order_statuses?.data}
            status={data?.delivery?.status}
          />
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">  
        <Card className="flex flex-col">
          <form
              onSubmit={handleSubmit(handleApproveWithdraw)}
              className="flex items-start ms-auto w-full md:order-2 mb-5 md:mb-0 md:ps-3"
            >
              <div className="w-full me-5 z-20">
                <SelectInput
                  name="status"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  options={orderStatusData?.order_statuses?.data}
                  placeholder={t("form:input-placeholder-order-status")}
                  rules={{
                    required: "Status is required",
                  }}
                />

                <ValidationError message={t(errors?.status?.message)} />
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
          </Card>
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
