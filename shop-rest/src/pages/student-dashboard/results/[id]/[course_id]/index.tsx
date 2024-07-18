import ActionButtons from '@components/common/action-buttons';
import Card from '@components/common/card';
import NavBar from '@components/navbar/NavBar';
import Button from '@components/ui/button';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useCoursesQuery } from '@data/courses/use-courses.query';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { useCourseExamQuery } from '@data/exams/use-exam-course.query';
import { useExamsQuery } from '@data/exams/use-exams.query';
import { useUserAttemptedExamsQuery } from '@data/exams/use-user-attempted-exams.query';
import DateFormatter from '@utils/format-date';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { useSpring, animated } from 'react-spring';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Table from 'rc-table';
import React, { useState } from 'react';
import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';


export default function Exams() {
    
    const {data: courses} = useCoursesQuery();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedExams, setSelectedExams] = useState([]);
    const {openModal} = useModalAction();
    const{data:user} = useCustomerQuery();


    const slideInAnimation = useSpring({
        from: { transform: 'translateX(-100px)', opacity: 0 },
        to: { transform: 'translateX(0)', opacity: 1 },
        config: { duration: 100 },
    });


    // const [courseName, setCourseName] = useState();

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    }

    const { alignLeft } = useIsRTL();
    const router = useRouter();

    const userId = router?.query?.id;
    const courseId = router?.query?.course_id;
     
    

    // const {data: coursesExams} =useCoursesWithExamsAndAttemptsQuery();
    const { data:coursesExams = [] } = useUserAttemptedExamsQuery(userId, courseId);
    console.log('coursesExams', coursesExams)

    const courseName = coursesExams?.course_name;
  
    const {data: exams} = useExamsQuery();


    const checkboxColumn = {
      title: "Select",
      dataIndex: "id",
      key: "checkbox",
      align: alignLeft,
      render: (id) => (
          <input
              type="checkbox"
              checked={selectedExams.includes(id)}
              onChange={() => handleExamSelection(id)}
          />
      )
  };

  function showCombinedResult(data) {
    console.log('combine',data[0])
    // return '';
    openModal('COMBINE_RESULT',{
      examId1: data[0],
      examId2: data[1]
    })
  }

  const handleExamSelection = (examId) => {
    let updatedSelection = [...selectedExams];

    if (updatedSelection.includes(examId)) {
        updatedSelection = updatedSelection.filter(id => id !== examId);
    } else {
        if (updatedSelection.length < 2) {
            updatedSelection.push(examId);
        }
    }
    setSelectedExams(updatedSelection);
};

 

// const showCombinedResult = () => {
//     if (selectedExams.length !== 2) {
//         alert("Please select two exams to see the combined result.");
//         return;
//     }

//     const exam1 = exams.find(exam => exam.id === selectedExams[0]);
//     const exam2 = exams.find(exam => exam.id === selectedExams[1]);

//     // Logic to calculate and display the combined results goes here
// };



  
  
    // console.log('users exams', filterExams()[0]);
    // console.log('coursesExams', coursesExams);

    const columns = [
        checkboxColumn,
        {
            title: "Exam",
            dataIndex: "name",
            key: "name",
            align: alignLeft,
            render: (text) => (
                <span className='text-sm text-gray-700 font-semibold'>
                    {text}
                </span>
            ),
        },
        {
            title: "View Attempts",
            dataIndex: "id",
            key: "actions",
            align: alignLeft,
            render: (id: string, record) => (
                <ActionButtons
                    id={id}
                    detailsUrl={`${router.asPath}/${id}?course=${courseName}`}
                />
            ),
        },
    ];
    
  // return ''
  



    return (
        <>

<div className='w-full h-full overflow-y-auto'>
                <div className='sticky top-0 z-50 bg-white shadow'>
                    <NavBar />
                </div>

                <div className='flex flex-col lg:flex-row items-start justify-start w-full'>

                    <aside className='w-full lg:w-96 p-2'>
                        <UserDashboardSideBar />
                    </aside>
                    <animated.main style={slideInAnimation} className="flex-1 p-2 rounded overflow-hidden">
                    <main className="flex-1 p-2 rounded overflow-hidden">
                        {/* Button to show combined result */}
                        {selectedExams.length === 2 && (
                            <Button onClick={() => showCombinedResult(selectedExams)} variant='normal'>
                                Show Combined Result
                            </Button>
                        )}

                        {/* Header section */}
                        <div className='flex justify-between items-center p-3 border-b border-gray-300'> 
                            <Button onClick={() => router?.back()} variant='normal'>Back</Button>
                            <div className='flex flex-col space-y-3 p-1 font-sans text-gray-800'> 
                                <div className='flex items-center'>  
                                    <span className='text-lg text-gray-900 font-semibold mr-2'>Course:</span>
                                    <span className='text-lg text-gray-600'>{exams && coursesExams?.course_name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Exams list */}
                        <Card className='my-3'>
                            <span className='font-semibold text-lg'>Exams List</span>  
                        </Card>

                        {/* Table of exams */}
                        {coursesExams?.length ? <Spinner /> :
                            <div className='overflow-x-auto'>
                                <Table
                                    //@ts-ignore
                                    columns={columns}
                                    emptyText={("table:empty-table-data")}
                                    //@ts-ignore
                                    data={coursesExams.exams}
                                    rowKey="id"
                                    className='min-w-full'
                                />
                            </div>
                        }
                    </main>
                    </animated.main>


                </div>
            </div>
     
        </>
    );
}

 
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common", "form", "table"])),
    },
  });
