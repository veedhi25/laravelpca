import { useRouter } from "next/router";

const Question_Show = ({que , toggle ,  setToggle  , handleClear ,  handleSubmit , register , handleAns , handleNext , handleBack , index , setIndex, response , queLength , handleSaveNext , handleSaveMarkForReview , handleMarkForReview} ) => 
{
    console.log('exam_question' , que)
    const router = useRouter()

    // const type = 'integer'
    const type = que[index]?.question_type.type


    return (<div className="flex mt-12 ">
    <div className=" md:w-10 " > </div>
    <div>
    <div className="h-[calc(100vh-470px)] w-full overflow-auto flex-1" >

       
       <div  className='border-b border-black pt-2 flex justify-between '>
        <h1 className="text-2xl font-black  ">Question {index + 1}:</h1>
        <img src="https://www.nta.ac.in/img/QuizIcons/down.png" className='w-10 h-10'/>
        </div>
           <div>{que?.[index]?.question}</div> 
       <img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${que[index]?.question_img_url}`} className=' max-w-full min-w-[50%]'/>
       {/* <img src={que[index]?.show?.image?.medium} className=' max-w-full min-w-[50%]'/> */}
       {type != "integer" &&
       <form   onSubmit={handleSubmit(handleAns)}  className='grid grid-cols-4  h-12 text-xl ml-4'>
         
        {que?.[index]?.options?.map((opt , indexx)=>
        {
          return (<div>
            <input type="radio" value={opt.id}  name="radiospage01" id="rOp-b8t" {...register("Ans")} defaultChecked={response[index+1] == opt.id} />  {indexx+1} )
            </div> )
        })}
        
        
        
        {/* <div>
       <input type="radio" value="1"  name="radiospage01" id="rOp-b8t" {...register("Ans")} defaultChecked={response[index+1] === '1'} />   1 )
       </div> 
       <div>
       <input type="radio" value="2"  name="radiospage01" id="rOp-b8t" {...register("Ans")} defaultChecked={response[index+1] === '2'} />   2 )
       </div>
       <div>
       <input type="radio" value="3"   name="radiospage01" id="rOp-b8t" {...register("Ans")}  defaultChecked={response[index+1] === '3'}  />   3 )
       </div>
       <div>
       <input type="radio" value="4"  name="radiospage01" id="rOp-b8t" {...register("Ans")} defaultChecked={response[index+1] === '4'} />   4 )
       </div> */}
       {/* <button>submit</button> */}
       
       </form>
         } 
         {type == "integer" &&
       <form   onSubmit={handleSubmit(handleAns)}  className='  h-12 text-xl ml-4'>
        
        <div className="flex">
          Type Your Answer
        <input
       
         className="text-lg border-2 ml-2 mb-4 h-12  bg-gray-100 pl-2"
         {...register("integer")}
           />
          </div>   
       
       </form>
         }
          {/* {que.map((data) =>
          {
            return (<div key={data?.show?.id} className=" ">
              
          <img src={data?.show?.image?.medium} className=' max-w-full min-w-[50%]'/>

          <div className='grid grid-cols-4  h-12 text-xl ml-4'>
          <div>
         <input type="radio" value="1"  name="radiospage01" id="rOp-b8t"/>   1 )
         </div>
         <div>
         <input type="radio" value="2"  name="radiospage01" id="rOp-b8t"/>   2 )
         </div>
         <div>
         <input type="radio" value="3"  name="radiospage01" id="rOp-b8t"/>   3 )
         </div>
         <div>
         <input type="radio" value="4"  name="radiospage01" id="rOp-b8t"/>   4 )
         </div>
         </div> 
         </div>  )
          })} */}

       <div className='border-t border-black flex flex-row-reverse h-16 mt-4'>
       <img className='w-10 h-10' src="https://www.nta.ac.in/img/QuizIcons/up.png" />
       </div>

       
       
    </div>
    <div className='flex flex-wrap border-t border-black items-center pl-3 lg:pl-6 max-h-30 pt-2'>
      <button onClick={handleSubmit(handleSaveNext)} className='border border-[#4cae4c] h-10 font-bold pl-4 pr-4 text-lg bg-[#5cb85c] text-white mr-2'>SAVE & NEXT</button>
      <button onClick={handleSubmit(handleClear)}  className='border  h-10 font-bold pl-4 pr-4 text-lg  text-black mr-2'>CLEAR</button>
      <button onClick={handleSubmit(handleSaveMarkForReview)}  className='border border-[#eea236] h-10 font-bold pl-4 pr-4 text-lg bg-[#f0ad4e] text-white mr-2'>SAVE &MARK FOR REVIEW</button>
      <button onClick={handleSubmit(handleMarkForReview)} className='border border-[#2e6da4] h-10 font-bold pl-4 pr-4 text-lg bg-[#337ab7] text-white mr-2'>MARK FOR REVIEW & NEXT</button> 
    </div>

    <div className='flex justify-between mt-4 border-t border-[#ddd] min-h-[70px] max-h-[100px] bg-[#f5f5f5] items-center -ml-4'>
      <div>
      <button  disabled={index == 0 ? true : false } onClick={handleBack} className=' border border-[#ddd] h-10 font-bold pl-4 pr-4 text-lg text-black  lg:ml-4'>&lt;&lt; BACK  </button>
      <button  disabled={index == queLength ? true : false } onClick={handleNext} className='border border-[#ddd] h-10 font-bold pl-4 pr-4 text-lg text-black '>NEXT &gt;&gt;</button>
        
      </div>
      <div>
      <button onClick={() => setToggle(!toggle)} className='border border-[#4cae4c] h-10 font-bold pl-4 pr-4 text-lg bg-[#5cb85c] text-white mr-4'>SUBMIT</button>
      </div>
    </div>

    </div>
    
    <div>
       3
       </div>
  </div> );
}
 
export default Question_Show;