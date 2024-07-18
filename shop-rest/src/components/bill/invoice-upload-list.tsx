import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import { ROUTES } from "@utils/routes";
import {  WithdrawPaginator } from "@ts-types/generated";
import { useRouter } from "next/router";
import Badge from "@components/ui/badge/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

type IProps = {
  invoice_upload: WithdrawPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const InvoiceUploadList = ({ invoice_upload, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const router = useRouter();

  const renderStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return <Badge text={("Approved")} color="bg-accent" />;
      case "PENDING":
        return <Badge text={("Pending")} color="bg-purple-500" />;
      case "ON_HOLD":
        return <Badge text={("On hold")} color="bg-pink-500" />;
      case "REJECTED":
        return <Badge text={("Rejected")} color="bg-red-500" />;
      case "PROCESSING":
        return <Badge text={("Processing")} color="bg-yellow-500" />;
    }
  };
  function formateDate(date){
    var d=date.split('T')[0].split('-');
    return d[2]+"/"+d[1]+"/"+d[0]
  }
  let columns = [

    {
      title: ("Amount"),
      dataIndex: "bill_amount",
      key: "bill_amount",
      align: "right",
      render: (bill_amount: number) => {
        const { price } = usePrice({
          amount: bill_amount as number,
        });
        return <div>{price}</div>;
      },
    },
    {
      title: ("Shop Name"),
      dataIndex: "shop_name",
      key: "shop_name",
      align: "right",
      render: (shop_name: number) => {
        return <div>{shop_name}</div>;
      },
    },
    // {
    //   title: ("Shop Address"),
    //   dataIndex: "shop_address",
    //   key: "shop_address",
    //   align: "right",
    //   render: (shop_address: number) => {
    //     return <div>{shop_address}</div>;
    //   },
    // },
    {
      title: ("Approved Amount"),
      dataIndex: "approved_amount",
      key: "approved_amount",
      align: "right",
      render: (approved_amount: number) => {
        return <div>{approved_amount?approved_amount:"not approved yet"}</div>;
      },
    },
    {
      title: ("Status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => renderStatusBadge(status),
    },
    {
      title: ("Created"),
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
      title: ("Date"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        return (
          <span className="whitespace-nowrap">
            {formateDate(date)}
          </span>
        );
      },
    }
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("No Records Found")}
          data={invoice_upload?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!invoice_upload?.paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={invoice_upload?.paginatorInfo.total}
            current={invoice_upload?.paginatorInfo.currentPage}
            pageSize={invoice_upload?.paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default InvoiceUploadList;
