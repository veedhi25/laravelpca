import ActionButtons from '@components/common/action-buttons';
import Card from '@components/common/card';
import { Eye } from '@components/icons/eye-icon';
import AdminLayout from '@components/layouts/admin';
import Button from '@components/ui/button';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useModalAction } from '@components/ui/modal/modal.context';
import useExamAttemptsAnswersQuery from '@data/exams/use-exam-attempt-answers.query';
import { fetchExamAttemptsByExamId, useExamAttemptsQuery } from '@data/exams/use-exam-attempts.query';
import useExamStudentsQuery from '@data/exams/use-exam-students.query';
import { useExamQuery } from '@data/exams/use-exam.query';
import { useExamsQuery } from '@data/exams/use-exams.query';
import { adminOnly } from '@utils/auth-utils';
import DateFormatter from '@utils/format-date';
import { useIsRTL } from '@utils/locals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router'
import Table from 'rc-table';
import React, { useMemo, useState } from 'react'
import * as XLSX from 'xlsx';

export default function ExamResult() {
 
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    const [todayBtn, setTodayBtn] = useState(false);
    const [isMockValue, setIsMockValue] = useState(0);


    const [yesterdayBtn, setYesterDayBtn] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectedAttempts, setSelectedAttempts] = useState([]);
    
    // const [todayBtn, setTBtn] = useState(false)

    const exam_id = router?.query?.exam_id
    const course_id = router.query.course_id
    console.log('router query', router.query.course_id)

    const { data: apiResponse, isLoading } = useExamAttemptsQuery(exam_id, currentPage, isMockValue);
    const attempts = apiResponse?.data || [];

     console.log("apiResponse" , apiResponse)

    const handleMockChange = (event) => {
      setIsMockValue(Number(event.target.value));
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (recordKey) => {
    if (selectedRows.includes(recordKey)) {
        setSelectedRows(prevRows => prevRows.filter(item => item !== recordKey));
    } else {
        setSelectedRows(prevRows => [...prevRows, recordKey]);
    }
};
  
    console.log('router',router?.query);

    const [dateFilter, setDateFilter] = useState(null);
    const [customDate, setCustomDate] = useState(null);

    const roundIfDecimal = (value) => {
      if (Number.isInteger(value)) {
          return value;
      }
      return Math.floor(value);
  }
  
  

const handleFilterToday = () => {
  setDateFilter('today');
  setCustomDate(null);
  setTodayBtn(true);
  setYesterDayBtn(false);
};

const handleFilterYesterday = () => {
  setDateFilter('yesterday');
  setCustomDate(null);
  setTodayBtn(false);
  setYesterDayBtn(true);
};

const handleCustomDateFilter = (date) => {
  setCustomDate(date);
  setDateFilter('custom');
};

const clearFilters = () => {
  setDateFilter(null);
  setCustomDate(null);
  setTodayBtn(false);
  setYesterDayBtn(false);
};


const memoizedExamAttempts = useMemo(() => {
  let filteredAttempts = attempts;

  if(dateFilter === 'today') {
      filteredAttempts = attempts?.filter(attempt => 
          new Date(attempt.created_at).toDateString() === new Date().toDateString()
      );
  } else if(dateFilter === 'yesterday') {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      filteredAttempts = attempts?.filter(attempt =>
          new Date(attempt.created_at).toDateString() === yesterday.toDateString()
      );

  } else if(dateFilter === 'custom' && customDate) {
      filteredAttempts = attempts?.filter(attempt =>
          new Date(attempt.created_at).toDateString() === new Date(customDate).toDateString()
      );
  }

  // Sorting the filtered attempts by created_at in descending order
  return filteredAttempts?.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

}, [attempts, dateFilter, customDate]);



    const { alignLeft } = useIsRTL();
    const [attemptId, setAttemptId] = useState();                                        

    const { openModal } = useModalAction();

    const getAllUniqueSectionsAndSubSections = () => {
      let uniqueSections = new Set();
      let uniqueSubSections = {};
      let uniqueQuestionTypes = {};
  
      attempts?.forEach(attempt => {
          attempt.section_scores?.forEach(sectionObj => {
              uniqueSections.add(sectionObj.name);
              sectionObj.sub_section?.forEach(subSectionObj => {
                  if(!uniqueSubSections[sectionObj.name]) {
                      uniqueSubSections[sectionObj.name] = new Set();
                      uniqueQuestionTypes[sectionObj.name] = {};
                  }
                  uniqueSubSections[sectionObj.name].add(subSectionObj.name);
                  uniqueQuestionTypes[sectionObj.name][subSectionObj.name] = subSectionObj.question_type.name;
              });
          });
      });
  
      return { uniqueSections: [...uniqueSections], uniqueSubSections, uniqueQuestionTypes };
  };
  
  const generateSectionColumns = () => {
      const { uniqueSections, uniqueSubSections, uniqueQuestionTypes } = getAllUniqueSectionsAndSubSections();
  
      return uniqueSections.map(section => {
          const subSections = Array.from(uniqueSubSections[section] || []);
  
          const childColumns = subSections?.map(subSection => {
              const questionType = uniqueQuestionTypes[section][subSection];
  
              return {
                  title: <span className="text-xs font-semibold text-gray-600">{subSection}</span>,
                  children: [
                      {
                          title: questionType,
                          dataIndex: ['section_scores', section, subSection, questionType],
                          key: `${section}_${subSection}_${questionType}`,
                          align: alignLeft,
                          render: (text, record) => {
                              const marks = record.section_scores?.find(s => s.name === section)?.sub_section?.find(ss => ss.name === subSection)?.question_type?.marks;
                              const is_attempted = record.section_scores?.find(s => s.name === section)?.sub_section?.find(ss => ss.name === subSection)?.question_ids?.length;

                              return <span className={`border-l border-gray-400 px-6 ${marks ? (marks > 0 ? 'text-green-500' : 'text-red-500') : 'text-gray-500'}`}>
                                  {is_attempted ? roundIfDecimal(marks) : 'N/A'}
                              </span>;
                          }
                      }
                  ]
              };
          });
  
          return {
              title: <span className="font-semibold text-gray-800 py-2 bg-gray-100 border-b border-gray-400">{section}</span>,
              key: section,
              align: alignLeft,
              children: [
                  {
                      title: <span className="text-xs border-gray-400 py-2 px-3 border-l font-semibold w-20 text-gray-600 bg-gray-200">Total</span>,
                      dataIndex: ['section_scores', section],
                      key: `${section}_total`,
                      align: alignLeft,
                      render: (text, record) => {
                          const marks = record.section_scores?.find(s => s.name === section)?.marks;
                          return <span className={`border-l border-gray-400 px-6 ${marks ? (marks > 0 ? 'text-green-500' : 'text-red-500') : 'text-gray-500'}`}>
                               {(marks !== null && marks !== undefined) ? roundIfDecimal(marks) : '0'}
                          </span>;
                      }
                  },
                  ...childColumns
              ]
          };
      });
  };

  async function fetchAllExamAttempts(examId) {
    let allResults = [];
    let currentPage = 1;
    let lastPage = 1; // Initialize to 1

    do {
      const response = await fetchExamAttemptsByExamId(examId, currentPage, 0);
      console.log(`Page ${currentPage} Response:`, response); // Log the response

      // Update the lastPage based on the response
      lastPage = response.last_page || 1;

      allResults = [...allResults, ...response.data];

      currentPage += 1;
    } while (currentPage <= lastPage);

    console.log("All fetched results:", allResults); // Log all the fetched results
    return allResults;
}


  const rankStudents = (students) => {
    // Sort students based on score in descending order
    const sortedStudents = [...students].sort((a, b) => b.Score - a.Score);
    
    // Assign rank based on score
    let rank = 1;
    for (let i = 0; i < sortedStudents.length; i++) {
      if (i > 0 && sortedStudents[i].Score < sortedStudents[i - 1].Score) {
        rank++;
      }
      sortedStudents[i].Rank = rank;
    }
  
    return sortedStudents;
  };
    

  const downloadAsExcel = (dataToDownload) => {
    const transformedData = transformDataForExcel(dataToDownload);
    const rankedData = rankStudents(transformedData); // Rank students by score
    console.log("Ranked Data for Excel:", rankedData);
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rankedData, { skipHeader: false });
    
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "exam_results.xlsx");
  };


  async function handleDownload() {
    setLoading(true); // Set loading state to true at the start
    const allEntries = await fetchAllExamAttempts(router?.query?.exam_id);
    downloadAsExcel(allEntries); // Pass the allEntries to the downloadAsExcel function
    setLoading(false); // Set loading state back to false once done
}

