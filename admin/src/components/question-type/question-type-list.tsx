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
  courses?: ProductPaginator;
  onPagination: (current: number) => void;
};

export default function QuestionTypeList({ question_types, onPagination }: IProps) {

  const { data, paginatorInfo } = question_types! ?? {};
  const router = useRouter();
  console.log('data', question_types);
  let columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: 'left',
      width: 200,
      ellipsis: true,
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

