import CountDownTimer from '../time/countdownTimer'
const CandidateDetails = ({setEndExam , student , examNmae , subjectName , time , timeAfterRestart , setTimeAfterRestart}) => {
     

    const totaltim = parseInt(time)
    const totaltime = totaltim*60
    console.log("totaltime" , totaltime)

     const finalSubmit = ()=>
     {
        setEndExam(true)
     }


     
    return ( <div className=" max-h-[300px] min-h-[100px] flex flex-col lg:flex-row  items-center justify-between mt-2 bg-[url('https://www.nta.ac.in/img/texture-frozen-window.jpg')]">
        
        <div className="flex min-h-[90px] max-[h-150px] ml-14 items-center ">
        <div className="min-h-[95px] max-h-[110px]   w-[90px]  border-2 border-black ">
             
        </div >
        <div className="flex-col ml-2 font-medium lg:text-xl mr-1 ">
            <div className="">
                Candidate Name 
            </div>
            <div className="-mt-1">
                Exam Name 
            </div>
            <div className="-mt-1">
                Subject Name 
            </div>
            <div className="-mt-1">
                Remaining Time 
            </div>

        </div>

        <div className="flex-col lg:text-xl">
            <div  >
                : <span style={{color:'#f7931e'}} className="font-bold ">[{student?.me?.name}]</span>
            </div>
            <div className="-mt-1" >
               : <span style={{color:'#f7931e'}} className="font-bold ">[{examNmae}]</span>
            
            </div>
            <div className="-mt-1" >
                 : <span style={{color:'#f7931e'}} className="font-bold ">{subjectName}</span>
            </div>
            <div className="-mt-1">
                : <span   className="text-lg font-medium bg-[#0098DA] text-white pl-4 pr-4 rounded-full ">{<CountDownTimer finalSubmit={finalSubmit} data={totaltime} warningTime={300} timeAfterRestart={timeAfterRestart} setTimeAfterRestart={setTimeAfterRestart} />}</span>
            </div>

        </div>
        </div>

        <div >

            <select className="h-10 w-[200px] md:w-[300px] mr-12 sm:pt-2 border border-black flex-col text-base pl-4" >
                <option >English</option>
                <option>Hindi</option>
                <option>Gujrati</option>
               
            </select>
            
        </div>
    </div> );
}
 
export default CandidateDetails;