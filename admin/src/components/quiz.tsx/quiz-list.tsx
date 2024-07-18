

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
import { CheckMark } from "@components/icons/checkmark";
import { CheckMarkFill } from "@components/icons/checkmark-circle-fill";



type IProps = {
  quiz: ContactPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const QuizList = ({ quiz, onPagination }: IProps) => {

  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();
  
  // console.log('contact prop', quiz);

  const router = useRouter();


  let columns = [

    {
      title: ("Campaign"),
      dataIndex: "campaign_name",
      key: "campaign_name",
      align: "campaign_name",
      render: (campaign_name: number) => {
        <Badge/>
        return <div className="flex whitespace-nowrap ">{quiz?.right_answers == 5 && <CheckMarkFill className=' text-green-600' width={16} height={16}/>}{campaign_name  }</div>;
      },
    },
    
    {
      title: ("Name"),
      align: alignLeft,
      render: (data:any,right_answers:string) => {
         return <div className={` ${right_answers === 5 ? 'text-green-600 font-semibold' : ''}`}> {data.name}</div> 
      }
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
      dataIndex: "phone_number",
      key: "phone_number",
      align: "phone_number",
      render: (phone_number: number) => {
        
        return <div>{phone_number}</div>;
      },
    },

    {
      title: ("Right Answers"),
      dataIndex: "right_answers",
      key: "right_answers",
      align: "right",
      render: (right_answers: string) => {
        return <div className={`${right_answers == 5 ? 'text-green-600 font-semibold' : ''}`}>{right_answers }</div>;
      },
    },

    {
      title: ("q1"),
      dataIndex: "q1",
      key: "q1",
      align: "right",
      render: (q1: string) => {
        return <div>{q1}</div>;
      },
    },

    {
      title: ("q2"),
      dataIndex: "q2",
      key: "q2",
      align: "right",
      render: (q2: string) => {
        return <div>{q2}</div>;
      },
    },

    {
      title: ("q3"),
      dataIndex: "q3",
      key: "q3",
      align: "right",
      render: (q3: string) => {
        return <div>{q3}</div>;
      },
    },

    {
      title: ("q4"),
      dataIndex: "q4",
      key: "q4",
      align: "right",
      render: (q4: string) => {
        return <div>{q4}</div>;
      },
    },

    {
      title: ("q5"),
      dataIndex: "q5",
      key: "q5",
      align: "right",
      render: (q5: string) => {
        return <div>{q5}</div>;
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
    //         <ActionButtons detailsUrl={`${ROUTES.quiz}/${id}`} id={id} />
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
          data={quiz?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!quiz?.paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={quiz?.paginatorInfo.total}
            current={quiz?.paginatorInfo.currentPage}
            pageSize={quiz?.paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default QuizList;
