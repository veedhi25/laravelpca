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
import Badge from "@components/ui/badge/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

type IProps = {
  withdraws: WithdrawPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const WithdrawList = ({ withdraws, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const router = useRouter();

  function parseCategories(categories:any){
    var value="";
    categories=JSON.parse(categories);
    categories.forEach((v:any)=>{
      value+=" "+v
    })
    return value;
  }

  let columns = [
    {
      title: ("Phone Number"),
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      render: (phone_number: number) => {
        return <div>{phone_number}</div>;
      },
    },
    {
      title: ("order tracking number"),
      dataIndex: "order_tracking_number",
      key: "order_tracking_number",
      align: "order_tracking_number",
      render: (order_tracking_number: any) => {
        return <div>{order_tracking_number}</div>;
      },
    },
    {
      title: ("Customer"),
      dataIndex: "username",
      key: "username",
      align: "center",
      render: (username: number) => {
        return <div>{username}</div>;
      },
    },
    {
      title: ("categories"),
      dataIndex: "categories",
      key: "categories",
      align: "center",
      render: (categories: any) => {
        return <div>{categories?parseCategories(categories):''}</div>;
      },
    },

    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => (status),
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
            <ActionButtons detailsUrl={`${ROUTES.INVOICES_REWARD_DATA}/${id}`} id={id} />
          );
        }
        return null;
      },
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== "actions");
  }

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

export default WithdrawList;
