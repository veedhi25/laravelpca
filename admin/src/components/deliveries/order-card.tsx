import usePrice from "@utils/use-price";
import dayjs from "dayjs";
import cn from "classnames";
import { useTranslation } from "next-i18next";

type DeliveryCardProps = {
  order: any;
  isActive: boolean;
  onClick?: (e: any) => void;
};

const DeliveryCard: React.FC<DeliveryCardProps> = ({ onClick, order, isActive }) => {
  const { t } = useTranslation("common");
  const { id, status, created_at, sender_complete_address,reciever_name,reciever_complete_address } = order ?? {};
  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "bg-gray-100 rounded overflow-hidden w-full flex flex-shrink-0 flex-col mb-4 border-2 border-transparent cursor-pointer last:mb-0",
        isActive === true && "!border-accent"
      )}
    >
      <div className="flex justify-between items-center border-b border-border-200 py-3 px-5 md:px-3 lg:px-4">
        <span className="flex font-bold text-sm lg:text-base text-heading me-4 flex-shrink-0">
          {t("Deliveries")}
          <span className="font-normal ms-1">#{id}</span>
        </span>
        <span
          className="text-sm text-blue-500 bg-blue-100 px-3 py-2 rounded whitespace-nowrap truncate max-w-full"
          title={status.name}
        >
          {status.name}
        </span>
      </div>

      <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
        <p className="text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t("Order Date")}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1">
            {dayjs(created_at).format("MMMM D, YYYY")}
          </span>
        </p>
        <p className="text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t("Reciever Name")}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1 truncate">{reciever_name}</span>
        </p>
        <p className="text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t("Reciever Address")}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1 truncate">{reciever_complete_address}</span>
        </p>
        <p className="text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t("Pickup Address")}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1 truncate">{sender_complete_address}</span>
        </p>
        <p className="text-sm font-bold text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t("Amount")}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1">{amount}</span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryCard;
