import Question_Show from "./question_show";
import Question_Count from "./question_count";
import { useState , useRef , useEffect} from "react";
import {useForm } from "react-hook-form"
import { useQuery } from "react-query";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useExamsQuery } from '@data/exams/use-exams.query';
import SubmitJeeMains from '@components/jee_mains/submit';
import { useExamQuery } from './../../data/exams/use-exam.query';
import { useEndExamMutation } from "@data/exam-submit/use-exam-submit.mutation";
import Result from "./result";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";




const Middle = ({endExam , paperId , sauravpaper , setTimeAfterRestart , attemptId  }) => {
 
   if(!sauravpaper) return 'loading...'

  const [resultToggle , setResultToggle] = useState(false)

     
     const {data : abc} = useExamsQuery()

     console.log("abc" , abc);

     const {handleSubmit , register , reset , watch } = useForm()
     
    const [toggle , setToggle] = useState(true)
  
    let [index , setIndex] = useState(0);
    let [response , setResponse] = useState(Array(100).fill(0));
    let [ansArray , setAnsArray] = useState(Array(100).fill(0));
    let [ansType , setAnsType] = useState(Array(100).fill('1'));
    console.log('saurav ans array' , ansType)
    const [finalDa , setFinalDa] = useState();
    const [startTime , setStarttime] = useState();
    const [endTime , setEndtime] = useState();
    const [timeArray , setTimeArray] = useState([]);

    useEffect(()=>
     {
      console.log("watch ans" , watch("Ans") )
      if( watch("Ans") == null )
      {

        if(ansType[index+1] != '1')
        {
          
          return;
        }
        else{
          const newElement = '2'
        let type = [...ansType]
        type.splice(index+1,1,newElement)
        setAnsType(type);
        return ;

        }

        
      }
      const newElement = watch("Ans")
    let res = [...response]
    res.splice(index+1,1,newElement)
    setResponse(res);
     
     }, [index ,watch("Ans") ])
 

    useEffect(()=>
    {
      const data = JSON.parse(localStorage.getItem(`${paperId}response`));
      const data1 = JSON.parse(localStorage.getItem(`${paperId}ansArray`));
      const data2 = JSON.parse(localStorage.getItem(`${paperId}ansType` ));
      const data3 = JSON.parse(localStorage.getItem(`${paperId}index` ));
      const data4 = JSON.parse(localStorage.getItem(`${paperId}time` ));
      const data5 = JSON.parse(localStorage.getItem(`${paperId}attemptId` ));

  
      console.log("data4", data)
      console.log("data5", data1)
      console.log("data6", data2)
      console.log("data6", data3)
     
      
      
     if(data != null && data1 != null){
     setResponse(data)
      setAnsArray(data1)
      setAnsType(data2)
      setIndex(data3)
      setTimeAfterRestart(data4)
     }
    },[])
    
    useEffect(()=>
    {
      
      const data = JSON.stringify(response)
      const data2 = JSON.stringify(ansArray)
      const data3 = JSON.stringify(ansType)
      const data4 = JSON.stringify(index)
      const data5 = JSON.stringify(attemptId)
    
      localStorage.setItem(`${paperId}response` , data);
      localStorage.setItem(`${paperId}ansArray` , data2);
      localStorage.setItem(`${paperId}ansType` , data3);
      localStorage.setItem(`${paperId}index` , data4);
      localStorage.setItem(`${paperId}attemptId` , data5);
      
    
    },[response , ansArray ,  ansType ])

    
    const { t } = useTranslation();
    const timeRef = useRef(0)
    
     console.log( 'timeRef' ,  timeRef)
     console.log( 'timeArray' ,  timeArray)
    
    const endExamMutation = useEndExamMutation()

    const exa = sauravpaper ?  sauravpaper?.questions : null ;

    const {data:student} = useCustomerQuery();

    console.log('user', student)




 
    const router = useRouter();
  
    useEffect(()=>
    {
      if(resultToggle == true)
      {
        return;
      }

      if(endExam)
      {
        toast.info(t("Time Over"));
      
        setToggle(false)
        finalSubmit();

      }

    }, [endExam])

    useEffect(()=>
    {
      
      setStarttime(new Date());

      const timer = setInterval(() => {
       
        timeRef.current = timeRef.current + 1 ;

      }, 1000);
   

    return () => {
      clearInterval(timer);
    };

    },[])

    const handleTimer = ()=>
    {
      if(timeArray[index+1] == null)
      {
        timeArray[index+1]  = timeRef.current
     
         timeRef.current = 0;
      }
      else
      {
        timeArray[index+1] = timeArray[index+1] + timeRef.current
        timeRef.current = 0;
      }
    }
    
    const handleNext = () =>
     { 
      if(index == queLength)
      {
        return 
      }
         handleTimer();
          index++;
          setIndex(index);
          reset()
     }

     const handleBack = () =>
     {
         handleTimer()
          index--;
          setIndex(index);
          reset()
     } 


     const handleClear = () =>
     {
        const res = 0;

        let arr = [...response];
        arr.splice(index+1,1,res)
        setResponse(arr);
        setAnsArray(arr);
        
        let arr1 = [...ansType]
        arr1.splice(index+1,1,'2')
        setAnsType(arr1)
       reset();
     }


     const handleAns = (data)=>
     {
      const newElement = data.Ans
      let arr = [...ansArray]
      arr.splice(index+1,1,newElement)
      setAnsArray(arr);
      reset();
     }

     const handleSaveNext = (data)=>
     {
        if(response[index+1] == 0)
        {
            alert("Please choose an option")
            return ;
        }

      const ansTy = '3'
        let type = [...ansType]
        type.splice(index+1,1,ansTy)
        setAnsType(type);

      const newElement = response[index+1]
      let arr = [...ansArray]
      arr.splice(index+1,1,newElement)
      setAnsArray(arr); 
      handleNext();
     }

     const handleSaveMarkForReview = (data)=>
     {

        if(response[index+1] == 0)
        {
            alert("Please choose an option")
            return ;
        }

      const ansTy = '5'
        let type = [...ansType]
        type.splice(index+1,1,ansTy)
        setAnsType(type);

    const newElement = data.Ans
    let arr = [...ansArray]
    arr.splice(index+1,1,newElement)
    setAnsArray(arr);
    handleNext();
     }
     const handleMarkForReview = (data)=>
     {
      const ansTy = '4'
        let type = [...ansType]
        type.splice(index+1,1,ansTy)
        setAnsType(type);

     
      handleNext();
     }

     

     

     const finalSubmit = () =>
     {
      setEndtime(new Date());
      console.log("response" , response);
      console.log("ansarray" , ansArray);
      
      const attemptquestions = exa?.map((que , indexx) =>
      {
        return {
          questionId : que?.id , selectedId :ansArray[indexx + 1] , responseId : response[indexx  + 1] , correct_id : que?.correct_options[0]?.id , marks : que?.marks , negative : que?.negative_marks , time : timeArray[indexx + 1]  }
      })
      
     const time = (new Date()) - startTime;
     //  console.log("endTime" , endTime);
     //  console.log("startTime" , startTime);

      const finaldata = {
        student_id: student?.me?.id,
        exam_id : paperId,
        answers : attemptquestions,
        total_time : Math.floor(time/1000),
      }
      
      setFinalDa(finaldata);

      endExamMutation.mutate({ examData: finaldata, attemptId: router?.query?.attemptId });
      
      console.log("finalData",finaldata);

      localStorage.removeItem(`${paperId}response`)
      localStorage.removeItem(`${paperId}ansArray`)
      localStorage.removeItem(`${paperId}ansType` )
      localStorage.removeItem(`${paperId}index` )
      localStorage.removeItem(`${paperId}time` )
      localStorage.removeItem(`${paperId}attemptId` )
       
      setResultToggle(true);

     }

    

      console.log("response" , response);
      console.log("ansarray" , ansArray);
      console.log("ansType",ansType);

     if(!sauravpaper) return "loading..."
     console.log("sauravpaper" , sauravpaper)
     
    const queLength = exa?.length - 1;
    
    // console.log(que);
    // const notVisited = ansType.filter((qes) => qes == '1');
    // const notVisitedlength = notVisited.length
  const notAnswered = ansType.filter((qes) => qes == '2');
  const notAnsweredlength = notAnswered.length
  const Answered = ansType.filter((qes) => qes == '3');
  const Answeredlength = Answered.length
  const markedforreview = ansType.filter((qes) => qes == '4');
  const markedforreviewlength = markedforreview.length
  const answeredmarkedforreview = ansType.filter((qes) => qes == '5');
  const answeredmarkedforreviewlength = answeredmarkedforreview.length
  
  const notVisitedlength = queLength + 1 - answeredmarkedforreviewlength - markedforreviewlength - Answeredlength - notAnsweredlength

    return ( 
    
    <div className="">
      <div className="flex flex-col lg:grid lg:grid-cols-3 ">
         
          <div className="lg:col-span-2">
            { toggle &&  <Question_Show que={exa} handleNext={handleNext} handleBack={handleBack} index={index} setIndex={setIndex} queLength={queLength} handleSubmit={handleSubmit} register={register} handleAns={handleAns} ansArray={ansArray}  response={response} handleSaveNext={handleSaveNext} handleSaveMarkForReview={handleSaveMarkForReview} handleMarkForReview={handleMarkForReview} handleClear={handleClear} toggle={toggle}  setToggle={setToggle} />}
          </div>
          <div>
          { toggle &&   <Question_Count handleTimer={handleTimer} index={index} setIndex={setIndex} length={queLength + 1} reset={reset} ansType={ansType} notVisitedlength={notVisitedlength} answeredmarkedforreviewlength={answeredmarkedforreviewlength}  markedforreviewlength={markedforreviewlength}  Answeredlength={Answeredlength}  notAnsweredlength={notAnsweredlength}                             />}
          </div>
      </div>

       <div>
        { !toggle &&   <SubmitJeeMains toggle={toggle} setToggle={setToggle} notVisitedlength={notVisitedlength} answeredmarkedforreviewlength={answeredmarkedforreviewlength}  markedforreviewlength={markedforreviewlength}  Answeredlength={Answeredlength}  notAnsweredlength={notAnsweredlength} queLength={queLength} finalSubmit={finalSubmit}    setResultToggle={setResultToggle} resultToggle={resultToggle} />}
        </div>
       <div>
        { resultToggle &&   <Result toggle={toggle} setToggle={setToggle} notVisitedlength={notVisitedlength} answeredmarkedforreviewlength={answeredmarkedforreviewlength}  markedforreviewlength={markedforreviewlength}  Answeredlength={Answeredlength}  notAnsweredlength={notAnsweredlength} queLength={queLength} finalSubmit={finalSubmit}    setResultToggle={setResultToggle} resultToggle={resultToggle} finalDa={finalDa} que={sauravpaper} startTime={startTime} endTime={endTime} />}
        </div>

    </div> );
}
 
export default Middle;