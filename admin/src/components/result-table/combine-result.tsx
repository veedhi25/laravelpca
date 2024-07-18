import Spinner from '@components/ui/loaders/spinner/spinner';
import { useModalAction } from '@components/ui/modal/modal.context';
import { fetchExamAttemptsByExamId } from '@data/exams/use-exam-attempts.query';
import React, { useEffect, useState } from 'react';

export default function CombineResult({ data }) {
  const [combinedResults, setCombinedResults] = useState([]);
  const [sectionNames, setSectionNames] = useState([]);
  const [examNames, setExamNames] = useState({}); // New state for storing exam names
  const [loading, setLoading] = useState(false);

  const [examName1, setExamName1] = useState('Exam1');
  const [examName2, setExamName2] = useState('Exam2');

const {closeModal} = useModalAction();

const cache = {};

const fetchAllPages = async (examId) => {
  let allAttempts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchExamAttemptsByExamId(examId, page, 0);
      if (response && response.data) {
        allAttempts = [...allAttempts, ...response.data];
        hasMore = !!response.next_page_url;
        page += 1;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching data for examId ${examId}:`, error);
      hasMore = false;
      break; // Optionally, handle the error as needed
    }
  }

  return allAttempts;
};



  
  
  
  
  
  console.log('combined', combinedResults)

  const getLatestAttempts = (attempts) => {
    const latest = {};
    attempts?.forEach(attempt => {
      const existing = latest[attempt.user_id];
      if (!existing || new Date(attempt.created_at) > new Date(existing.created_at)) {
        latest[attempt.user_id] = attempt;
      }
    });
    return Object.values(latest);
  };
  
  const combineResults = (attempts1, attempts2) => {
    const combined = {};
  
    const processAttempt = (attempt, paper) => {
      if (!combined[attempt.user_id]) {
        combined[attempt.user_id] = {
          user_id: attempt.user_id,
          user_name: attempt.user_name,
          total_marks: {},
          section_scores: {}
        };
      }
  
      combined[attempt.user_id].total_marks[paper] = parseFloat(attempt.total_marks);
      attempt.section_scores.forEach(section => {
        if (!combined[attempt.user_id].section_scores[section.name]) {
          combined[attempt.user_id].section_scores[section.name] = {};
        }
        combined[attempt.user_id].section_scores[section.name][paper] = section.marks;
      });
    };
  
    attempts1.forEach(attempt => processAttempt(attempt, 'paper1'));
    attempts2.forEach(attempt => processAttempt(attempt, 'paper2'));
  
    return Object.values(combined);
  };

  const processAttempts = (attempts1, attempts2) => {
    // Extract the latest attempts for both exams
    const latestAttempts1 = getLatestAttempts(attempts1);
    const latestAttempts2 = getLatestAttempts(attempts2);
  
    // Combine the latest attempts from both exams
    let combinedData = combineResults(latestAttempts1, latestAttempts2);
  
    // Calculate final total for each result
    combinedData.forEach(result => {
      result.finalTotal = calculateFinalTotal(result); // Assuming calculateFinalTotal function exists
    });
  
    // Sort combined data by final total in descending order
    combinedData.sort((a, b) => b.finalTotal - a.finalTotal);
  
    // Extract unique sections
    let uniqueSections = new Set();
    combinedData.forEach(userResult => {
      Object.keys(userResult.section_scores).forEach(sectionName => {
        uniqueSections.add(sectionName);
      });
    });
  
    return {
      combinedData,
      uniqueSections: Array.from(uniqueSections)
    };
  };
  
  function calculateFinalTotal(result) {
    // Calculate the final total for a given result
    // Sum up the total marks from all sections and papers
    let finalTotal = 0;
    Object.keys(result.section_scores).forEach(sectionName => {
      finalTotal += result.section_scores[sectionName].paper1 || 0;
      finalTotal += result.section_scores[sectionName].paper2 || 0;
    });
  
    // Round off to one decimal place
    return Math.ceil(parseFloat(finalTotal));
  }
  
  

  function calculateTotalSectionMarks(sectionName, result) {
    // Assuming each result has a section_scores object with paper1 and paper2 as keys
    const scorePaper1 = result.section_scores[sectionName]?.paper1 ?? 0;
    const scorePaper2 = result.section_scores[sectionName]?.paper2 ?? 0;
    // Sum the scores for paper1 and paper2 for the section and return as a string
    return Math.ceil(parseFloat(scorePaper1 + scorePaper2));
  }
  

  


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const examId1 = data?.examId1;
      const examId2 = data?.examId2;

      // Check if data is already cached
      const cacheKey = `${examId1}-${examId2}`;
      if (cache[cacheKey]) {
        const { combinedData, uniqueSections } = cache[cacheKey];
        setCombinedResults(combinedData);
        setSectionNames(uniqueSections);
        setLoading(false);
        return;
      }

      try {
        // Fetch attempts for both exams in parallel
        const [attempts1, attempts2] = await Promise.all([
          fetchAllPages(examId1),
          fetchAllPages(examId2)
        ]);

        // Process and combine the attempts
        const { combinedData, uniqueSections } = processAttempts(attempts1, attempts2, sectionNames);

        // Cache the processed data
        cache[cacheKey] = { combinedData, uniqueSections };

        // Update state with processed data
        setCombinedResults(combinedData);
        setSectionNames(uniqueSections);
      } catch (error) {
        console.error('Error in fetchData:', error);
        // Optionally, handle the error as needed
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [data]);

  

  function downloadResults() {
    // Assuming combinedResults is already sorted by final total score
  
    // Extract exam names from the first attempts of each exam if available
    // const exam1Name = combinedResults.length > 0 ? examName1 : 'Exam1';
    // const exam2Name = combinedResults.length > 1 && combinedResults[1].exam_name !== exam1Name ? combinedResults[1].exam_name : 'Exam2';
  
    // Sanitize the exam names to create a valid filename
    const safeExam1Name = examName1.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const safeExam2Name = examName2.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  
    // Construct the filename using the sanitized exam names
    const fileName = `combined_${safeExam1Name}_${safeExam2Name}_results.csv`;
  
    // Define a CSV header
    const headers = [
      'Rank',
      'Name',
      'Total (Paper 1)',
      ...sectionNames.map(name => `${name} (Paper 1)`),
      'Total (Paper 2)',
      ...sectionNames.map(name => `${name} (Paper 2)`),
      ...sectionNames.map(name => `Total ${name} Marks`),
      'Final Total',
    ];
  
    // Map the sorted results to CSV rows, ensure the rank starts from 1
    const rows = combinedResults.map((result, index) => {
      if (!result.user_name || result.user_name === "0") {
        return null; // Skip if the user_name is missing or invalid
      }
  
      // Construct each row with the appropriate data
      return [
        result.rank ?? (index + 1), // Use rank from result if available; otherwise, use index + 1
        result.user_name || '', // Use empty string if user_name is not available
        sectionNames.reduce((total, name) => total + (result.section_scores[name]?.paper1 ?? 0), 0).toFixed(2),
        ...sectionNames.map(name => (result.section_scores[name]?.paper1 ?? 0).toFixed(2)),
        sectionNames.reduce((total, name) => total + (result.section_scores[name]?.paper2 ?? 0), 0).toFixed(2),
        ...sectionNames.map(name => (result.section_scores[name]?.paper2 ?? 0).toFixed(2)),
        ...sectionNames.map(name => parseFloat(calculateTotalSectionMarks(name, result))),
        parseFloat(calculateFinalTotal(result, sectionNames)),
      ];
    }).filter(row => row !== null);  // Remove null or undefined entries
  
    // Convert array of arrays into a CSV string
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  
    // Create a link and download the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
   
  
  

  console.log('section',sectionNames)
  
  
  return (

    <> { loading ? <div className='bg-white w-96 h-screen'><Spinner text='Please wait...'/></div>  :

   <>

  <div className='flex items-center justify-between'>  
  <button className='p-2 px-3 rounded bg-blue-600 text-white my-2' onClick={downloadResults}>Download</button>
  <button onClick={closeModal} className='p-2 px-2 rounded bg-red-500 text-white '>Close</button>
  </div>
    <table className=' w-full bg-gray-100 shadow-md rounded-lg overflow-x-scroll'>
      <thead className=' bg-gray-800 text-white'>
        <tr>
          <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Rank</th>
          <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Name</th>
          <th className='px-6 py-3 text-left text-xs bg-gray-700 whitespace-nowrap font-medium uppercase tracking-wider'>Total <br></br> {examName1}</th>
          {/* Individual section scores for examName1 */}
          {sectionNames.map(name => (
            <th key={`header-${name}-paper1`} className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>{name}  </th>
          ))}
          <th className='px-6 py-3 text-left text-xs font-medium uppercase whitespace-nowrap bg-gray-700 tracking-wider'>Total <br></br> {examName2}</th>
          {/* Individual section scores for Paper 2 */}
          {sectionNames.map(name => (
            <th key={`header-${name}-paper2`} className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>{name}  </th>
          ))}
          {/* Combined section totals */}
          {sectionNames.map(name => (
            <th key={`${name}`} className='px-6 py-3 text-left text-xs font-medium uppercase bg-gray-600 tracking-wider'>Total {name} Marks</th>
          ))}
              <th className='px-6 py-3 text-left text-xs font-medium uppercase bg-gray-700 tracking-wider'>Final Total</th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
  {combinedResults.map((result, index) => {
    const isTopThree = index < 3; // Determine if the current row is in the top three
    const rowClass = isTopThree ? `bg-${['gold', 'silver', 'bronze'][index]}-200` : ''; // Assign a class based on rank

    return (
      result.user_name && (
        <tr key={index} className={`${rowClass} ${index  == 0 ?  ' bg-yellow-300' : index == 1 ? 'bg-yellow-200' : index == 2 ? 'bg-yellow-100' : 'bg-yellow-50' } hover:bg-gray-50`}>
          <td className={` px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900`}>
            {isTopThree ? (
              <>
                <span className='flex items-center space-x-2'> 
                {` ${index + 1 == 1 ? '1st' : index + 1 == 2 ? '2nd' : index + 1 == 3 ? '3rd' : ''} `}
                 <img src={`/icons/${['gold', 'silver', 'bronze'][index]}-medal.png`} className='h-8 w-8' alt="Medal" />
                
                </span>
              </>
            ) : (
              index + 1
            )}
          </td>
            <td className={` ${index  == 0 ?  ' font-semibold text-gray-800' : index == 1 ? 'font-semibold text-gray-800' : index == 2 ? 'font-semibold text-gray-800' : '' } px-6 py-4 whitespace-nowrap text-sm text-gray-600`}>{result.user_name}</td>
            {/* Total marks for Paper 1 */}
            <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-700'>
              {sectionNames.reduce((total, name) => {
                const score = result.section_scores[name]?.paper1;
                return total + (typeof score === 'number' ? score : 0);
              }, 0).toFixed(2)}
            </td>
            {/* Individual section scores for Paper 1 */}
            {sectionNames.map(name => (
              <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500' key={`score-${name}-paper1-${index}`}>
                {typeof result.section_scores[name]?.paper1 === 'number' ? result.section_scores[name].paper1.toFixed(2) : '0.00'}
              </td>
            ))}
            {/* Total marks for Paper 2 */}
            <td className='px-6 py-4  whitespace-nowrap text-center text-sm font-semibold text-gray-700'>
              {sectionNames.reduce((total, name) => {
                const score = result.section_scores[name]?.paper2;
                return total + (typeof score === 'number' ? score : 0);
              }, 0).toFixed(2)}
            </td>
            {/* Individual section scores for Paper 2 */}
            {sectionNames.map(name => (
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500' key={`score-${name}-paper2-${index}`}>
                {typeof result.section_scores[name]?.paper2 === 'number' ? result.section_scores[name].paper2.toFixed(2) : '0.00'}
              </td>
            ))}
            {/* Combined section totals */}
            {sectionNames.map(name => (
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700' key={`total-${name}-${index}`}>
                {parseFloat(calculateTotalSectionMarks(name, result))}
              </td>
            ))}

          <td className='px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-800'>
            {parseFloat(calculateFinalTotal(result, sectionNames))}
          </td>
          </tr>
        )
        );
      })}
    </tbody>
    </table>


    </>
}
    </>
  );
  
}