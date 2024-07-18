import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import { adminOnly, getAuthCredentials, hasAccess } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { Shop, WithdrawPaginator } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useOrderStatusesQuery } from "@data/order-status/use-order-statuses.query";
import Badge from "@components/ui/badge/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

type IProps = {
  withdraws: WithdrawPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const DeliveryList = ({ withdraws, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { data: orderStatusData } = useOrderStatusesQuery({});
  const { alignLeft } = useIsRTL();

  const router = useRouter();

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

  let columns = [
    {
      title: ("Sender Name"),
      align: alignLeft,
      render: (data:any) => (data.sender_name),
    },
    {
      title: ("Reciever Name"),
      align: alignLeft,
      render: (data:any) => (data.reciever_name),
    },
    {
      title: ("Sender Address"),
      align: alignLeft,
      render: (data:any) => (data.sender_complete_address),
    },
    
    {
      title: ("Reciever Address"),
      align: alignLeft,
      render: (data:any) => (data.reciever_complete_address),
    },
    {
      title: ("Package Type"),
      align: alignLeft,
      render: (data:any) => (data.package_type),
    },
    {
      title: ("Distance"),
      align: alignLeft,
      render: (data:any) => (data.distance+" km"),
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount: number) => {
        return <div>{amount} ₹</div>;
      },
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => renderStatusBadge(status),
    },
    {
      title: t("table:table-item-created-at"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      },
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string) => {
        const { permissions } = getAuthCredentials();
        if (hasAccess(adminOnly, permissions)) {
          return (
            <ActionButtons detailsUrl={`${ROUTES.DELIVERY}/${id}`} id={id} />
          );
        }
        return null;
      },
    },
  ];
  
  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={withdraws?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!withdraws?.paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={withdraws?.paginatorInfo.total}
            current={withdraws?.paginatorInfo.currentPage}
            pageSize={withdraws?.paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default DeliveryList;
