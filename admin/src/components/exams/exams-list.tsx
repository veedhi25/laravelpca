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

export type IProps = {
  exams?: ProductPaginator;
  onPagination: (current: number) => void;
};

export default function ExamsList({ exams, onPagination }: IProps) {

  const { data, paginatorInfo } = exams! ?? {};
  const router = useRouter();
  console.log('data', exams);
  let columns = [
    
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      align: 'left',
      width: 200,
      ellipsis: true,
    },
    {
        title: "Exam Name",
        dataIndex: "name",
        key: "name",
        align: 'left',
        width: 200,
        ellipsis: true,
      },
    {
        title: "Total Marks",
        dataIndex: "total_marks",
        key: "total_marks",
        align: 'left',
        width: 200,
        ellipsis: true,
    },
    {
        title: "Total Questions",
        dataIndex: "total_questions",
        key: "total_questions",
        align: 'left',
        width: 200,
        ellipsis: true,
    },
    {
        title: "Time Duration",
        dataIndex: "time",
        key: "time",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (time) => {
            const hours = time?.split(':')[0];
            const minutes = time?.split(':')[1];
    
            return (
                <span>
                    {hours && `${hours} hours `}
                    {minutes && minutes !== "0" && `${minutes} min`}
                </span>
            );
        }
    },
    
    {
      title: "Created on",
      dataIndex: "created_at",
      key: "created_at",
      align: 'left',
      width: 200,
      ellipsis: true,
    },
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
  ]


  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={("table:empty-table-data")}
          data={exams}
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

