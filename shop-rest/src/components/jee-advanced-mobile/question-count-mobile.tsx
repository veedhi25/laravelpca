import { Eye } from "@components/icons/eye-icon";
import { useState } from "react";

const QuestionCountMobile = ({count,setQueCount, setToggle , eachsectionquestionslength ,subSections, currentSubSectionLastIndex , setCount , currSubSecName, que , setIndex, handleTimer , length , reset , ansType , notAnsweredlength , Answeredlength , markedforreviewlength , answeredmarkedforreviewlength , notVisitedlength , finalSubmit}) => {
    
    
  const [showSections , setShowSection] = useState(false)



    const handleIndex = (index) =>
    {
      handleTimer()
      setIndex(index);
      const data = eachsectionquestionslength - (currentSubSectionLastIndex - index)
      setQueCount(data);
      reset();
    }
  
    const questionFormat = ( question ) =>
    {
        return (`${question.toString().padStart(2,'0')}`)
    }
  
    const handleCount = () =>
    {
      setCount(pre => pre + 1)
    }
    
  
      return (  <div className="bg-blue-100 w-screen flex">
   
    <div className="w-[82%]  flex  overflow-x-auto gap-4 border-r border-blue-300 pb-1">
    
   
  

              
              {
                Array.from({length} , (_,index) =>
               {
                
                if(currSubSecName == que?.[index].question_subSection || currSubSecName == que?.[index].section_name)
                {
                  count++
  
                return  (<div key={index} onClick={()=> handleIndex(index)}  className={` bg-no-repeat bg-cover 
                bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo${ansType[index+1]}.png')] ml-1 mt-1  font-[300] text-lg `}
                style={{ color: ansType[index+1] == '1' ? 'black' : 'white' }}
                >
                 <div className="h-[40px] w-[40px] flex items-center justify-center">
                   {(count)}
                   </div>
                   </div>) 
               }
                   })
                 }

       
        </div> 
           
           <div onClick={() => setShowSection(!showSections)} className="w-[18%] flex justify-center self-center relative ">
             <Eye className="w-6 h-6" />
           

           { showSections &&  <div className=" ml-8 absolute top-9 bg-white right-1 border shadow-200 z-50">

           <div className="flex-row">
     <div className="flex  mt-2 ml-3.5 items-center">
     <div className="bg-[length:35px_35px] pl-[10px] pr-[10px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo3.png')] text-white text-sm">{Answeredlength}</div>
         
         <div className="text-sm ml-1 self-start">Answered</div>
            
         <div  className="ml-2 bg-[length:35px_35px] pl-[10px] pr-[10px] pt-[7px] pb-[7px] bg-no-repeat bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo2.png')] text-white justify-center items-center text-sm">{notAnsweredlength}</div>
          <div  className="ml-1 text-sm">Not Answered</div>
     
     </div>
   </div>
   <div className="flex-row">
     <div className="flex text-xl font-normal mt-3 ml-3 items-center">
         
         
         <div className="bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')] text-black text-sm"> <span >{notVisitedlength}</span> </div>
         
         <div className="ml-1 text-sm">Not Visited</div>
         <div  className="ml-2 bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo4.png')] text-white text-sm">{markedforreviewlength}</div>
          <div  className="ml-1 text-sm">Marked for Review</div>
     
     </div>
   </div> 

   <div className="flex-row">
     <div className="flex text-xl font-normal mt-3 ml-3.5 items-center">
         <div className=" bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')] text-white text-sm self-start">{answeredmarkedforreviewlength}</div>
         
         <div className="ml-1 text-sm">Answered & Marked for Review (will be considered for evaluation)</div>
            
         
     
     </div>
   </div>
       
                    </div>}
                    </div>
  
   
    </div>);
  }
   
  export default QuestionCountMobile;