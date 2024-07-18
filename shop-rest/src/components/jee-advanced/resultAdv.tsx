import Link from "next/link";
import { useEffect, useState } from "react";
import { useEndExamMutation } from "@data/exam-submit/use-exam-submit.mutation";

const ResultAdv = ({
  onResultData,
  startTime,
  endTime,
  attemptId,
  handleScoreUpdate,
  finalDa,
  que,
  resultToggle,
  finalSubmit,
  queLength,
  notAnsweredlength,
  Answeredlength,
  markedforreviewlength,
  answeredmarkedforreviewlength,
  notVisitedlength,
  usedTimebeforeRefresh,
  paperId,
}) => {

  let score = 0;
  let correct = 0;
  let wrong = 0;
  let sectionAns = {};

  const endExamMutation = useEndExamMutation();

  const subsectionWithLimit = que?.questions[0]?.sub_section?.map((item) => {
    const data1 = item?.subSections?.filter((data) => {
      if (data?.questionLimit) {
        return data?.name;
      }
    });
     console.log("data1 123" , data1)
    if(data1)
    {
    return data1[0];
    }
    return ;
  });

  console.log("subsectionWithLimit 123" , subsectionWithLimit)

  let subsectionWithLimitAns = {};

  const marksForsubsectionWithLimit = (score1, subsectionName, section , limitScore) => {
    console.log("score1" , limitScore)  //new
    if (!subsectionWithLimitAns[section]) {
      subsectionWithLimitAns[section] = {};
    }
    if (!subsectionWithLimitAns[section][subsectionName]) {
      subsectionWithLimitAns[section][subsectionName] = {
        score: 0,
        WorngCount: 0,
        CorrectCount: 0,
        negativeScore : parseInt(que?.questions?.find((qe)=>(qe?.question_subSection ==subsectionName))?.negative_marks),
        positiveScore : parseInt(que?.questions?.find((qe)=>(qe?.question_subSection ==subsectionName))?.marks)
      };
    }

    if (score1 > 0) {
      if (subsectionWithLimitAns[section][subsectionName].score < limitScore) {
        subsectionWithLimitAns[section][subsectionName].score += score1;
        subsectionWithLimitAns[section][subsectionName].CorrectCount++;
      } else {
        subsectionWithLimitAns[section][subsectionName].CorrectCount++;
      }
    } else {
      subsectionWithLimitAns[section][subsectionName].WorngCount++;
    }
  };

  const scoreSectionWise = (score1, sectionName: string) => {
    if (!sectionAns[sectionName]) {
      sectionAns[sectionName] = score1;
    } else {
      sectionAns[sectionName] = sectionAns[sectionName] + score1;
    }
  };

  function convertValuesToNumber(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = parseFloat(obj[key]);
      }
    }
  }

  function areAllElementsPresent(array1, array2) {
    for (let i = 0; i < array2.length; i++) {
      const idToCheck = array2[i];
      const isPresent = array1.some((obj) => obj.id == idToCheck);
      if (!isPresent) {
        return false;
      }
    }

    return true;
  }

  // const time = (parseInt(que?.time)*60 -  usedTimebeforeRefresh);
  const time = endTime - startTime +  (usedTimebeforeRefresh == null ? 0 : (parseInt(que?.time)*60 -  usedTimebeforeRefresh)*1000) ;


  for (const data of finalDa.answers) {
    const Currsection = que?.questions?.find(
      (ques) => data?.questionId == ques.id
    )?.section_name;
    const CurrSubsection = que?.questions?.find(
      (ques) => data?.questionId == ques.id
    )?.question_subSection;
    if (data.selectedId) {
      let type = que?.questions?.filter((question) => {
        return question.id == data.questionId;
      });
      type = type[0].question_type.type;

      //For MCQ Question Marking
      if (type == "MCQ" || type == "Comprehension" ) {
        if (data?.correct_id[0]?.id == data.selectedId) {
          score = score + parseInt(data.marks);

          correct = correct + 1;
          scoreSectionWise(parseInt(data.marks), Currsection);
        }

        if (data?.correct_id[0]?.id != data.selectedId) {
          score = score - parseInt(data.negative);
          wrong = wrong + 1;
          scoreSectionWise(-parseInt(data.negative), Currsection);
        }
      }

      if (type == "Multiple Correct") {
        if (areAllElementsPresent(data?.correct_id, data?.selectedId)) {
          score =
            score +
            Math.floor((parseInt(data?.marks) / data?.correct_id.length) *
              data.selectedId.length);
          correct = correct + 1;
          scoreSectionWise(
            ( Math.floor(parseInt(data?.marks) / data?.correct_id.length) *
              data.selectedId.length) ,
            Currsection
          );
        } else {
          score = score - parseInt(data?.negative);
          wrong = wrong + 1;
          scoreSectionWise(-parseInt(data?.negative), Currsection);
        }
      }

      if (type == "Integer") {
        const ans = JSON.parse(data?.correct_id);

        const selectedAns = parseFloat(data?.selectedId);
        convertValuesToNumber(ans);


        if (Object.values(ans).includes(selectedAns)) {
          if (
            subsectionWithLimit?.some((item) => item?.name == CurrSubsection)
          ) {
            const currentsctiondata = subsectionWithLimit?.find((item) =>  item?.name == CurrSubsection )   //new
            marksForsubsectionWithLimit(
              parseInt(data.marks),
              CurrSubsection,
              Currsection,
              currentsctiondata?.questionLimit*parseInt(data.marks) //new
            );
          } else {
            score = score + parseInt(data?.marks);
            correct = correct + 1;
            scoreSectionWise(parseInt(data?.marks), Currsection);
          }
        } else {
          if (
            subsectionWithLimit?.some((item) => item?.name == CurrSubsection)  //new
          ) {
            const currentsctiondata = subsectionWithLimit?.find((item) =>  item?.name == CurrSubsection )
            marksForsubsectionWithLimit(
              -parseInt(data.negative),
              CurrSubsection,
              Currsection,
              currentsctiondata?.questionLimit*parseInt(data.marks)        //new
            );
          } else {
            score = score - parseInt(data?.negative);
            wrong = wrong + 1;
            scoreSectionWise(-parseInt(data?.negative), Currsection);
          }
        }
      }

      if (data?.correct_id == data?.selectedId) {
        score = score + parseInt(data.marks);
        correct = correct + 1;
        scoreSectionWise(parseInt(data.marks), Currsection);
      }
    }
  }

  for (let key in subsectionWithLimitAns) { //calculating the final score and also section wise
    
    for (let key1 in subsectionWithLimitAns[key]) {
      console.log("subsectionWithLimitAns1111" , key1)
      console.log("subsectionWithLimitAns144" , subsectionWithLimitAns[key])
      console.log("subsectionWithLimitAns111" , subsectionWithLimitAns)
       console.log("subsectionWithLimitAns111222" , subsectionWithLimit)
       const subSectionQuestionLimitCount = subsectionWithLimit?.filter((item) => item?.name == key1)[0]?.questionLimit
       console.log("subSectionQuestionLimitCount" , subSectionQuestionLimitCount)
       const scoreLimit = subSectionQuestionLimitCount*subsectionWithLimitAns[key][key1]?.positiveScore
       console.log("scoreLimit" , scoreLimit)
      if (subsectionWithLimitAns[key][key1].score < scoreLimit) {
        const remaining = (scoreLimit - subsectionWithLimitAns[key][key1].score) / subsectionWithLimitAns[key][key1]?.positiveScore;
        if (subsectionWithLimitAns[key][key1].WorngCount > remaining) {
          subsectionWithLimitAns[key][key1].score =
            subsectionWithLimitAns[key][key1].score - remaining*subsectionWithLimitAns[key][key1]?.negativeScore;
        } else {
          subsectionWithLimitAns[key][key1].score =
            subsectionWithLimitAns[key][key1].score -
            subsectionWithLimitAns[key][key1].WorngCount*subsectionWithLimitAns[key][key1]?.negativeScore;
        }
      }
      score = score + subsectionWithLimitAns[key][key1].score; // total score
      correct = correct + subsectionWithLimitAns[key][key1].CorrectCount;
      wrong = wrong + subsectionWithLimitAns[key][key1].WorngCount;
      // score section wise
      if(!sectionAns[key])
      {
        sectionAns[key] =  subsectionWithLimitAns[key][key1].score;
      }
      else{
      sectionAns[key] = sectionAns[key] + subsectionWithLimitAns[key][key1].score;
      } 
    }
  }

  console.log("Saurav score Limit", subsectionWithLimitAns);
  console.log("Saurav score section", sectionAns);

  setTimeout(()=>
  {
    localStorage.removeItem(`${paperId}response`);
    localStorage.removeItem(`${paperId}ansArray`);
    localStorage.removeItem(`${paperId}ansType`);
    localStorage.removeItem(`${paperId}time`);
    localStorage.removeItem(`${paperId}attemptId`);
    localStorage.removeItem(`${paperId}questionInSequence`);
    localStorage.removeItem(`${paperId}userId`);
  } , 700)
  

  // handleScoreUpdate(score);

  const [mutationFired, setMutationFired] = useState(false);

  const submitExam = () => {

    
    
    if (mutationFired) {
      return; // Exit early if mutation has already been fired
    }
    const updatedData = {
      ...finalDa,
      score: score,
      sectionAns: sectionAns,
    };
    endExamMutation.mutate({ examData: updatedData, attemptId: attemptId });
    setMutationFired(true);   // Set the flag after firing the mutation
    
  };

   

  useEffect(() => {
    // You can call submitExam directly in useEffect if you want it to run after the component mounts/updates.
    // Just ensure you have necessary dependencies provided
    submitExam();
  }, [finalDa, score]); // Add de

  // submitExam()

  console.log("Saurav score", score);

 

  return (
    <>
      <h1 className="font-black  text-2xl text-center mt-8">Result</h1>

      <div className="flex mx-2 flex-wrap justify-center border-b mt-6 mb-6 pb-6 gap-6">
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Total Marks</h1>
          <div>{que.total_marks}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Total Questions</h1>
          <div>{queLength + 1}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Score</h1>
          <div>{(parseFloat(score))}</div>
        </div>
        <div className="text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Correct questions</h1>
          <div>{correct}</div>
        </div>
        <div className="text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Wrong questions</h1>
          <div>{wrong}</div>
        </div>
        <div className="text-lg text-center font-extrabold text-gray-600 pr-5 ">
          <h1>Time Taken</h1>
          <div>
            {Math.floor(time / 1000 / 60)} min {Math.floor((time / 1000) % 60)}{" "}
            sec{" "}
          </div>
        </div>
      </div>



      <div className="pb-28">
        <div>
          <h1 className="font-black  text-2xl text-center ">
            Go to your to Dashboard
          </h1>
        </div>

        <div className="flex justify-center text-base font-bold mt-2">
          <Link href="/student-dashboard">
            <button className="border h-14 w-28 ">Dashboard</button>
          </Link>
          {/* <button className='ml-2 border h-14 w-20' onClick={() => setToggle(!toggle) }  >NO</button> */}
        </div>
      </div>
    </>
  );
};

