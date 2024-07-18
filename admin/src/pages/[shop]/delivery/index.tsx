import { useEffect, useState, Fragment } from "react";
import ShopLayout from "@components/layouts/shop";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import DeliveryCard from "@components/deliveries/order-card";
import ErrorMessage from "@components/ui/error-message";
import OrderDetails from "@components/deliveries/order-details";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useDeliveriesQuery } from "@data/shop-delivery/use-deliveries.query";
import Button from "@components/ui/button";
import NotFound from "@components/common/not-found";

export default function DeliveriesPage() {
  const { t } = useTranslation("common");
  const [order, setOrder] = useState<any>({});
  const {
    data,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useDeliveriesQuery({});
  useEffect(() => {
    if (data?.pages?.[0].data.length) {
      setOrder(data.pages[0].data[0]);
    }
  }, [data?.pages?.length]);
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="w-full bg-light">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">

        <div className="w-full hidden overflow-hidden lg:flex">
          <div
            className="pe-5 lg:pe-8 w-full md:w-1/3"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className="flex flex-col h-full pb-5 md:border md:border-border-200">
              <h3 className="text-xl font-semibold py-5 text-heading px-5">
                {("My Deliveries")}
              </h3>
              <Scrollbar
                className="w-full"
                style={{ height: "calc(100% - 80px)" }}
              >
                {loading && !data?.pages?.length ? (
                  <p>
                    <Spinner showText={false} />
                  </p>
                ) : (
                  <div className="px-5">
                    {data?.pages?.map((page, idx) => (
                      <Fragment key={idx}>
                        {page?.data?.map((_order: any, index: number) => (
                          <DeliveryCard
                            key={index}
                            order={_order}
                            onClick={() => setOrder(_order)}
                            isActive={order?.id === _order?.id}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>
                )}
                {!loading && !data?.pages?.[0]?.data?.length && (
                  <div className="w-full h-full flex items-center justify-center my-auto">
                    <h4 className="text-sm font-semibold text-body text-center">
                      {t("You didn't deliver anything yet")}
                    </h4>
                  </div>
                )}
                {hasNextPage && (
                  <div className="flex justify-center mt-8 lg:mt-12">
                    <Button
                      loading={loadingMore}
                      onClick={() => fetchNextPage()}
                      className="text-sm md:text-base font-semibold h-11"
                    >
                      {t("text-load-more")}
                    </Button>
                  </div>
                )}
              </Scrollbar>
            </div>
          </div>
          
          {/* End of Order List */}
          {!!data?.pages?.[0]?.data?.length ? (
            <OrderDetails order={order} />
          ) : (
            <div className="max-w-lg mx-auto">
              <NotFound text="Sorry, No Order Found" />
            </div>
          )}
        </div>

        {/* Order Card Mobile */}
        <div className="flex flex-col w-full lg:hidden">
          <div className="flex flex-col w-full h-full px-0 pb-5">
            <h3 className="text-xl font-semibold pb-5 text-heading">
              {t("My Orders")}
            </h3>
            
            <Collapse
              accordion={true}
              defaultActiveKey="active"
              expandIcon={() => null}
            >
              {loading && !data?.pages?.length ? (
                <p>
                  <Spinner showText={false} />
                </p>
              ) : (
                data?.pages?.map((page, idx) => (
                  <Fragment key={idx}>
                    {page?.data?.map((_order: any, index: number) => (
                      <Panel
                        header={
                          <DeliveryCard
                            key={`mobile_${index}`}
                            order={_order}
                            onClick={() => setOrder(_order)}
                            isActive={order?.id === _order?.id}
                          />
                        }
                        headerClass="accordion-title"
                        key={index}
                        className="mb-4"
                      >
                        <OrderDetails order={order} />
                      </Panel>
                    ))}
                  </Fragment>
                ))
              )}

              {!loading && !data?.pages?.[0]?.data?.length && (
                <div className="w-full h-full flex flex-col items-center justify-center py-10 my-auto">
                  <div className="w-5/6 h-full flex items-center justify-center mb-7">
                    <img
                      src="/no-result.svg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-body text-center">
                    {t("error-no-orders")}
                  </h4>
                </div>
              )}
              {hasNextPage && (
                <div className="flex justify-center mt-8 lg:mt-12">
                  <Button
                    loading={loadingMore}
                    onClick={() => fetchNextPage()}
                    className="text-sm md:text-base font-semibold h-11"
                  >
                    {t("text-load-more")}
                  </Button>
                </div>
              )}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

DeliveriesPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
DeliveriesPage.Layout = ShopLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};