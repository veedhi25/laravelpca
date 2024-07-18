import SecondNavbar from "@components/jee-advanced/secondNavbar";
import AboutAllQuestion from "@components/jee-advanced/about-all-qustion";
import Time from "@components/jee-advanced/time";
import Sections from "@components/jee-advanced/sections";
import Language from "@components/jee-advanced/language";
import Profile from "@components/jee-advanced/profile";
import QuestionCount from "@components/jee-advanced/quetsion-count";
import QuestionShow from "@components/jee-advanced/question-show";

import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useExamsQuery } from "@data/exams/use-exams.query";
import SubmitJeeMains from "@components/jee_mains/submit";
import { useExamQuery } from "./../../data/exams/use-exam.query";
import { useEndExamMutation } from "@data/exam-submit/use-exam-submit.mutation";
import ResultAdv from "@components/jee-advanced/resultAdv";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import TopNavbarMobile from "@components/jee-advanced-mobile/tob-navbar-mobile";
import QuestionCountMobile from "@components/jee-advanced-mobile/question-count-mobile";
import QuestionShowMobile from "@components/jee-advanced-mobile/question-show-mobile";
import { useExamAttemptStatus } from "@data/exam-submit/use-exam-attempt-status.query";

const JeeAdvancedPaperScreen = () => {
  const router = useRouter();
  const { handleSubmit, register, reset, watch, control } = useForm();
  const paperId = router?.query?.exam_id;
  const attemptId = router?.query?.attemptId;
  const userId = router?.query?.userId;
  const is_mock = router?.query?.is_mock;



  const paper:number = parseInt(paperId);



  const { data: sauravpaper } = useExamQuery(paper);
  const [usedTimebeforeRefresh , setUsedTimebeforeRefresh] = useState(0);
  // console.log("usedTimebeforeRefresh",usedTimebeforeRefresh)

  const [timeAfterRestart, setTimeAfterRestart] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [resultToggle, setResultToggle] = useState(false);
  let [index, setIndex] = useState(0);
  let [response, setResponse] = useState(Array(100).fill(0));
  let [ansArray, setAnsArray] = useState(Array(100).fill(0));
  let [ansType, setAnsType] = useState(Array(100).fill("1"));
  const [finalDa, setFinalDa] = useState();
  const [startTime, setStarttime] = useState();
  const [endTime, setEndtime] = useState();
  const [timeArray, setTimeArray] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState({});
  const [currSubSecName, setCurrSubSecName] = useState();
  const [inputValue, setInputValue] = useState(null);
  const [reloded, setReloded] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [questionInSequence, setQuestionInSequence] = useState([]);
 
  const [currentSubSectionLastIndex, setCurrentSubSectionLastIndex] = useState([]);

  const [allSubSectionsImage , setAllSubSectionsImage] = useState([])


  const [subSections, setSubsections] = useState([]);
  const [count, setCount] = useState(0);
  const [quecount, setQueCount] = useState(1);
  const [eachsectionquestionslength, setEachsectionquestionslength] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 622);
  const { data: student } = useCustomerQuery();

  const {data:status } = useExamAttemptStatus(paperId, userId);



  useEffect(()=>
  {
    if(status?.is_submitted && is_mock == 0 )
    {
      setTimeout(()=>
      {
        localStorage.removeItem(`${paperId}response`);
        localStorage.removeItem(`${paperId}ansArray`);
        localStorage.removeItem(`${paperId}ansType`);
        localStorage.removeItem(`${paperId}time`);
        localStorage.removeItem(`${paperId}attemptId`);
        localStorage.removeItem(`${paperId}questionInSequence`);
        localStorage.removeItem(`${paperId}userId`);
      } , 1200)

      router.push("/student-dashboard");
    }
  },[status])


  useEffect(() => {
    

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 622); // Adjust the threshold as needed
    };

    // Attach event listener for the window's resize event
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);


  useEffect(() => {
    if(paperId){
    if (watch("Ans") == null && response[index + 1] === 0) {
      if (ansType[index + 1] != "1") {
        return;
      } else {
        const newElement = "2";
        let type = [...ansType];
        type.splice(index + 1, 1, newElement);
        setAnsType(type);
        return;
      }
      // const newElement = '2'
      // let type = [...ansType]
      // type.splice(index+1,1,newElement)
      // setAnsType(type);
      // return ;
    }

    if (watch("Ans") != null) {
      
      const newElement = watch("Ans");
      let res = [...response];
      res.splice(index + 1, 1, newElement);
      setResponse(res);
    }
  }
  }, [ watch("Ans"), index,  watch("integer")]);

  

  useEffect(() => {
    //@ts-ignore
    const data = JSON.parse(localStorage.getItem(`${paperId}response`));
    const data1 = JSON.parse(localStorage.getItem(`${paperId}ansArray`));
    const data2 = JSON.parse(localStorage.getItem(`${paperId}ansType`));
    const data3 = JSON.parse(localStorage.getItem(`${paperId}time`));
    const data4 = JSON.parse(localStorage.getItem(`${paperId}attemptId`));

    
    if (data != null || data1 != null) {
 
      setResponse(data);
      setAnsArray(data1);
      setAnsType(data2); 
      setTimeAfterRestart(data3);
      setReloded(true);
      setQuestionInSequence(JSON.parse(localStorage.getItem(`${paperId}questionInSequence`)));
      toast.info("Your Exam is resumed", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [paperId]);

  useEffect(() => {
    if(paperId){
    const data = JSON.stringify(response);
    const data2 = JSON.stringify(ansArray);
    const data3 = JSON.stringify(ansType);
    const data4 = JSON.stringify(attemptId);
    const data5 = JSON.stringify(userId);

    localStorage.setItem(`${paperId}response`, data);
    localStorage.setItem(`${paperId}ansArray`, data2);
    localStorage.setItem(`${paperId}ansType`, data3);
    localStorage.setItem(`${paperId}attemptId`, data4);
    localStorage.setItem(`${paperId}userId`, data5);
    }
  }, [response, ansArray, ansType]);

  const [resultData, setResultData] = useState(null);

  const handleResultData = (data) => {
    setResultData(data);
  };


  const timeRef = useRef(0);
  

  const exa = sauravpaper ? sauravpaper?.questions : null;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Refreshing page will cause your data loss";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

 

  useEffect(() => {
    let currindex = [];
    const length = queLength + 1;
    Array.from({ length }, (_, index) => {
      if (currSubSecName == exa?.[index].question_subSection || currSubSecName == exa?.[index].section_name ) {
        currindex.push(index);
      }
    });

    setIndex(currindex[0]);
    setCurrentSubSectionLastIndex(currindex[currindex.length - 1]);
    setCount(0);
    setQueCount(1);
    setEachsectionquestionslength(currindex.length);
    reset();
  }, [currSubSecName]);

  useEffect(() => {
   
    setStarttime(new Date());
    const usedTime =JSON.parse(localStorage.getItem(`${paperId}time`));
    setUsedTimebeforeRefresh(usedTime)

    
    const timer = setInterval(() => {
      timeRef.current = timeRef.current + 1;
    }, 1000);

    return () => {
      clearInterval(timer);
    }; 
  // }, []);
  }, [paperId]);


  const handleTimer = () => {
    if (timeArray[index + 1] == null) {
      timeArray[index + 1] = timeRef.current;
      timeRef.current = 0;
    } else {
      timeArray[index + 1] = timeArray[index + 1] + timeRef.current;
      timeRef.current = 0;
    }
  };

  const handleNext = () => {
    if (index == currentSubSectionLastIndex) {
      const index = subSections.findIndex(
        (item) => item?.name === currSubSecName
      );
      handleTimer();

      if (index == subSections.length - 1) {
        setCurrSubSecName(subSections[0]?.name);
      } else {
        setCurrSubSecName(subSections[index + 1]?.name);
      }

      setInputValue("");
      reset();
      setCheckedCheckboxes([]);

      return;
    }
    handleTimer();
    index++;
    setIndex(index);
    setQueCount((pre) => pre + 1);
    reset();
    setCheckedCheckboxes([]);
  };

  const handleBack = () => {
    handleTimer();
    index--;
    setIndex(index);
    setQueCount((pre) => pre - 1);
    reset();
  };

  const handleClear = () => {
    setCheckedCheckboxes([]);
    const res = 0;

    let arr = [...response];
    arr.splice(index + 1, 1, res);
    let arr2 = [...ansArray];
    arr2.splice(index + 1, 1, res);
    let arr1 = [...ansType];
    arr1.splice(index + 1, 1, "2");
    setResponse(arr);
    setAnsArray(arr2);
    setInputValue("");
    setAnsType(arr1);
    reset();
  };

  const handleAns = (data) => {
    const newElement = data.Ans;
    let arr = [...ansArray];
    arr.splice(index + 1, 1, newElement);
    setAnsArray(arr);
    reset();
  };

  const handleSaveNext = (data) => {
    if (response[index + 1] === 0) {
      handleNext();
      return;
    }

    const ansTy = "3";

    let type = [...ansType];
    type.splice(index + 1, 1, ansTy);
    setAnsType(type);

    //   if(watch("Ans") != null)
    //   {
    // const newElement = data.Ans
    // let arr = [...ansArray]
    // arr.splice(index+1,1,newElement)
    // setAnsArray(arr);
    // handleNext();
    //   }
    const newElement = response[index + 1];
    let arr = [...ansArray];
    arr.splice(index + 1, 1, newElement);
    setAnsArray(arr);
    handleNext();
  };

  const handleSaveMarkForReview = (data) => {
    if (response[index + 1] == 0) {
      const ansTy = "4";
      let type = [...ansType];
      type.splice(index + 1, 1, ansTy);
      setAnsType(type);

      handleNext();
      return;
    }

    const ansTy = "5";
    let type = [...ansType];
    type.splice(index + 1, 1, ansTy);
    setAnsType(type);

    const newElement = data.Ans;
    let arr = [...ansArray];
    arr.splice(index + 1, 1, newElement);
    setAnsArray(arr);
    handleNext();
  };

  const finalSubmit = () => {
    setEndtime(new Date());
    console.log("response", response);
    console.log("ansarray", ansArray);

   

    const attemptquestions = exa?.map((que, indexx) => {

      const index = questionInSequence?.findIndex((item)=>(item?.id == que?.id))

      return {
        questionId: que.id,
        selectedId: ansArray[index + 1],
        responseId: response[index + 1],
        correct_id:
          que?.correct_answer == null
            ? que?.correct_options
            : que?.correct_answer == "null"
            ? que?.correct_options
            : que?.correct_answer,
        marks: que.marks,
        negative: que.negative_marks,
        time: timeArray[index + 1],
      };
    });

    const time = new Date() - startTime  + (usedTimebeforeRefresh == null ? 0 : (parseInt(sauravpaper?.time)*60 -  usedTimebeforeRefresh)*1000) ;



    const finaldata = {
      exam_id: paperId,
      student_id: student?.me?.id,
      answers: attemptquestions,
      total_time: Math.floor(time / 60000),

      total_questions: queLength + 1,
    };

    setFinalDa(finaldata);
    
    setResultToggle(true);

    // endExamMutation.mutate({ examData: finaldata, attemptId: router?.query?.attemptId });
    // router.push('/')

    console.log("finalData", finaldata);
    
    
  };

  console.log("lole response", response);
  console.log("lole ansarray", ansArray);
  console.log("lole ansType", ansType);

  const onSubmit = (data) => {
    console.log("Selected options:", data);
  };



  if (!sauravpaper || !status) return "loading123...";
  console.log("sauravpaper", sauravpaper);


  const queLength = exa?.length - 1;
  const notAnswered = ansType.filter((qes) => qes == "2");
  const notAnsweredlength = notAnswered.length;
  const Answered = ansType.filter((qes) => qes == "3");
  const Answeredlength = Answered.length;
  const markedforreview = ansType.filter((qes) => qes == "4");
  const markedforreviewlength = markedforreview.length;
  const answeredmarkedforreview = ansType.filter((qes) => qes == "5");
  const answeredmarkedforreviewlength = answeredmarkedforreview.length;

  const notVisitedlength =
    queLength +
    1 -
    answeredmarkedforreviewlength -
    markedforreviewlength -
    Answeredlength -
    notAnsweredlength;

    
  let que = [...exa];                // here i am taking copy of exam question
  que = que?.sort(()=> Math.random() - 0.5 )   // shuffle the exam question randomly

  
  // now make the shuffled question in a sequence of subSections 

  console.log("lolo subSections" , subSections)
 
  if(!reloded && !shuffled && subSections.length != 0  )
  {
    if(JSON.parse(localStorage.getItem(`${paperId}questionInSequence`)) == null){
    console.log("saurav reloded" , reloded)
    console.log("saurav reloded 1" , JSON.parse(localStorage.getItem(`${paperId}questionInSequence`)))
    console.log("saurav reloded 2" , subSections)
    let questionInSequence = [];
    let count = 0;
   
    console.log("lolo question" , que)


    subSections?.map((section)=>
    {
         
        if(section?.isSubSection){
            const data =  (que?.filter((question)=>(question?.question_subSection == section?.name )))
            questionInSequence = [...questionInSequence , ...data ]
        }
        else
        {
          const data =  (que?.filter((question)=>(question?.section_name == section?.name )))
            questionInSequence = [...questionInSequence , ...data ]
        }
          count++;    // this is important for knowing the shuffled happned after the data came
    })
    
    // console.log("shuffled inside questionInSequence" , questionInSequence)
    

    const questionInSequence1 = questionInSequence?.map((item , index)=>
    {
         if(item?.question_type?.type == "Comprehension")
         {
          return exa[index];
         }

         return item;
    })

    console.log("sauravk" , questionInSequence1)
    
    const data = JSON.stringify(questionInSequence1);

    localStorage.setItem(`${paperId}questionInSequence`, data);
    
    console.log("sauravk que",questionInSequence)




    if(count > 0){    //checking the condition that data is shuffled after the data come
      setShuffled(true)  // make sure that data shuffled only once
      setQuestionInSequence(questionInSequence1)  // store our shuffled data
    }
  }
  }
 
  

  console.log("shuffle questionInSequence outter" , questionInSequence)
  console.log("shuffle not exa", exa);




  return (
    <div className=" h-screen">
      <div className=" hidden sm:block ">
        <SecondNavbar course={sauravpaper?.course_name} />
      </div>
     
      <div className=" block sm:hidden ">
        <TopNavbarMobile
          subSections={subSections}
          setSubsections={setSubsections}
          subSection={exa[0]?.sub_section}
          currSubSecName={currSubSecName}
          setCurrSubSecName={setCurrSubSecName}
          Answeredlength={Answeredlength}
          notAnsweredlength={notAnsweredlength}
          notVisitedlength={notVisitedlength}
          markedforreviewlength={markedforreviewlength}
        />
      </div>
      { !resultToggle &&
      <div className="grid sm:grid-cols-6">

        <div className={` ${toggle ? "col-span-5" : "col-span-6"}   `}>
          
          <div className=" hidden sm:block ">
            <AboutAllQuestion course={sauravpaper?.course_name} />
          </div>

          <Time
            resultToggle={resultToggle}
            time={sauravpaper.time}
            finalSubmit={finalSubmit}
            setToggle={setToggle}
            timeAfterRestart={timeAfterRestart}
            paperId={paperId}
          />

          <div className="block sm:hidden">
            <QuestionCountMobile
              eachsectionquestionslength={eachsectionquestionslength}
              subSections={subSections}
              currentSubSectionLastIndex={currentSubSectionLastIndex}
              setQueCount={setQueCount}
              count={count}
              setCount={setCount}
              que={exa}
              currSubSecName={currSubSecName}
              finalSubmit={finalSubmit}
              control={control}
              handleTimer={handleTimer}
              index={index}
              setIndex={setIndex}
              length={queLength + 1}
              reset={reset}
              ansType={ansType}
              notVisitedlength={notVisitedlength}
              answeredmarkedforreviewlength={answeredmarkedforreviewlength}
              markedforreviewlength={markedforreviewlength}
              Answeredlength={Answeredlength}
              notAnsweredlength={notAnsweredlength}
              onSubmit={onSubmit}
              setToggle={setToggle}
            />
          </div>
          
          {toggle && (
            <div>
             
              <div className=" hidden sm:block ">
                <Sections
                  subSections={subSections}
                  setSubsections={setSubsections}
                  subSection={exa[0]?.sub_section}
                  currSubSecName={currSubSecName}
                  setCurrSubSecName={setCurrSubSecName}
                  Answeredlength={Answeredlength}
                  notAnsweredlength={notAnsweredlength}
                  notVisitedlength={notVisitedlength}
                  markedforreviewlength={markedforreviewlength}
                  setAllSubSectionsImage = {setAllSubSectionsImage}
                />
              </div>
            {!isSmallScreen && <div>
              <div className="mt-9 hidden sm:block">
                <Language />
              </div>

              <div className=" hidden sm:block">
                <QuestionShow
                 currSubSecName={currSubSecName}
                  quecount={quecount}
                  allSubSectionsImage={allSubSectionsImage}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  que={questionInSequence}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  index={index}
                  setIndex={setIndex}
                  queLength={queLength}
                  handleSubmit={handleSubmit}
                  register={register}
                  handleAns={handleAns}
                  ansArray={ansArray}
                  response={response}
                  handleSaveNext={handleSaveNext}
                  handleSaveMarkForReview={handleSaveMarkForReview}
                  handleClear={handleClear}
                  toggle={toggle}
                  setToggle={setToggle}
                  setAnsArray={setAnsArray}
                  setResponse={setResponse}
                  setCheckedCheckboxes={setCheckedCheckboxes}
                  checkedCheckboxes={checkedCheckboxes}
                  ansType = {ansType}
                   setAnsType = {setAnsType}
                />
              </div>
              </div>
              }

             {isSmallScreen && <div className="block sm:hidden">
                <QuestionShowMobile
                  allSubSectionsImage = {allSubSectionsImage}
                  currSubSecName={currSubSecName}
                  quecount={quecount}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  que={questionInSequence}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  index={index}
                  setIndex={setIndex}
                  queLength={queLength}
                  handleSubmit={handleSubmit}
                  register={register}
                  handleAns={handleAns}
                  ansArray={ansArray}
                  response={response}
                  handleSaveNext={handleSaveNext}
                  handleSaveMarkForReview={handleSaveMarkForReview}
                  handleClear={handleClear}
                  toggle={toggle}
                  setToggle={setToggle}
                  setAnsArray={setAnsArray}
                  setResponse={setResponse}
                  setCheckedCheckboxes={setCheckedCheckboxes}
                  checkedCheckboxes={checkedCheckboxes}
                  ansType={ansType} 
                  setAnsType={setAnsType}
                />
              </div>}
            </div>
          )}
        </div>

        {toggle && (
          <div>
            <div className="hidden sm:block">
              <Profile name={student} />
              <QuestionCount
                eachsectionquestionslength={eachsectionquestionslength}
                subSections={subSections}
                currentSubSectionLastIndex={currentSubSectionLastIndex}
                setQueCount={setQueCount}
                count={count}
                setCount={setCount}
                que={exa}
                currSubSecName={currSubSecName}
                finalSubmit={finalSubmit}
                control={control}
                handleTimer={handleTimer}
                index={index}
                setIndex={setIndex}
                length={queLength + 1}
                reset={reset}
                ansType={ansType}
                notVisitedlength={notVisitedlength}
                answeredmarkedforreviewlength={answeredmarkedforreviewlength}
                markedforreviewlength={markedforreviewlength}
                Answeredlength={Answeredlength}
                notAnsweredlength={notAnsweredlength}
                onSubmit={onSubmit}
                setToggle={setToggle}
              />
            </div>
          </div>
        )}
      </div>
   }
      <div>
        {!toggle && (
          <SubmitJeeMains
            toggle={toggle}
            setToggle={setToggle}
            notVisitedlength={notVisitedlength}
            answeredmarkedforreviewlength={answeredmarkedforreviewlength}
            markedforreviewlength={markedforreviewlength}
            Answeredlength={Answeredlength}
            notAnsweredlength={notAnsweredlength}
            queLength={queLength}
            finalSubmit={finalSubmit}
            setResultToggle={setToggle}
            resultToggle={resultToggle}
          />
        )}
      </div>

      <div>
        {resultToggle && (
          <ResultAdv
            attemptId={attemptId}
            onResultData={handleResultData}
            notVisitedlength={notVisitedlength}
            answeredmarkedforreviewlength={answeredmarkedforreviewlength}
            markedforreviewlength={markedforreviewlength}
            Answeredlength={Answeredlength}
            notAnsweredlength={notAnsweredlength}
            queLength={queLength}
            finalSubmit={finalSubmit}
            setResultToggle={setResultToggle}
            resultToggle={resultToggle}
            finalDa={finalDa}
            que={sauravpaper}
            startTime={startTime}
            endTime={endTime}
            usedTimebeforeRefresh={usedTimebeforeRefresh}
            paperId={paperId}
          />
        )}
      </div>
    </div>
  );
};

export default JeeAdvancedPaperScreen;