export default ResultAdv;

// if (!subsectionWithLimitAns[section][subsectionName] && !subsectionWithLimitAns[section][`WorngCount`]) {

//   if (score1 < 0) {
//     subsectionWithLimitAns[section][subsectionName] = 0;
//     subsectionWithLimitAns[section][`WorngCount`] = 1;
//   } else {

//     subsectionWithLimitAns[section][subsectionName] = score1;
//     subsectionWithLimitAns[section][`CorrectCount`] = 1;
//   }
// } else {

//   if (subsectionWithLimitAns[section][subsectionName] < 20) {
//     if (score1 < 0) {
//       if (!subsectionWithLimitAns[section][`WorngCount`]) {
//         subsectionWithLimitAns[section][`WorngCount`] = 1;
//       } else {

//         subsectionWithLimitAns[section][`WorngCount`]++;
//       }
//     } else {
//       if (!subsectionWithLimitAns[section][`CorrectCount`]) {
//         subsectionWithLimitAns[section][`CorrectCount`] = 1;
//       } else {
//         subsectionWithLimitAns[section][`CorrectCount`]++;
//       }
//       subsectionWithLimitAns[section][subsectionName] = subsectionWithLimitAns[section][subsectionName] + score1;
//     }
//   }
//   else
//   {
//     if (score1 < 0) {
//       if (!subsectionWithLimitAns[section][`WorngCount`]) {
//         subsectionWithLimitAns[section][`WorngCount`] = 1;
//       } else {

