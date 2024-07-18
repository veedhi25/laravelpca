import Link from "next/link";

const Result = ({startTime , endTime ,  finalDa , que , resultToggle ,  finalSubmit ,  setToggle , queLength , notAnsweredlength , Answeredlength , markedforreviewlength , answeredmarkedforreviewlength , notVisitedlength}) => {

    console.log("result finaldata", finalDa)
    console.log("result que", que)
    let score = 0;
    let correct = 0;
    let wrong = 0;
    // const score = finalDa.answers.map((data)=>
    // {
    //    if(data.correct_id == data.selectedId)
    //    {

    //    }
    // })

    const time = endTime -  startTime

    for (const data of finalDa?.answers) {
        if(data.selectedId)
        {
        if(data.correct_id == data.selectedId)
       {
           score = score + parseInt(data.marks)
           correct = correct + 1;
       }
       if(data.correct_id != data.selectedId)
       {
            score = score - parseInt(data.negative)
            wrong = wrong + 1;
       }
         }
      }


      console.log("score" , score)

    return (  <>


        <h1 className="font-black  text-2xl text-center mt-8">Result</h1>

        
        
    
    <div className='flex ml-12 mr-12 border-b mt-6 mb-6 pb-6'>
        <div className='pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 border-r'>
            <h1>Total Marks</h1>
            <div>{que.total_marks}</div>
        </div>
        <div className='pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 border-r'>
            <h1>Total Questions</h1>
            <div>{queLength + 1}</div>
        </div>
        <div className='pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 border-r'>
            <h1>Score</h1>
            <div>{score}</div>
        </div>
        <div className='pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 border-r'>
            <h1>Correct questions</h1>
            <div>{correct}</div>
        </div>
        <div className='pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 border-r'>
            <h1>Wrong questions</h1>
            <div>{wrong}</div>
        </div>
        <div className='pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 '>
            <h1>Time Taken</h1>
            <div>{Math.floor((time/1000)/60)} min {Math.floor((time/1000)%60)} sec </div>
        </div>
    </div>


    <table className="min-w-full bg-white mt-8 border">
                <thead>
                    <tr>
                        <th className="w-1/4 py-2 px-4 border">Question No.</th>
                        <th className="w-1/4 py-2 px-4 border">Selected Option</th>
                        <th className="w-1/4 py-2 px-4 border">Status</th>
                        <th className="w-1/4 py-2 px-4 border">Correct Option</th>
                    </tr>
                </thead>
                <tbody>
                    {finalDa.answers.map((data, index) => {
                        // Get the index of the selected option.
                        const selectedIndex = data.options?.findIndex(option => option.id === data.selectedId) || -1;
                        
                        return (
                            <tr key={index}>
                                <td className="py-2 px-4 border">Question {index + 1}:</td>
                                <td className="py-2 px-4 border">{selectedIndex !== -1 ? selectedIndex + 1 : '---'}</td>
                                <td className={` ${data.correct_id === data.selectedId ? 'bg-green-500 p-1' : 'bg-red-600 p-1'} py-2 px-4 border`}>{data.correct_id === data.selectedId ? 'Correct' : data.selectedId ? 'Wrong' : 'N/A'}</td>
                                <td className="py-2 px-4 border">{data.correct_id}</td>
                            </tr>
                        );
                    })}
                </tbody>
    </table>

        

    <div>
    <div>
      
       <h1 className="font-black  text-2xl text-center ">
        Go to Dashboard</h1>
        </div>

     <div className='flex justify-center text-base font-bold'>
        <Link href="/student-dashboard"><button  className='border h-14 w-28 ' onClick={finalSubmit } >Dashboard</button></Link>
         {/* <button className='ml-2 border h-14 w-20' onClick={() => setToggle(!toggle) }  >NO</button> */}
     </div>
     </div>



    
     </> );
}
 
export default Result;