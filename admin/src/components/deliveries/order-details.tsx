import NotFound from "@components/common/not-found";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { formatAddress } from "@utils/format-address";
import OrderStatus from "./order-status";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { PlusIcon } from "@components/icons/plus-icon";
import { OrderItems } from "./order-items-table";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";

interface Props {
  order: any;
}

const OrderDetails = ({ order }: Props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  
  const {
    status,
    sender_complete_address,
    reciever_complete_address,
    reciever_name,
    payment_method,
    sender_name,
    sender_phone_number,
    reciever_phone_number,
    tracking_number,
  } = order ?? {};

  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: discount } = usePrice({
    amount: order?.discount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });
  const { price: delivery_fee } = usePrice({
    amount: order?.delivery_fee,
  });
  const { price: sales_tax } = usePrice({
    amount: order?.sales_tax,
  });

  return (
    <div className="flex flex-col w-full lg:w-2/3 border border-border-200">
      {!isEmpty(order) ? (
        <>
          <div className="flex flex-col md:flex-row items-center md:justify-between p-5 border-b border-border-200">
            <h2 className="flex font-semibold text-sm md:text-xl text-heading mb-2">
              {t("Delivery Detail")} <span className="px-2">-</span>{" "}
              {tracking_number}
            </h2>

            <Link
              href={`/${router?.query?.shop}${ROUTES.DELIVERY}/create`}
              className="font-semibold text-sm text-accent flex items-center transition duration-200 no-underline hover:text-accent-hover focus:text-accent-hover"
            >
              <PlusIcon width={20} className="me-2" />
              {t("New Delivery")}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row border-b border-border-200">
            <div className="w-full md:w-3/5 flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-border-200">

            <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("Pickup Address")}
                </span>

                <span className="text-sm text-body">
                  {sender_complete_address}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("Shipping Address")}
                </span>

                <span className="text-sm text-body">
                  {reciever_complete_address}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("Payment type")}
                </span>

                <span className="text-sm text-body">
                  {payment_method}
                </span>
              </div>
            </div>

            <div className="w-full md:w-2/5 flex flex-col px-5 py-4">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("Reciever Name")}</span>
                <span className="text-sm text-heading">{reciever_name}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("Reciever tel.")}</span>
                <span className="text-sm text-heading">{reciever_phone_number}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("Sender tel.")}</span>
                <span className="text-sm text-heading">{sender_phone_number}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-bold text-heading">
                {t("Delivery Fee")}
                </span>
                <span className="text-sm font-bold text-heading">{amount}</span>
              </div>
            </div>
          </div>

          {/* Order Table */}
          <div>
            <div className="w-full flex justify-center items-center px-6">
              <OrderStatus status={status} />
            </div>
            {/* <OrderItems products={products} /> */}
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto">
          <NotFound text="Sorry, No Order Found" />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
