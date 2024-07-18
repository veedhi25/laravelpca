
const Question_Count = ({setIndex, handleTimer , length , reset , ansType , notAnsweredlength , Answeredlength , markedforreviewlength , answeredmarkedforreviewlength , notVisitedlength}) => {
      
  // console.log("question count ansType" , ansType)

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

  
    return ( <div className="flex-col">
     <div className="border-4 border-dotted border-[#555] ml-6 mt-4 max-h-[450px] max-w-full mr-4 md:mr-12 overflow-x-auto">
       <div className="flex-row">
        <div className="flex text-xl font-normal mt-6 ml-4 items-center">
            <div className="bg-[length:45px_45px] pl-[16px] pr-[16px] pt-[9px] pb-[9px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')] text-black"> <span >{notVisitedlength}</span> </div>
            
            <div className="ml-2">Not Visited</div>
               
            <div  className="ml-6 bg-[length:45px_45px] pl-[16px] pr-[16px] pt-[9px] pb-[9px] bg-no-repeat bg-contain bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo2.png')] text-white justify-center items-center">{notAnsweredlength}</div>
             <div  className="ml-4">Not Answered</div>
        
        </div>
      </div>
      <div className="flex-row">
        <div className="flex text-xl font-normal mt-6 ml-6 items-center">
            <div className="bg-[length:45px_45px] pl-[16px] pr-[16px] pt-[9px] pb-[9px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo3.png')] text-white">{Answeredlength}</div>
            
            <div className="ml-4">Answered</div>
               
            <div  className="ml-6 bg-[length:45px_45px] pl-[18px] pr-[18px] pt-[9px] pb-[9px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo4.png')] text-white">{markedforreviewlength}</div>
             <div  className="ml-4">Marked for Review</div>
        
        </div>
      </div>

      <div className="flex-row">
        <div className="flex text-xl font-normal mt-6 ml-6 items-center">
            <div className="bg-[length:45px_45px] pl-[16px] pr-[16px] pt-[9px] pb-[9px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')] text-white">{answeredmarkedforreviewlength}</div>
            
            <div className="ml-4">Answered & Marked for Review (will be considered for evaluation)</div>
               
            
        
        </div>
      </div>

     </div>

     <div className="ml-10 pl-4 pt-10 pb-10 mr-4 lg:mr-16 flex flex-wrap overflow-auto  max-h-[450px]  ">
     
            
            {
              Array.from({length} , (_,index) =>
              ( <div key={index} onClick={()=> handleIndex(index)} className={` bg-no-repeat bg-cover 
              bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo${ansType[index+1]}.png')] ml-0.5 mt-0.5  font-[400] text-lg `}
              style={{ color: ansType[index+1] == '1' ? 'black' : 'white' }}
              >
               <div className="h-[42px] w-[42px] flex items-center justify-center ">
                 {questionFormat(index+1)}
                 </div>
                 </div> ))
            }

            
            
            {/* <div className="bg-[length:52px_42px] pl-[18px] pr-[18px] pt-[11px] pb-[11px] bg-no-repeat   bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')] text-black mb-1">99</div>
            <div className="bg-[length:52px_42px] pl-[18px] pr-[18px] pt-[11px] pb-[11px] bg-no-repeat   bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')] text-black mb-1">99</div> */}
            
            {/* <div key={index} onClick={()=> handleIndex(index)} className={` bg-no-repeat bg-cover 
               bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo${ansType[index+1]}.png')] ml-1 mt-1`}>
                <div className="h-[48px] w-[48px] flex items-center justify-center ">
                  {index+100}
                  </div>
                  </div> */}
           
           {/* <div key={index} onClick={()=> handleIndex(index)} className="bg-[length:52px_42px] pl-[18px] pr-[18px] pt-[11px] pb-[11px] bg-no-repeat   bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')] text-black mb-1">{questionFormat(index+90)}</div> */}
            
           
            
            
            
            
               
           
        
        
    
      
      </div>
    </div> );
}
 
export default Question_Count;