

import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import { adminOnly, getAuthCredentials, hasAccess } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { Shop, ContactPaginator } from "@ts-types/generated";
import { useRouter } from "next/router";
import Badge from "@components/ui/badge/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";



type IProps = {
  contacts: ContactPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const ContactsList = ({ contacts, onPagination }: IProps) => {

  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();
  
  // console.log('contact prop', contacts);

  const router = useRouter();

//   const renderStatusBadge = (status: string) => {
//     switch (status.toUpperCase()) {
//       case "APPROVED":
//         return <Badge text={t("text-approved")} color="bg-accent" />;
//       case "PENDING":
//         return <Badge text={t("text-pending")} color="bg-purple-500" />;
//       case "ON_HOLD":
//         return <Badge text={t("text-on-hold")} color="bg-pink-500" />;
//       case "REJECTED":
//         return <Badge text={t("text-rejected")} color="bg-red-500" />;
//       case "PROCESSING":
//         return <Badge text={t("text-processing")} color="bg-yellow-500" />;
//     }
//   };

  let columns = [
    
    {
      title: ("Name"),
      align: alignLeft,
      render: (data:any) => data.name,
    },

    {
      title: ("Email"),
      dataIndex: "email",
      key: "email",
      align: "right",
      render: (email: any) => {
        
        return <div>{email}</div>;
      },
    },
    

    {
      title: ("Mobile Number"),
      dataIndex: "subject",
      key: "subject",
      align: "right",
      render: (subject: number) => {
        
        return <div>{subject}</div>;
      },
    },

    {
      title: ("City"),
      dataIndex: "description",
      key: "description",
      align: "right",
      render: (description: string) => {
        return <div>{description}</div>;
      },
    },
   
    // {
    //   title: t("table:table-item-status"),
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center",
    //   render: (status: string) => renderStatusBadge(status),
    // },

    {
      title: t("table:Time"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {
               //get date and time in india timezone, for current date show today
              dayjs.utc(date).tz("Asia/Kolkata").format("DD MMM YYYY") === dayjs().format("DD MMM YYYY")
                ? 'Today' + ' ' + dayjs.utc(date).tz("Asia/Kolkata").format(" hh:mm A")
                :  dayjs.utc(date).tz("Asia/Kolkata").format("DD MMM YYYY hh:mm A")
            
              // dayjs.utc(date).tz("Asia/Kolkata").format("hh:mm A DD MMM YYYY ")

            }
          </span>
        );
      },
    },

    

    // {
    //   title: t("table:table-item-actions"),
    //   dataIndex: "id",
    //   key: "actions",
    //   align: "center",
    //   render: (id: string) => {
    //     const { permissions } = getAuthCredentials();
    //     if (hasAccess(adminOnly, permissions)) {
    //       return (
    //         <ActionButtons detailsUrl={`${ROUTES.CONTACTS}/${id}`} id={id} />
    //       );
    //     }
    //     return null;
    //   },
    // },
  ];
//   if (router?.query?.shop) {
//     columns = columns?.filter((column) => column?.key !== "actions");
//   }


  return (

    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={contacts?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!contacts?.paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={contacts?.paginatorInfo.total}
            current={contacts?.paginatorInfo.currentPage}
            pageSize={contacts?.paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default ContactsList;