const transformDataForExcel = (data) => {
  const transformed = data?.map(student => {
      const output = {
          Rank: student.rank,
          Name: student.user_name,
          'Total Marks': roundIfDecimal(student.total_marks),
      };

      let totalScore = 0; // Initialize total score

      const { uniqueSections, uniqueSubSections } = getAllUniqueSectionsAndSubSections();
      
      uniqueSections.forEach(sectionName => {
          const sectionObj = student?.section_scores?.find(sec => sec.name === sectionName);
          const sectionMarks = sectionObj?.marks || 0;
          output[sectionName] = roundIfDecimal(sectionMarks);
          totalScore += sectionMarks; // Add section marks to total score

          (uniqueSubSections[sectionName] || []).forEach(subSectionName => {
              const subSectionObj = sectionObj?.sub_section?.find(subSec => subSec.name === subSectionName);
              output[subSectionName] = roundIfDecimal(subSectionObj?.marks || 0);
          });
      });

      // Set the calculated total score
      output.Score = roundIfDecimal(totalScore);
      
      return output;
  });
  return transformed;
};



const excelMemoizedExamAttempts = transformDataForExcel(attempts);

console.log('excel attempts',  transformDataForExcel(attempts))
  
 
  const sectionColumns = generateSectionColumns();
  

  const calculateTotalScore = (record) => {
    return record.section_scores.reduce((acc, section) => acc + section.marks, 0);
};

  // const sectionColumns = generateSectionColumns();
  
    function handleClick(e,record: any) {
        // e.stopPropagation();
        console.log('attempts user', record);
        setAttemptId(record?.exam_attempt_id);

   record?.exam_attempt_id &&  openModal('RESULT_TABLE', {
        attempt_id: record?.exam_attempt_id,
        total_marks: record?.total_marks,
        name: record?.user_name,
        score: record?.score,
        total_questions: record?.total_questions,
        exam_id: exam_id,
      })
    }
    // const {data: examAttempts} = useExamAttemptsAnswersQuery(attemptId);
    // console.log('record', attempts?.length);
    // @ts-ignore
    const toggleRowSelection = (id) => {
      setSelectedRows((prevSelectedRows) => {
        if (prevSelectedRows.includes(id)) {
          // If already selected, remove it from the selection
          return prevSelectedRows.filter((selectedId) => selectedId !== id);
        } else {
          // Otherwise, add it to the selection
          return [...prevSelectedRows, id];
        }
      });
    };
    const createMessageForAttempt = (attempt) => {
      // Greeting and exam name
      let message = `Dear Student/Parent,\n\nWe are pleased to share the results for:\n*${attempt.exam_name}*\n\n`;
    
      // Total score
      message += `*Name:* ${attempt?.user_name}\n\n`;
      message += `*Total Question:* ${attempt?.total_questions}\n\n`;
      message += `*Total Score:* ${attempt?.score}/${attempt?.total_marks.split('.')[0]}\n\n`;
     
      // Section-wise details
      message += `Here's the section-wise performance:\n\n`;
      attempt.section_scores.forEach((section) => {
        message += `*${section.name}:* ${section.marks}\n`;
        // Sub-section details
        if (section.sub_section && section.sub_section.length > 0) {
          section.sub_section.forEach((sub) => {
            message += `   - ${sub.name} (${sub.question_type.name}): ${sub.marks}\n`;
          });
        }
        message += '\n';  
      });
    
      // Additional information
      message += `For a detailed report and analytics, please visit the student dashboard:\nhttps://pca.buylowcal.com/results/${attempt?.user_id}/${course_id}/${exam_id}\n\n`;
      message += `Best regards,\nPatanjali Career Academy`;
    
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
    
      // Return the complete WhatsApp link
      return `https://web.whatsapp.com/send?phone=${attempt.parents_phone_number}&text=${encodedMessage}`;
    };
    
    const handleSendMessage = (attempt) => {
      // Create the message for the single attempt
      const messageLink = createMessageForAttempt(attempt);
      
      // Open the WhatsApp Web link for the single attempt
      window.open(messageLink, '_blank');
    };
    
    // Use the same createMessageForAttempt function as before
    
    
    
    

    

    const onCheckboxChange = (attempt) => {
      setSelectedAttempts([attempt]);
    };

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
    
    

    
    

    const columns = [

      {
        title: '',
        key: 'action',
        render: (record) => {
          return (
            <button 
            className='shadow-lg whitespace-nowrap text-xs font-semibold  bg-green-600 hover:bg-green-700 transition-all duration-200 text-white p-2 px-4 rounded-lg flex items-center justify-center gap-2'
            onClick={()=>handleSendMessage(record)}
            title=" Send result to Parents"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4" /> {/* Adjust the path as necessary */}
            Send Result
         </button>
              );
            },
      },
      
          {
           title: ("Name"),
           dataIndex: "user_name",
           key: "user_name",
           align: alignLeft,
          },
          {
            title: "Total Score",
            key: "total_score",
            align: alignLeft,
            render: (text, record) => {
                const score = calculateTotalScore(record);
                const roundedScore = Math.ceil(parseFloat(score));
                const scoreClass = score > 0 ? 'text-green-600' : 'text-red-600';
                return <span className={scoreClass}>{roundedScore}</span>;
            }
        },
        

           ...sectionColumns,

          {
            title: <button className='text-center font-semibold text-gray-700 border-l border-gray-700 border-r py-10 w-full'>Date</button>,
            dataIndex: "created_at",
            key: "created_at",
            align: alignLeft,
            render : (record:any) => {
              console.log('record',record)
              return <span className='whitespace-nowrap'> {formatDateDisplay(record)}</span>
            }
          },

          {
            title: "Marksheet",
            dataIndex: "total_questions",
            key: "total_questions",
            align: alignLeft,
            // width: 60,
            render: (text, record, index) => {
              return <Eye className='cursor-pointer' onClick={(e) => { 
                // e.stopPropagation(); // stop the event propagation
                handleClick(e,record); 
              }} width={24} />;
            }
          },
    ]


  return (

    <div className="relative rounded overflow-hidden mb-6">
     
     <div className='flex justify-between items-center p-3 border-b '> 
       
       <Button onClick={()=>router.push(`/results/${router?.query?.course_id}`)} 
               variant='normal'>Back
       </Button>

  

      

        <div className=' flex flex-col space-y-3 p-1 font-sans text-gray-800'> 
          <div className='flex items-center'>  
            <span className='text-gray-900 w-16 font-md text-sm'>Course -</span>
            <span className='text-gray-600 font-md text-sm '>{router?.query?.course}</span>
          </div>
          <div className='flex items-center'>
            <span className='text-gray-900 w-16 font-md text-sm'>Exam - </span>
            <span className='text-gray-600 font-md text-sm'>{router?.query?.exam}</span>
          </div>
        </div>
     </div>

     
     <Card className='flex items-center justify-between font-semibold'>
      Exam Attempts
      
        <div className="flex space-x-4 mb-4">
            <button onClick={handleFilterToday} className={`border rounded px-4 text-sm ${todayBtn ? 'bg-gray-100' : ''} active:bg-gray-100`}>Today</button>
            <button onClick={handleFilterYesterday} className='border rounded px-4 text-sm active:bg-gray-100'>Yesterday</button>
            <input 
                type="date" 
                onChange={(e) => handleCustomDateFilter(e.target.value)} 
                value={customDate || ''}
                className="border rounded p-2"
            />
            <Button onClick={clearFilters} variant="normal">Clear Filters</Button>
        </div>
     </Card>
     <button 
      className='text-gray-800 p-3 text-sm rounded border my-2 hover:bg-gray-200 shadow-lg' 
      onClick={handleDownload} 
      variant="normal" 
      disabled={loading} // Disable the button while loading
    >
        {loading ? 'Downloading...' : 'Download Result'}
    </button>
         
     <div className='w-full shadow-lg border p-2'>   
        {isLoading ? (
            <Spinner />   
        ) : (
            <>
                <Table
                  data= {memoizedExamAttempts}
                  columns={columns}
                  rowKey="id"
                  scroll={{ x: 1000 }}
                  onRow={(record) => ({
                  })}
                />

                <Pagination 
                    entriesPerPage={entriesPerPage}
                    totalEntries={apiResponse?.total || 0}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={apiResponse?.last_page || 1}
                />
            </>
        )}
    </div>
       
    </div>
  )
}


 function Pagination({ entriesPerPage, totalEntries, paginate, currentPage , totalPages }: any) {
  const pageNumbers = [];

  console.log('records entriesPerPage',entriesPerPage,)
  console.log('records totalEntries', totalEntries)
  console.log('records paginate', paginate)
  console.log('records currentPage',currentPage)

  // for (let i = 1; i <= (totalEntries / entriesPerPage); i++) {
  for (let i = 1; i <= totalPages ; i++) {
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

ExamResult.authenticate = {
    permissions: adminOnly,
  };
  ExamResult.Layout = AdminLayout;
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common", "form", "table"])),
    },
  });
