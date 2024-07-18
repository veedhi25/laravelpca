const ShowQuestionCount = ({Answeredlength , notAnsweredlength , notVisitedlength , markedforreviewlength , answeredmarkedforreviewlength , title}) => {
    return ( <div>
        <div className="border-1 border border-black mr-4 md:mr-12 overflow-x-auto w-[300px] font-semibold">
       
         <div className="flex  mt-2 ml-1 items-center">
         <div className="bg-[length:35px_35px] pl-[10px] pr-[10px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo3.png')] text-white text-sm">0</div>
             
             <div className="text-sm ml-1 self-start">Answered</div>
        </div>

             <div className="flex  mt-2 ml-1 items-center"> 
             <div  className="bg-[length:35px_35px] pl-[10px] pr-[10px] pt-[7px] pb-[7px] bg-no-repeat bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo2.png')] text-white justify-center items-center text-sm">00</div>
              <div  className="ml-1 text-sm">Not Answered</div>
         
       
       </div>
       
         <div className="flex text-xl  mt-3  items-center">
             
             
             <div className="bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')] text-black text-sm"> <span >23</span> </div>
             
             <div className="ml-1 text-sm">Not Visited</div>
             </div>
             <div className="flex text-xl  mt-3  items-center">
             <div  className=" bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo4.png')] text-white text-sm">12</div>
              <div  className="ml-1 text-sm">Marked for Review</div>
         
         </div>
       

         <div className="flex-row mb-1">
     <div className="flex text-xl  mt-3 items-center">
         <div className=" bg-[length:32px_32px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] bg-no-repeat bg-center  bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')] text-white text-sm self-start">14</div>
         <div className="ml-1 text-sm">Answered & Marked for Review (will be considered for evaluation)</div>
     </div>
   </div>
         </div>
         </div>
       );
}
 
export default ShowQuestionCount;