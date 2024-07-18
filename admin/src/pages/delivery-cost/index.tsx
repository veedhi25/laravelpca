
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CostForm from "@components/delivery-cost/cost-form";
import { adminOnly } from "@utils/auth-utils";
import { useDeliveryCostQuery } from "@data/delivery/use-delivery-cost.query";


export default function DeliveryCostPage() {
  const { t } = useTranslation();
  const { data, isLoading: loading, error } = useDeliveryCostQuery();
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {("Delivery Cost")}
        </h1>
      </div>
      <CostForm initialValues={data?.deliveryCost} />
    </>
  );
}
DeliveryCostPage.authenticate = {
  permissions: adminOnly,
};
DeliveryCostPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
