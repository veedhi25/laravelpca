const PreviewQuestion = ({data}) => {
    
    console.log("saurav" , data?.data)
    return (  <div className="bg-white p-4 rounded-lg shadow-md flex">
    <div className="w-3/5">
      <h2 className="text-lg font-semibold mb-2">Question:</h2>
      {
        data?.data?.question && (
               <div><p className="mb-4">{data?.data?.question}</p></div>
        )
      }
      
      {data?.data?.question_img_url && (
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${data?.data?.question_img_url}`}
            alt="MCQ Image"
            className="max-w-full min-w-[400px] rounded-lg"
          />
        </div>
      )}
    </div>

    <div className="w-2/5 pl-8">
      <h2 className="text-lg font-semibold mb-2">Options:</h2>
      <ol className="list-disc ml-6 space-y-2">
      {data?.data?.options?.map((option) => {
          
           return ( <li className="mb-2">{option.value}</li>)
      })}
      </ol>

      <h2 className="text-lg font-semibold mt-4">Correct Answer:</h2>
      <p className="mb-4">{data?.data?.correct_option?.value}</p>

      <h2 className="text-lg font-semibold mt-4">Question Type:</h2>
      <p className="mb-4">{data?.data?.question_type.type}</p>

      <h2 className="text-lg font-semibold mt-4">Section:</h2>
      <p className="mb-4">{data?.data?.section?.name}</p>
      
      <h2 className="text-lg font-semibold">Marks:</h2>
      <p className="mb-4">{data?.data?.marking_Scheme?.marks}</p>

      <h2 className="text-lg font-semibold">Negative Marking:</h2>
      <p>{data?.data?.marking_Scheme?.negative}</p>
    </div>
  </div> );
}
 
export default PreviewQuestion;



{/* <div className="pt-4 ml-8 mr-8 pb-4">
        <h1 className="mb-4 text-2xl font-bold ">Your Total Selected Question <span className="ml-2 ">({data?.data?.length})</span></h1>
        {data?.data?.map((que)=>{
            return (<div className="flex  mb-2 text-xl border-b pb-2">
                <div className="w-[800px]">
                    
                {que.question}
                </div>
                <div className="ml-6">
                    {que.question_type.type}
                </div>
                <div className="ml-6">
                    {que.section.name}
                </div>
            </div>)
        })}
        </div> */}





    //     <div className="bg-white  text-center text-lg " >
    //            <h1 className="pt-2 mb-4 text-2xl font-bold ">Question Details</h1>
    //    <div className="flex  mb-2 text-xl  pb-2 mr-4">
    //    <div className="w-[700px] ">
                    
    //             {data?.data?.question}
    //             </div>
    //             <div className="ml-10">
    //             <div className="text-lg font-medium">Type</div>
    //                 {data?.data?.question_type.type}
    //             </div>
    //             <div className="ml-10">
    //             <div className="text-lg font-medium">Section</div>
    //                 {data?.data?.section.name}
    //             </div>
    //             </div>

                
    //  <div className="flex">
    //     <div className="w-[700px]">
    //  <img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${data?.data?.question_img_url}`} className=' max-w-full'/>
    //   </div>

    //   <div>
    //   <div className="ml-10 flex">
    //     <div>
    //     <div className="text-lg font-medium mt-2">Marks</div>
    //     {data?.data?.marking_Scheme?.marks}
    //     </div>
    //     <div className="ml-10">

    //     <div className="text-lg font-medium mt-2 mr-2">Negative</div>
    //     {data?.data?.marking_Scheme?.negative}
    //     </div>
    //   </div>

      

    //   <div className="ml-10 flex">
    //     <div>
    //     <div className="text-lg font-medium mt-4">Options</div>
    //       {data?.data?.options?.map((opt)=>
    //       {
    //         return (<div>{opt.value}</div>)
    //       })
    //      }
    //     </div>
    //   </div>
      
    //   <div className="ml-10 flex">
    //     <div>
    //     <div className="text-lg font-medium mt-2">Correct Ans</div>
    //       {data?.data?.correct_option?.value}
    //     </div>
    //   </div>
      

    //   </div>
    //  </div>

     
    // </div>