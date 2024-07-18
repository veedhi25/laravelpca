import ActionButtons from '@components/common/action-buttons';
import Card from '@components/common/card';
import AdminLayout from '@components/layouts/admin';
import Button from '@components/ui/button';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useModalAction } from '@components/ui/modal/modal.context';
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
    const [selectedExams, setSelectedExams] = useState([]);
    const {openModal} = useModalAction();


    // const [courseName, setCourseName] = useState();

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    }

    const { alignLeft } = useIsRTL();
    const router = useRouter();

    const {data: coursesExams} =useCoursesWithExamsAndAttemptsQuery();

    // useCourseExamQuery is called at the top level, not inside handleCourseChange
    const {data: examsCourses} = useCourseExamQuery(selectedCourse); 

    const {data: exams, isLoading} = useExamsQuery();

    const filterExams = () => {
       return exams?.filter((exam)=> exam?.course_id == router?.query?.course_id)
    }

    const checkboxColumn = {
      title: "Select",
      dataIndex: "id",
      key: "checkbox",
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
    console.log('users exams', exams);

    const columns = [

      checkboxColumn,
        {
          title: ("Exam"),
          dataIndex: "name",
          key: "name",
          align: alignLeft,
        },
        {
          title: ("Total Questions"),
          dataIndex: "total_questions",
          key: "total_questions",
          align: alignLeft,
          // width: 60,
        },
        {
          title: "Held On",
          dataIndex: "created_at",
          key: "created_at",
          align: alignLeft,
          // width: 60,
          render : (record:any) => {
            console.log('record',record)
            return <DateFormatter dateStr={record}/>
          }
        },
        {
          title: ("View Result"),
          dataIndex: "id",
          key: "actions",
          align: alignLeft,
          // width: 90,
          render: (id: string, record) => (
            <ActionButtons
              id={id}
              detailsUrl={`${router.asPath}/${id}?course=${record?.course_name}&exam=${record?.name}`}
              // deleteModalView="DELETE_TAG"
            />
          ),
        },

    ]



    return (
        <>

      { isLoading ? <Spinner/> : 
      <div className="rounded overflow-hidden  mb-6">

      {selectedExams.length === 2 && (
          <Button onClick={()=>showCombinedResult(selectedExams)} variant='normal'>
              Show Combined Result
          </Button>
      )}

      <div className='flex justify-between items-center p-3 border-b'> 
       <Button onClick={()=>router.push(`/results`)} 
               variant='normal'>Back
       </Button>
       <div className=' flex flex-col space-y-3 p-1 font-sans text-gray-800'> 
         <div className='flex items-center'>  
           <span className='text-gray-900 font-md text-sm'>Course -</span>
           <span className='text-gray-600 font-md text-sm '>{!!exams && filterExams()[0]?.course_name}</span>
         </div>
         
        </div>
     </div>
     <Card className='my-3'>
         <span className='font-semibold'>Exams List</span>  
     </Card>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={("table:empty-table-data")}
          //@ts-ignore
          data={filterExams()}
          rowKey="id"
          className='border'
          scroll={{ x: 1000 }}
       
        />
      </div> }

     
    </>
    );
}



Exams.authenticate = {
    permissions: adminOnly,
  };
  Exams.Layout = AdminLayout;
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common", "form", "table"])),
    },
  });
