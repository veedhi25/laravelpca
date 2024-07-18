import ActionButtons from '@components/common/action-buttons';
import Card from '@components/common/card';
import NavBar from '@components/navbar/NavBar';
import Loader from '@components/ui/loader/loader';
import Spinner from '@components/ui/loaders/spinner/spinner';
// import AdminLayout from '@components/layouts/admin';
import { useCoursesQuery } from '@data/courses/use-courses.query';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { useCoursesWithExamsAndAttemptsQuery } from '@data/exams/use-courses-exam-attempts.query';
import { useCourseExamQuery } from '@data/exams/use-exam-course.query';
import { useExamsQuery } from '@data/exams/use-exams.query';
import { getUserAttepmtedExamCoursesQuery, useUserAttemptedCoursesQuery } from '@data/exams/use-user-attempted-exam-courses.query';
// import { adminOnly } from '@utils/auth-utils';
import DateFormatter from '@utils/format-date';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Table from 'rc-table';
import React, { useState } from 'react';
import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import { useSpring, animated } from 'react-spring';
export default function Results() {
    
    const {data: courses} = useCoursesQuery();
    const [selectedCourse, setSelectedCourse] = useState('');

    const {data:user} = useCustomerQuery();

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    }

    const buttonAnimation = useSpring({
      from: { opacity: 0, transform: 'scale(0.9)' },
      to: { opacity: 1, transform: 'scale(1)' },
      config: { tension: 220, friction: 12 },
  });

    const { alignLeft } = useIsRTL();
    const router = useRouter();

    const user_id = user?.me?.id

    const {data: examsCourses} = useCourseExamQuery(selectedCourse); 
    const { data:coursesExams} = useUserAttemptedCoursesQuery(user_id)
    
    const {data: exams} = useExamsQuery();
  
    console.log('coursesExams', coursesExams);

    console.log('courses', coursesExams)

    const coursesWithAttempts =() => {
      return coursesExams?.filter((course)=>course?.exams)
    }

    console.log('users courses', courses?.data?.courses);

    const columns = [
        {
          title: ("Course"),
          dataIndex: "name",
          key: "name",
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
            title: ("Course"),
            dataIndex: "name",
            key: "name",
            align: alignLeft,
       
          },

          {
            title: ("View "),
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
        //   {
        //     title: ("Course"),
        //     dataIndex: "course_name",
        //     key: "course_name",
        //     align: alignLeft,
       
        //   },
    ]



    return (

        <>
          <div className='w-full h-full overflow-y-auto'>
    <header className='sticky top-0 w-full z-50'>
        <NavBar />
    </header>

    <main className='flex w-full h-full'>
    <aside className='hidden lg:block w-full lg:w-96'>
        <UserDashboardSideBar />
    </aside>

    <section className='flex flex-col w-full p-2'>
                {
                  coursesExams?.length ? (
                    <>
                      <h2 className='text-left text-xl font-semibold text-gray-800 p-2'>
                          Select Course
                      </h2>
                      <div className='flex justify-start '>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 w-full max-w-2xl'>
                              {coursesExams.map(course => (
                                  <animated.button 
                                      key={course?.id} 
                                      onClick={() => router.push(`${router.asPath}/${course?.id}`)}
                                      style={buttonAnimation}
                                      className='flex flex-col items-center justify-center p-3 w-full text-sm text-gray-700 hover:text-blue-600 cursor-pointer hover:shadow-lg rounded shadow border transition-all duration-300'>
                                      {course?.name}
                                  </animated.button>
                              ))}
                          </div>
                      </div>
                    </>
                  ) : <Spinner />
                }
              </section>

    </main>
</div>

        </>
    );
}



  
export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common", "form", "table"])),
    },
  });