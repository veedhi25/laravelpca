import { useExamsQuery } from "@data/exams/use-exams.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Table from "rc-table";
import React, { useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useUsersQuery } from "@data/user/use-users.query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useExamAttemptsAnswersQuery from "@data/exams/use-exam-attempt-answers.query";
import ResultPdf from "@components/pdf-format/resultpdf";
import { useExamQuery } from "@data/exams/use-exam.query";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Spinner from "@components/ui/loaders/spinner/spinner";


// import { motion } from 'framer-motion';

function MarksheetDetails( {data} ) {

  console.log("sauravdata " , data)
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 300; 

  const { data: exam_Attempts , isLoading } = useExamAttemptsAnswersQuery(data?.attempt_id);
  const examAttempts = exam_Attempts?.answers;
  
  console.log('attempts', examAttempts);

  const [sectionFilter, setSectionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownloadTime = () => {
    setLoading(true);

    // Simulate a delay for PDF generation/download (replace this with your actual PDF generation logic)
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Replace 3000 with the time it takes to generate the PDF

    // In the actual code, replace the setTimeout with your PDF generation logic.
  };

  const {data:exam} = useExamQuery(data?.exam_id);

  const questions = exam?.questions;

  console.log('examsheet', questions)


  const allAttempts = useMemo(() => {
    const orderedAttempts = [];

    // Iterate over all questions
    questions?.forEach(question => {
        // Check if the current question is in examAttempts
        const attempted = examAttempts?.find(attempt => attempt.question.id === question.id);

        // If the question was attempted, push the attempt
        if (attempted) {
            orderedAttempts.push(attempted);
        }
        // If not, add a dummy attempt
        else {
            orderedAttempts.push({
              question: question,
              question_subSection: question.question_subSection, // Assuming the property is named subSection in the question object.
              selected_options: [],
              answer_text: null,
              is_correct: false,
              status: 'N/A',
              timeSpent: 'N/A', // This will handle the time issue for unattempted questions.
            });
        }
    });

    return orderedAttempts;
}, [examAttempts, questions]);

// console.log("saurav allAttempts" , allAttempts)
// console.log("saurav sectionFilter " , typeFilter)
// console.log("saurav statusFilter " , statusFilter)
// console.log("saurav examAttempts before" , examAttempts)


const filteredAttempts = useMemo(() => {
  console.log("saurav allAttempts" , allAttempts)
  return allAttempts?.filter(attempt => {
    // console.log("saurav examAttempts before" , attempt)
    // Filter by section if sectionFilter is set
    if (sectionFilter && attempt?.question?.section?.id !== sectionFilter) {
    console.log("saurav sectionFilter")

      return false;
    }
    // Filter by question type if typeFilter is set
    if (typeFilter && attempt?.question?.question_type?.id !== typeFilter) {
      console.log("saurav typeFilter")
      return false;
    }
    // Filter by correct/incorrect status if statusFilter is set
    if (statusFilter) {
      console.log("saurav statusFilter")
      if (statusFilter === "correct" && !attempt.is_correct) {
        return false;
      } else if (statusFilter === "incorrect" && attempt.is_correct) {
        return false;
      }
    }
    console.log("saurav simple")
    return true;
  });
}, [examAttempts, sectionFilter, typeFilter, statusFilter , allAttempts]);

console.log("saurav filter" , filteredAttempts)
 
  // Memoize examAttempts
  const memoizedExamAttempts = useMemo(() => {
    // Calculate the indices for slicing the filteredAttempts array
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    // Slice the array to get only the entries for the current page
    return filteredAttempts?.slice(indexOfFirstEntry, indexOfLastEntry);
}, [filteredAttempts, currentPage, entriesPerPage]);

const sections = useMemo(() => {
  // Extract unique sections from examAttempts
  const uniqueSections = Array.from(new Set(examAttempts?.map(attempt => attempt.question?.section?.name)));
  return uniqueSections.map(sectionName => ({
    id: examAttempts?.find(attempt => attempt?.question?.section?.name === sectionName).question?.section?.id,
    name: sectionName
  }));
}, [examAttempts]);

const questionTypes = useMemo(() => {
  // Extract unique question types from examAttempts
  const uniqueTypes = Array.from(new Set(examAttempts?.map(attempt => attempt?.question?.question_type?.type)));
  return uniqueTypes?.map(typeName => ({
    id: examAttempts?.find(attempt => attempt?.question?.question_type?.type === typeName).question?.question_type?.id,
    type: typeName
  }));
}, [examAttempts]);



  // function timeConverter (time) {
  //   return  time > 60 &&  time/60 + ''+ 'minutes'
  // }

  //convert the seconds to minuted if time is grater than 60
  const timeConverter =(seconds)=>{
    let minutes=Math.floor((seconds % 3600)/60).toString();
    let sec=(seconds%60).toFixed().padStart(2,'0');
    return `${minutes}:${sec}`;
    };
 

    function getOptionLabel(options, optionId) {
      const index = options.findIndex(opt => opt.id === optionId);
      return String.fromCharCode(97 + index); // 97 is ASCII code for 'a'
    }

    const getAnswerStatus = (questionAttempt) => {
      if (questionAttempt?.question?.question_type?.type === "MCQ" || 
          questionAttempt?.question?.question_type?.type === "Comprehension") {
          const correctOptionIds = questionAttempt?.question.correct_options.map(opt => opt.id);
          const selectedOptionIds = questionAttempt?.selected_options.map(opt => opt.id);
  
          if (correctOptionIds.every(id => selectedOptionIds.includes(id)) && 
              selectedOptionIds.every(id => correctOptionIds.includes(id))) {
              return 'Correct';
          }
          return 'Incorrect';
      } else if (questionAttempt?.question?.question_type?.type === "Multiple Correct") {
          const correctOptionIds = questionAttempt?.question.correct_options.map(opt => opt.id);
          const selectedOptionIds = questionAttempt?.selected_options.map(opt => opt.id);
          
          if (selectedOptionIds.length === 0) {
              return 'Unattempted';
          }
          if (correctOptionIds.every(id => selectedOptionIds.includes(id)) && 
              selectedOptionIds.every(id => correctOptionIds.includes(id))) {
              return 'Correct';
          } else if (selectedOptionIds.some(id => correctOptionIds.includes(id)) && 
                     selectedOptionIds.every(id => correctOptionIds.includes(id))) {
              return 'Partially Correct';
          }
          return 'Incorrect';
      } else if (questionAttempt?.question?.question_type?.type === "Integer") {
          const correctAnswers = Object.values(
              typeof questionAttempt?.question.correct_answer === 'string' 
              ? JSON.parse(questionAttempt?.question.correct_answer)
              : questionAttempt?.question.correct_answer || {}
          );
          return correctAnswers.some(ans => parseFloat(ans) === parseFloat(questionAttempt.answer_text)) ? 'Correct' : 'Incorrect';
      }
  
      return 'Incorrect'; // Default
  }
  


const Correct = useMemo(() => {
  return allAttempts.filter(attempt => getAnswerStatus(attempt) === 'Correct').length;
}, [allAttempts]);

const inCorrect = useMemo(() => {
  return examAttempts?.filter(attempt => getAnswerStatus(attempt) === 'Incorrect').length || 0;
}, [examAttempts]);

const attemptedCount = useMemo(() => {
  return examAttempts?.length;
}, [examAttempts]);

const unattemptedCount = allAttempts.length - attemptedCount;


console.log("Correct:", Correct);
console.log("Incorrect:", inCorrect);
console.log("Attempted:", attemptedCount);
console.log("Unattempted:", unattemptedCount);




  // if(!examAttempts || !exam || !filteredAttempts) return<div className="w-20 h-20"><Spinner showText={false} /></div> 
  if(!examAttempts || !exam || !filteredAttempts) return <div className="bg-white w-screen h-screen"><Spinner /></div>

  function timeStringToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function getTotalTime(sections) {
    return sections.reduce((total, section) => total + timeStringToSeconds(section.time), 0);
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hours = h > 0 ? `${h}:` : '';
    const minutes = m < 10 ? `0${m}` : m;
    const secs = s < 10 ? `0${s}` : s;

    return `${hours}${minutes}:${secs}`;
}
    

  return (  
    
     <div className=' w-full overflow-x-scroll bg-white'>
      
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.2, duration: 0.1 }} 
      className="p-8 bg-white w-screen h-full"
      
    >
      <div>
      <button onClick={handleDownloadTime} className='text-gray-800 p-3 text-sm rounded border my-2  hover:bg-gray-200 shadow-lg ' variant="normal"><PDFDownloadLink document={<ResultPdf data={data } total_time_taken={exam_Attempts?.sectionWiseTime} attemptedCount={attemptedCount} Correct={Correct} inCorrect={inCorrect}  memoizedExamAttempts={memoizedExamAttempts}  getAnswerStatus={getAnswerStatus}  currentPage={currentPage}  entriesPerPage={entriesPerPage} getOptionLabel={getOptionLabel}  timeConverter={timeConverter}/>}
      fileName={`${data?.name}_result.pdf`}
      > { loading ? 'Downloading.....' : "Download Marksheet"  } </PDFDownloadLink></button>
      <div>
      {/* <PDFDownloadLink document={<ResultPdf data={data } attemptedCount={attemptedCount} Correct={Correct} inCorrect={inCorrect}  memoizedExamAttempts={memoizedExamAttempts}  getAnswerStatus={getAnswerStatus}  currentPage={currentPage}  entriesPerPage={entriesPerPage} getOptionLabel={getOptionLabel}  timeConverter={timeConverter}/>}> Download New pdf </PDFDownloadLink> */}
      
      </div>
    </div>
    <div className='p-3'>
      <h1 className="text-xl font-md mb-4 ">
          Marksheet:
      </h1>
      <span className='flex items-center text-sm '>Name: <p className='ml-3 text-sm text-gray-600'> {data?.name}</p></span>
      <div className="mb-4 p-2">
        <div className='border-gray-300 my-1 rounded  p-2'>
          <strong>Score Card</strong>
            
        </div>
         
        <div className='border-gray-300 my-1 rounded  text-sm m p-2'>
          Total Question: <span className='text-gray-600 font-md'>{data?.total_questions || 90}</span>
        </div>
        <div className='border-gray-300 my-1 rounded  text-sm  p-2'>
          Total Attempted: <span className='text-gray-600 font-md'>{attemptedCount|| 0}</span>
        </div>
        {/* <div className='border-gray-300 my-1 rounded  text-sm  p-2'>
          Correct Value/ Option: <span className='text-gray-600 font-md'>{counts?.correct || 0}</span>
        </div> */}
        <div className='border-gray-300 my-1 rounded  text-sm  p-2'>
          Correct Answers: <span className='text-gray-600 font-md'>{Correct || 0}</span>
        </div>
        <div className='border-gray-300 my-1 rounded  p text-sm p-2'>
          Incorrect Answers: <span className='text-gray-600 font-md'>{inCorrect || 0}</span>
        </div>
        <div className='border-gray-300 my-1 rounded  p text-sm p-2'>
          Total time taken(hr:mn:sec):
            <span className='text-gray-700 font-md'>
                {exam_Attempts?.sectionWiseTime && 
                    <div>
                        {formatTime(getTotalTime(exam_Attempts.sectionWiseTime))}
                    </div>
                }
                </span>
        </div>
        <div className='border-gray-300 my-1 rounded p text-sm p-2'>
            Section Time :
            <span className='text-gray-700 font-md'>
               
                {exam_Attempts?.sectionWiseTime?.map((section, index) => 
                    <div key={index}>
                        <strong>{section.sectionName}:</strong> {section.time}
                    </div>)
                }
            </span>
        </div>
        <div className='border border-gray-300 my-1  text-sm rounded  p-2'>
          Score: <span className='text-gray-600 font-md'>{data?.score || 0}</span>
        </div>
      </div>
      {/* <span className='text-gray-600 text-sm my-2'>Filters:</span> */}
      <div className="mb-4 p-2 flex">
         {/* <select onChange={e => setSectionFilter(e.target.value)} className="mr-4">
          <option value="">All Sections</option>
           {sections.map(section => (
            <option value={section.id}>{section.name}</option>
          ))}
        </select>
        
         <select onChange={e => setTypeFilter(e.target.value)} className="mr-4">
          <option value="">All Types</option>
           {questionTypes.map(type => (
            <option value={type.id}>{type.type}</option>
          ))}
        </select> */}
        
        {/* Correct/Incorrect filter */}
        {/* <select onChange={e => setStatusFilter(e.target.value)} className="mr-4">
          <option value="">All Status</option>
          <option value="correct">Correct</option>
          <option value="incorrect">Incorrect</option>
        </select> */}
      </div>
      {/* <span className='text-grtay-600 text-sm my-2'>Attempted questions</span> */}
      <table className="min-w-full table-auto font-sans ">
    <thead className="justify-between">
      <tr className="bg-gray-800 text-white">
        <th className="py-2 px-4 border  text-sm ">Question No</th>
        <th className='py-2 px-4 border  text-sm '>Section</th>
        <th className='py-2 px-4 border  text-sm '>Sub Section</th>
        <th className='py-2 px-4 border  text-sm '>Question Type</th>
        <th className="py-2 px-4 border  text-sm ">Selected Option id / Answer Value</th>
        <th className="py-2 px-4 border  text-sm ">Correct Answer Value / Option</th>
        <th className="py-2 px-4 border  text-sm ">Time Spent</th>
        <th className="py-2 px-4 border  text-sm ">Status</th>
      </tr>
    </thead>

    <tbody>
      {
          memoizedExamAttempts && memoizedExamAttempts
          .filter(question => !(question?.answer_text === null && question?.option_id === 0))
          .map((questionAttempt, index) => {
            const status = questionAttempt.status === 'N/A' ? 'N/A' : getAnswerStatus(questionAttempt);

            return (
              <tr key={index} className={`  ${questionAttempt.status === 'N/A' ? 'bg-gray-200 font-light ' : 'bg-gray-50 text-black hover:bg-gray-200'}`}>

                      <td className='py-2 px-4 border text-sm text-gray-800'>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                      <td className='py-2 px-4 border text-sm text-gray-800'>{questionAttempt?.question?.section?.name}</td>
                      <td className='py-2 px-4 border text-sm whitespace-nowrap text-gray-800 '>{questionAttempt?.question_subSection}</td>
                      <td className='py-2 px-4 border text-sm text-gray-800'>{questionAttempt?.question?.question_type?.type}</td>
                      <td className='py-2 px-4 border text-sm text-gray-800'>
                        {
                          questionAttempt.status === 'N/A' 
                          ? 'N/A' 
                          : questionAttempt.answer_text || questionAttempt.selected_options.map(opt => getOptionLabel(questionAttempt.question.options, opt.id)).join(', ')
                        }
                      </td>

                      <td className='py-2 px-4 border text-sm text-gray-800 '>
                          {
                              questionAttempt?.question.correct_options?.length 
                              ? questionAttempt?.question.correct_options.map(opt => getOptionLabel(questionAttempt?.question?.options, opt.id)).join(', ')
                              : typeof questionAttempt?.question.correct_answer === 'string' 
                                  ? Object.values(JSON.parse(questionAttempt?.question.correct_answer)).join(', ')
                                  : Object.values(questionAttempt?.question.correct_answer || {}).join(', ')
                          }
                      </td>
                      <td className="py-2 px-4 border text-sm text-gray-800  text-right">
                            {questionAttempt.timeSpent === 'N/A' ? 'N/A' : timeConverter(questionAttempt?.timeSpent)}
                        </td>
                        <td className="py-2 px-4 border text-sm text-gray-800 ">
                            {status === 'Correct' ? <span className="text-green-600 font-semibold">Correct</span> :
                            status === 'Partially Correct' ? <span className="text-yellow-600">Partially Correct</span> :
                            status === 'Incorrect' ? <span className="text-red-500">Incorrect</span> :
                            <span className="font-light">N/A</span>}
                        </td>


                  </tr>
                );
              })
      }
    </tbody>


  </table>

   
    {/* <Pagination
    entriesPerPage={entriesPerPage}
    // Updated totalEntries to examAttempts length
    totalEntries={examAttempts?.length || 0}
    paginate={(pageNumber) => setCurrentPage(pageNumber)}
    currentPage={currentPage}

    
  /> */}

</div>
    </motion.div>
    

    </div>
  );
};

 function Pagination({ entriesPerPage, totalEntries, paginate, currentPage }: any) {
  const pageNumbers = [];

  console.log('records entriesPerPage',entriesPerPage,)
  console.log('records totalEntries', totalEntries)
  console.log('records paginate', paginate)
  console.log('records currentPage',currentPage)

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center mt-4">
      <ul className="flex items-center space-x-8 pagination">
        {pageNumbers.map(number => (
         <div className='flex items-center space-x-2'> 
          <li key={number} className=" page-item">
              {/* Updated the onClick to include event parameter */}
              <a
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior of a tag
                  paginate(number);
                }}
                href="#"
                className={number === currentPage ? 'page-link active text-green-500 border border-gray-400 p-1.5 rounded  shadow-xl' : ' text-gray-700 font-semibold page-link'}
              >
                {number}
              </a>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
}

export default MarksheetDetails;



  
//   export const getStaticProps = async ({ locale }: any) => ({
//     props: {
//       ...(await serverSideTranslations(locale, ["form", "common", "table"])),
//     },
//   });
