import { useCoursesQuery } from '@data/courses/use-courses.query';
import React from 'react';
import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import {
  Product,
  ProductPaginator,
  ProductType,
  Shop,
} from "@ts-types/generated";
import ActionButtons from '@components/common/action-buttons';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";
import { useIsRTL } from '@utils/locals';




export type IProps = {
  courses?: ProductPaginator;
  onPagination: (current: number) => void;
};


export default function MarkingSchemeList({ marking_scheme, onPagination }: IProps) {

  const { data, paginatorInfo } = marking_scheme! ?? {};
  const router = useRouter();
  console.log('data', marking_scheme);

  const {t} = useTranslation()
  const { alignLeft } = useIsRTL();

  let columns = [
    {
        title: ("Edit"),
        dataIndex: "id",
        key: "actions",
        align: "center",
        width: 80,
        render: (id: string, record: Product) => (
          <ActionButtons
            id={record?.id}
            editUrl={`${router.asPath}/${id}/edit`}
            // deleteModalView="DELETE_PRODUCT"
          />
        ),
      },
    // {
    //   title: "Id",
    //   dataIndex: "id",
    //   key: "id",
    //   align: 'left',
    //   width: 200,
    //   ellipsis: true,
    // },
    // {
    //   title: "Course",
    //   dataIndex: "course",
    //   key: "course",
    //   align: 'left',
    //   width: 200,
    //   ellipsis: true,
    //   render:(record:any)=> {
    //     return <span className=''>{record?.name}</span>
    //   }
    // },
    {
        title: "Scheme",
        dataIndex: "name",
        key: "name",
        align: 'left',
        width: 200,
        ellipsis: true,
        render:(record:any)=> {
          return <span className=''>{record}</span>
        }
    },
    // {
    //     title: "Section",
    //     dataIndex: "section",
    //     key: "section",
    //     align: 'left',
    //     width: 200,
    //     ellipsis: true,
    //     render:(record:any)=> {
    //       return <span className=''>{record?.name}</span>
    //     }
    // },
    // {
    //     title: "Question Type",
    //     dataIndex: "question_type",
    //     key: "question_type",
    //     align: 'left',
    //     width: 200,
    //     ellipsis: true,
    //     render:(record:any)=> {
    //       return <span className=''>{record?.type}</span>
    //     }
    // },
    {
        title: "Question Marks",
        dataIndex: "marks",
        key: "marks",
        align: 'left',
        width: 200,
        ellipsis: true,
        render:(marks:any)=> {
          return <span className=''>{marks}</span>
        }
    },
    {
        title: "Negative Marks",
        dataIndex: "negative_marks",
        key: "negative_marks",
        align: 'left',
        width: 200,
        ellipsis: true,
        render:(negative_marks:any)=> {
          return <span className=''>{negative_marks}</span>
        }
    },
    {
      title: t("Delete"),
      dataIndex: "id",
      key: "actions",
      align: alignLeft,
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          deleteModalView="DELETE_MARKING_SCHEME"
          
        /> 
      )  ,
    },
    // {
    //   title: "Created on",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   align: 'left',
    //   width: 200,
    //   ellipsis: true,
    // },
   
  ]


  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {/* {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )} */}
    </>
  );
};

