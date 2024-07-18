import UserDashboardSideBar from 'src/pages/user-dashboard-sidebar';
import NavBar from '@components/navbar/NavBar';
import { useRouter } from 'next/router';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import React, { useEffect, useMemo, useState } from 'react';
import { useUI } from '@contexts/ui.context';
import { GetServerSideProps } from 'next';
import { parseContextCookie } from '@utils/parse-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useExamsQuery } from '@data/exams/use-exams.query';
 import TablePagination from '@utils/table-pagination';
import { useModalAction } from '@components/ui/modal/modal.context';
import { Eye } from '@components/icons/eye-icon';
import { useUserAttemptedExamsQuery } from '@data/exams/use-user-attempted-exams.query';
import { useUserExamAttemptsQuery } from '@data/exams/use-user-exam-attempts.query';
import DateFormatter from '@utils/format-date';


function extractUniqueStructure(attempts) {
    let result = {};
  
    attempts?.forEach(attempt => {
      attempt?.section_scores?.forEach(section => {
        // If the section does not exist in the result, add it
        if (!result[section.name]) {
          result[section.name] = {};
        }
       console.log('section structure', section)
        // return '';
  
        section?.sub_section?.forEach(subSection => {
          // If the subsection does not exist in the section, add it
          if (!result[section.name][subSection.name]) {
            result[section.name][subSection.name] = new Set();
          }
  
          // Add the question type to the subsection's Set to ensure uniqueness
          result[section.name][subSection.name].add(subSection.question_type.name);
        });
      });
    });
  
    // Convert the Sets into arrays for each subsection
    for (const section in result) {
      for (const subSection in result[section]) {
        result[section][subSection] = Array.from(result[section][subSection]);
      }
    }
  
    return result;
  }

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cookies = parseContextCookie(context?.req?.headers?.cookie);
    if (!cookies?.auth_token) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ["common", "forms"])),
      },
    };
  };

  const Results = () => {

    const { data } = useCustomerQuery();

    const router = useRouter();

    const userId = router?.query?.id;
    const examId = router?.query.exam_id;
    const [isMockValue, setIsMockValue] = useState(0);

    // const [parentEmail, setParentEmail] = useState('');

    const isQueryEnabled = userId && examId;

    const {data:allAttempts } = useUserExamAttemptsQuery(userId,examId, isMockValue);
    // const allAttempts = all_attempts?.answers;
    const handleMockChange = (event) => {
        setIsMockValue(Number(event.target.value));
    };
    
    // console.log('coursesExams', allAttempts)

    const ENTRIES_PER_PAGE = 15;
    // State for current page
    const [currentPage, setCurrentPage] = useState(1);
    const [attemptId, setAttemptId] = useState();

    // Memoize the attempts data to avoid unnecessary re-renders
    // Directly after fetching, sort the allAttempts data
    const reversedAttempts = useMemo(() => {
        if (!allAttempts?.length) return [];
        return [...allAttempts]?.reverse();
    }, [allAttempts]);
    
    const attempts = useMemo(() => {
        // Paginate the reversedAttempts data
        const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
        
        return reversedAttempts?.slice(startIndex, startIndex + ENTRIES_PER_PAGE) ?? [];

    }, [reversedAttempts, currentPage]);

    console.log('attempts all',  allAttempts)
    console.log('attempts reverse', reversedAttempts)
    console.log('attempts attempts', attempts[0])


    // Helper function to determine if a date is "today" or "yesterday"
   const formatDateDisplay = (dateString) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
    
        const inputDate = new Date(dateString);
        
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = inputDate.toLocaleTimeString('en-US', timeOptions);
        
        if (inputDate.toDateString() === today.toDateString()) {
            return `Today, ${formattedTime}`;
        } else if (inputDate.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${formattedTime}`;
        } else {
            return `${inputDate.toLocaleDateString()}, ${formattedTime}`;
        }
    }

    const { openModal } = useModalAction();

    const exam_id = router?.query?.exam_id

  
    
      function handleClick(entry: any) {
        // event.stopPropagation(); 
        console.log('attempts user', entry);
        setAttemptId(entry?.exam_attempt_id);

        entry?.exam_attempt_id && openModal('MARKSHEET_DETAILS', {
        attempt_id: entry?.exam_attempt_id,
        total_marks: entry?.total_marks,
        name: entry?.user_name,
        score: entry?.score,
        total_questions: entry?.total_questions,
        exam_id: exam_id,
      })
    }

         const sectionNames = Array.from(new Set(attempts?.flatMap(entry => Object.keys(entry?.section_scores || {}))));
    const subsectionNames = sectionNames?.reduce((acc, section) => {
        acc[section] = Array.from(new Set(attempts?.flatMap(entry => Object.keys(entry?.section_scores?.[section] || {}))));
        return acc;
    }, {});   

    console.log('subsectionNames',typeof subsectionNames, Array.isArray(subsectionNames), subsectionNames);
   
    
   

    if (!data?.me?.exam_attempts) {
        return (<div className='bg-gray-200 min-h-screen'>
            <div className='mx-auto'>
               <div className='sticky top-0 z-50'>
        <NavBar />
        </div>
                <div className='lg:grid lg:grid-cols-6'>
                    <div className=''>
                        <UserDashboardSideBar className='p-2' />
                    </div>
                    <div className=''><Spinner/></div> 
                </div>
            </div>
            </div>
        );
    }


    const uniqueStructure = extractUniqueStructure(attempts);


    function getDynamicColumns(entry) {
      let columns = [];
      // Loop through each section in the uniqueStructure
      for (const sectionName in uniqueStructure) {
        // Find the corresponding section data from the entry's section_scores
         const sectionData = entry.section_scores.find(s => s.name === sectionName);

        
        if (sectionData) {
          // Loop through each sub-section in the current section
          for (const subSectionName in uniqueStructure[sectionName]) {
            const questionTypes = uniqueStructure[sectionName][subSectionName];
            
            questionTypes.forEach((questionType) => {
              // Find the corresponding sub-section data that matches both subSectionName and questionType
              const questionData = sectionData.sub_section.find(sub => sub.name === subSectionName && sub.question_type.name === questionType);
              
              // If questionData exists, push the marks, otherwise 'N/A'
              columns.push(
                <td className={` ${ questionData?.question_type?.marks > 0 ? 'text-green-700' : !questionData?.question_type?.marks  ? 'text-gray-700' :  'text-red-700'} border border-gray-400 p-2 text-gray-700 text-sm text-center`} key={`${sectionName}-${subSectionName}-${questionType}`}>
                {
                  questionData ? 
                    (questionData.question_type.marks % 1 !== 0 ? Math.ceil(parseFloat(questionData.question_type.marks)) : questionData.question_type.marks)
                    : 'N/A'
                }

                </td>
              );
            });
          }
        } else {
          // If no sectionData was found, fill in the columns for this section with 'N/A'
          const totalSubSections = Object.keys(uniqueStructure[sectionName]).reduce((total, sub) => total + uniqueStructure[sectionName][sub].length, 0);
          for (let i = 0; i < totalSubSections; i++) {
            columns.push(<td className='border border-gray-400 p-2 text-gray-700 text-sm text-center' key={`${sectionName}-N/A-${i}`}>N/A</td>);
          }
        }
      }
      return columns;
    }
    
    
    
    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='sticky top-0 z-50'>
                <NavBar />
            </div>
    
            {/* Adjust the grid layout for smaller screens */}
            <div className='lg:grid lg:grid-cols-6'>
                {/* For smaller screens, the sidebar will take full width */}
                <div className=''>
                    <UserDashboardSideBar  className='p-2' />
                </div>
                
            <div className="flex flex-col col-span-5 p-4 overflow-auto">

                <button onClick={()=>router?.back()} 
                        className='my-2 text-white font-semibold border p-3 px-3 w-20 text-center rounded bg-blue-500'>
                    Back
                </button>

                  <div className='p-3 flex items-center space-x-4'>
                <label>
                    <input
                        type="radio"
                        value={0}
                        checked={isMockValue === 0}
                        onChange={handleMockChange}
                        className='text-gray-600 font-semibold '
                    />
                    Live Attempts
                </label>
                <label>
                    <input
                        type="radio"
                        value={1}
                        checked={isMockValue === 1}
                        onChange={handleMockChange}
                        className='text-gray-600 font-semibold '
                    />
                    Mock Attempts
                </label>
            </div>

            <table className='w-full'>
      <thead>
        <tr className="bg-gray-300 border-gray-600">
          {/* Standard table headers */}
          <th className='border border-gray-400 p-3  text-sm font-semibold' rowSpan="2">Exam Name</th>
          <th className='border border-gray-400 p-3 text-sm font-semibold' rowSpan="2">Score</th>
          <th className='border border-gray-400 p-3 text-sm font-semibold' rowSpan="2">Total Marks</th>
          <th className='border border-gray-400 p-3 text-sm font-semibold' rowSpan="2">Total Questions</th>
          {/* Dynamic section headers */}
          {Object.keys(uniqueStructure).map(sectionName => (
            <th className='border border-gray-400 p-3 text-sm font-semibold'
                key={sectionName}
                colSpan={Object.keys(uniqueStructure[sectionName]).reduce((total, sub) => total + uniqueStructure[sectionName][sub].length, 0)}>
              {sectionName}
            </th>
          ))}
          <th className='border border-gray-400 p-3 text-sm font-semibold' rowSpan="2">Date</th>
          <th className='border border-gray-400 p-3 text-sm font-semibold' rowSpan="2">View Marksheet</th>
        </tr>
        <tr className="border-b border-gray-300">
          {/* Dynamic subsection headers */}
          {Object.entries(uniqueStructure).flatMap(([sectionName, subsections]) =>
            Object.entries(subsections).flatMap(([subSectionName, questionTypes]) =>
              questionTypes.map(questionType => (
                <th key={`${sectionName}-${subSectionName}-${questionType}`} className='border border-gray-400 whitespace-nowrap p-4 text-gray-600 font-semibold text-xs'>
                  {subSectionName} ({questionType})
                </th>
              ))
            )
          )}
        </tr>
      </thead>
      <tbody>
        {/* Map over attempts to create table rows */}
        {attempts.map(entry => (
          <tr className="border-b border-gray-400" key={entry.exam_attempt_id}>
            <td className='border border-gray-400 text-gray-700 whitespace-nowrap p-2 text-sm text-center'>{entry.exam_name}</td>
            <td className={` ${entry.score > 0  ? 'text-green-700 font-semibold' : 'text-red-700'} border border-gray-400   p-2 text-sm text-center`}>{Math.ceil((entry.score))}</td>
            <td className='border border-gray-400 text-gray-700 p-2 text-sm text-center'>{Math.ceil((entry.total_marks))}</td>
            <td className='border border-gray-400 text-gray-700 p-2 text-sm text-center'>{entry.total_questions}</td>
            {getDynamicColumns(entry)}
            <td className='border text-gray-700 font-medium text-center p-3 text-sm border-gray-500'>{formatDateDisplay(entry?.created_at)}</td>
              <td onClick={()=>handleClick(entry)} className='  border text-blue-700 hover:text-blue-900 font-medium underline cursor-pointer text-center p-3 border-gray-500'>view</td>  
          </tr>
        ))}
      </tbody>
    </table>

                <TablePagination
                    totalEntries={allAttempts?.length || 0}
                    entriesPerPage={ENTRIES_PER_PAGE}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
                </div>
            </div>
        );
    
};

export default Results;