//         subsectionWithLimitAns[section][`WorngCount`]++;
//       }
//     }
//     else
//     {
//       subsectionWithLimitAns[section][`CorrectCount`]++;
//     }
//   }
// }



// score = score + physics + chemistry + maths;
// correct = correct + physicsCount1 + chemistryCount1 + mathsCount1;
// wrong = wrong + physicsCount + chemistryCount + mathsCount;

// if (physics < 20) {
//   const remaining = (20 - physics) / 4;
//   if (physicsCount > remaining) {
//     physics = physics - remaining;
//   } else {
//     physics = physics - physicsCount;
//   }
// }

// if (chemistry < 20) {
//   const remaining = (20 - chemistry) / 4;
//   if (chemistryCount > remaining) {
//     chemistry = chemistry - remaining;
//   } else {
//     chemistry = chemistry - chemistryCount;
//   }
// }
// if (physics < 20) {
//   const remaining = (20 - maths) / 4;
//   if (mathsCount > remaining) {
//     maths = maths - remaining;
//   } else {
//     maths = maths - mathsCount;
//   }
// }

// const marksForsubsectionWithLimit = (score1, subsectionName) => {
//   if (subsectionName == "Physics B") {
//     if (score1 < 0) {
//       physicsCount++;
//     }

//     if (physics < 20) {
//       if (score1 > 0) {
//         physicsCount1++;
//         physics = physics + score1;
//       }
//     }
//   }

//   if (subsectionName == "Chemistry B") {
//     if (score1 < 0) {
//       chemistryCount++;
//     }

//     if (chemistry < 20) {
//       if (score1 > 0) {
//         chemistryCount1++;
//         chemistry = chemistry + score1;
//       }
//     }
//   }

//   if (subsectionName == "Maths B") {
//     if (score1 < 0) {
//       mathsCount++;
//     }

//     if (maths < 20) {
//       if (score1 > 0) {
//         mathsCount1++;
//         maths = maths + score1;
//       }
//     }
//   }
// };
