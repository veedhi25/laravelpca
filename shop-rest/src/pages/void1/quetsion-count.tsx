const QuestionCount1 = ({setIndex, handleTimer , length , reset , ansType , notAnsweredlength , Answeredlength , markedforreviewlength , answeredmarkedforreviewlength , notVisitedlength , finalSubmit}) => {

  const handleIndex = (index) =>
  {
    handleTimer()
    setIndex(index);
    reset();
  }

  const questionFormat = ( question ) =>
  {
      

      return (`${question.toString().padStart(2,'0')}`)
  }
  

    return ( <div>
    <div className="border-3 border-black w-full mr-4 md:mr-12 overflow-x-auto">
    <div className="flex-row">
     <div className="flex  mt-2 ml-4 items-center">
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
     <div className="flex text-xl font-normal mt-3 ml-4 items-center">
         <div className=" bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')] text-white text-sm self-start">{answeredmarkedforreviewlength}</div>
         
         <div className="ml-1 text-sm">Answered & Marked for Review (will be considered for evaluation)</div>
            
         
     
     </div>
   </div>

   <div className="flex bg-[#337ab7] h-9 text-lg font-semibold items-center text-white pl-4">
     phy-sec-1
   </div>


    <div className="h-[calc(100vh-440px)] bg-[#cddeec]">
   <div className="text-sm ml-2 font-semibold">Choose a Question</div>
   {/* <div className="h-[calc(100vh-330px)]"> */}
   <div className="ml-2 mr-2  flex flex-wrap overflow-auto    ">

    
     
       
        
            
            {
              Array.from({length} , (_,index) =>
              ( <div key={index} onClick={()=> handleIndex(index)}  className={` bg-no-repeat bg-cover 
              bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo${ansType[index+1]}.png')] ml-1 mt-1  font-[400] text-lg `}
              style={{ color: ansType[index+1] == '1' ? 'black' : 'white' }}
              >
               <div className="h-[50px] w-[50px] flex items-center justify-center ">
                 {questionFormat(index+1)}
                 </div>
                 </div> ))
            }

     
      
      </div>
      {/* </div> */}
      </div>

      

  </div> 
  <div className="flex justify-center items-center bg-[#cddeec] h-14">
     <button onClick={finalSubmit} className="bg-[#59a0de] text-white text-base font-semibold pl-4 pr-4 pt-2 pb-2" >Submit</button>
     </div>
  </div>);
}
 
export default QuestionCount1;