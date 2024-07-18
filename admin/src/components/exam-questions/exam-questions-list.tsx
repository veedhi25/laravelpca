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

export default function ExamQuestionsList({ questions, onPagination }: IProps) {

  const { data, paginatorInfo } = questions! ?? {};
  const router = useRouter();
  console.log('data', questions);
  let columns = [
    // {
    //   title: "Id",
    //   dataIndex: "id",
    //   key: "id",
    //   align: 'left',
    //   width: 200,
    //   ellipsis: true,
    // },
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
    {
        title: "Question Image",
        dataIndex: "question_img_url",
        key: "question_img",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
          return <img src={process.env.NEXT_PUBLIC_REST_API_ENDPOINT+record} 
                      className='whitespace-nowrap h-20 w-20'/>
      }
      },
    {
      title: "Question",
      dataIndex: "question",
      key: "name",
      align: 'left',
      width: 200,
      ellipsis: true,
      render: (record)=>{
        return <span className='whitespace-nowrap'>{record}</span>
    }
    },
    {
        title: "Course",
        dataIndex: "course",
        key: "course",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
            return <span className=''>{record?.name}</span>
        }
      },
      {
        title: "Exam",
        dataIndex: "exam",
        key: "exam",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
            return <span className=''>{record?.name}</span>
        }
      },
      {
        title: "Type",
        dataIndex: "question_type",
        key: "question_type",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
            return <span className=''>{record?.type}</span>
        }
      },
      {
        title: "Section",
        dataIndex: "section",
        key: "section",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
            return <span className=''>{record?.name}</span>
        }
      },
      {
        title: "Options",
        dataIndex: "options",
        key: "section",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
            return <span className=''>{record?.map(opt=><li>{opt?.value}</li>)}</span>
        }
      },
      {
        title: "Correct Option",
        dataIndex: "correct_option",
        key: "correct_option",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (text, record) => {
          let correctOptionText;
      
          if (record.question_type.type === "MCQ" || record.question_type.type === "Comprehension") {
            correctOptionText = record.options.find(option => option.is_correct === 1)?.value;
          } else if (record.question_type.type === "Multiple Correct") {
            correctOptionText = record.options
              .filter(option => option.is_correct === 1)
              .map(option => option.value)
              .join(", ");
          } else {
            correctOptionText = "N/A"; // Not applicable for integer type questions
          }
          
          return <span className=''>{correctOptionText}</span>;
        }
      },
      {
        title: "Correct Answer",
        dataIndex: "correct_answer",
        key: "correct_answer",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (text, record) => {
          
          let correctAnswerText;
          
          if (record.question_type.type === "integer") {
            correctAnswerText = record.correct_answer;
          } else {
            correctAnswerText = "N/A"; // Not applicable for MCQ and multiple correct questions
          }
          
          return <span className=''>{correctAnswerText}</span>;
        }
      },
      
      
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        align: 'left',
        width: 200,
        ellipsis: true,
        render: (record)=>{
            return <span className='whitespace-nowrap'>{record?.map(opt=>opt?.name+','+' ')}</span>
        }
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
          data={questions}
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

