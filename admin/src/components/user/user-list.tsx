import ActionButtons from '@components/common/action-buttons';
import Card from '@components/common/card';
import AdminLayout from '@components/layouts/admin';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useCoursesQuery } from '@data/courses/use-courses.query';
import { useCoursesWithExamsAndAttemptsQuery } from '@data/exams/use-courses-exam-attempts.query';
import { useCourseExamQuery } from '@data/exams/use-exam-course.query';
import { useExamsQuery } from '@data/exams/use-exams.query';
import { adminOnly } from '@utils/auth-utils';
import DateFormatter from '@utils/format-date';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Table from 'rc-table';
import React, { useState } from 'react';

export default function CustomerList({customers}) {
    
    const {data: courses} = useCoursesQuery();
    const [selectedCourse, setSelectedCourse] = useState('');

    console.log('users',customers?.users?.data)
   
    // return '';
    const { alignLeft } = useIsRTL();
    const router = useRouter();

    // useCourseExamQuery is called at the top level, not inside handleCourseChange
   

    const columns = [
        {
          title: ("Name"),
          dataIndex: "name",
          key: "name",
          align: alignLeft,
        },

       
        {
          title: ("Class"),
          dataIndex: "student_class_name",
          key: "student_class_name",
          align: alignLeft,
          // width: 60,
        },

        {
          title: ("Stream"),
          dataIndex: "class_stream_name",
          key: "class_stream_name",
          align: alignLeft,
          // width: 60,
        },

        {
          title: ("Batch"),
          dataIndex: "batch",
          key: "batch",
          align: alignLeft,
          // width: 60,
          render: (record) => {
            return <span className=''>{record?.name}</span>
          }
        },

        {
          title: ("Date Of Birth"),
          dataIndex: "date_of_birth",
          key: "date_of_birth",
          align: alignLeft,
          // width: 60,
        },

        {
          title: ("Email"),
          dataIndex: "email",
          key: "email",
          align: alignLeft,
        },
        {
          title: ("Edit"),
          dataIndex: "id",
          key: "actions",
          align: alignLeft,
          render : (userId : any )=>
          {
           
           return  (<ActionButtons
               id = {userId}
             editUrl={`${router.asPath}/${userId}`}
          />)

          
          }
     
        },
       
        // {
        //   title: ("Exams"),
        //   dataIndex: "exams",
        //   key: "exams",
        //   align: alignLeft,
        //   // width: 60,
        //   render : (record)=> {
        //     console.log('coursesExams exam', record)
        //     return record?.map((exam)=> exam?.exam_name)
        //   }
        // },
        
        // {
        //   title: "Date",
        //   dataIndex: "created_at",
        //   key: "created_at",
        //   align: alignLeft,
        //   // width: 60,
        //   render : (record:any) => {
        //     console.log('record',record)
        //     return <DateFormatter dateStr={record}/>
        //   }
          
        // },

          // {
          //   title: ("View Result"),
          //   dataIndex: "id",
          //   key: "actions",
          //   align: alignLeft,
          //   // width: 90,
          //   render: (id: string, record) => (
          //     <ActionButtons
          //       id={id}
          //       detailsUrl={`${router.asPath}/${record?.course_id}`}
          //       // deleteModalView="DELETE_TAG"
          //     />
          //   ),
          // },
    ]



    return (
        <>

        <div className="rounded overflow-hidden shadow mb-6">
        { !customers?.users?.data ? <Spinner/> :
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={("table:empty-table-data")}
            //@ts-ignore
            data={customers?.users?.data}
            rowKey="id"
            scroll={{ x: 1000 }}
            //   expandable={{
            //     expandedRowRender: () => "",
            //     rowExpandable: rowExpandable,
            //   }}
          /> 
        }
        </div>
        {/* {!!paginatorInfo.total && (
          <div className="flex justify-end items-center">
            <Pagination
              total={paginatorInfo.total}
              current={paginatorInfo.currentPage}
              pageSize={paginatorInfo.perPage}
              onChange={onPagination}
            />
          </div>
        )} */}
    </>
    );
}



CustomerList.authenticate = {
    permissions: adminOnly,
  };
  CustomerList.Layout = AdminLayout;
  
  // export const getStaticProps = async ({ locale }: any) => ({
  //   props: {
  //     ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  //   },
  // });
