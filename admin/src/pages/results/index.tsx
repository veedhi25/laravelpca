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

export default function Exams() {
    
    const {data: courses} = useCoursesQuery();
    const [selectedCourse, setSelectedCourse] = useState('');

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    }

    const { alignLeft } = useIsRTL();
    const router = useRouter();

    // useCourseExamQuery is called at the top level, not inside handleCourseChange
    const {data: examsCourses,} = useCourseExamQuery(selectedCourse); 
    const {data: coursesExams, isLoading} =useCoursesWithExamsAndAttemptsQuery();

    const {data: exams} = useExamsQuery();
  
    console.log('coursesExams', coursesExams);

    const coursesWithAttempts =() => {
      return coursesExams?.filter((course)=>course?.exams)
    }

    console.log('users courses', courses?.data?.courses);

    const columns = [
        {
          title: ("Course"),
          dataIndex: "course_name",
          key: "course_name",
          align: alignLeft,
     
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

          {
            title: ("View Result"),
            dataIndex: "id",
            key: "actions",
            align: alignLeft,
            // width: 90,
            render: (id: string, record) => (
              <ActionButtons
                id={id}
                detailsUrl={`${router.asPath}/${record?.course_id}`}
                // deleteModalView="DELETE_TAG"
              />
            ),
          },
    ]



    return (
        <>
        <Card className='my-3'>
          <div className='font-semibold'>
              Results
          </div>
        </Card>
        <div className="rounded overflow-hidden shadow mb-6">
        { isLoading ? <Spinner/> :
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={("table:empty-table-data")}
            //@ts-ignore
            data={coursesExams}
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



Exams.authenticate = {
    permissions: adminOnly,
  };
  Exams.Layout = AdminLayout;
  
  export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["form", "common", "table"])),
    },
  });
