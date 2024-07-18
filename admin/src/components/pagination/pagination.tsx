import { useForm } from "react-hook-form";

const Pagination = ({currentPage ,setCurrentPage , totaldata , dataPerPage} : any)=>
{
  const number = [];
  console.log("currentPage" , currentPage)
  console.log("totaldata" , totaldata)

  const { handleSubmit , register , reset } = useForm();

  for(let i = 1; i<=Math.ceil(totaldata/dataPerPage); i++)
  {
    number.push(i);
  }
  console.log("number" , number)

  const handleNext = ()=>
  {
    setCurrentPage((pre)=>(pre + 1))
  }
  const handlePrevious = ()=>
  {
    setCurrentPage((pre)=>(pre - 1))
  }
  
  const onSubmit = (data : any) =>
  {
    console.log("data" , data) ;
    console.log("data Math.ceil(totaldata/dataPerPage" , Math.ceil(totaldata/dataPerPage)) ;

    const pageNo = parseInt(data?.pageNo);
    if(pageNo > 0 && pageNo <= Math.ceil(totaldata/dataPerPage) )
    {
    setCurrentPage(pageNo);
    reset();
    }
    else
    {
      console.log("hi thsi is saurav")
      reset();
    }

   
  }

   return (
    <div className="">
    <div className="flex gap-1 flex-wrap">

      <button onClick={handlePrevious} disabled={currentPage == 1} className='cursor-pointer  bg-white flex justify-center items-center h-9 w-24 border text-gray-600 ml-1' >&lt;&lt;&nbsp;Previous</button>
       {
        number?.slice( currentPage < 4 ? 0 : currentPage-4 ,currentPage < 4 ? 7 : currentPage + 3)?.map((num)=>
        {
          return (<div key={num} onClick={()=>(setCurrentPage(num))} className={ num == currentPage ? 'flex justify-center items-center h-9 w-9 border text-white bg-blue-600 cursor-pointer' : 'cursor-pointer  bg-white flex justify-center items-center h-9 w-9 border text-gray-600'} >{num}</div>)
        })
       }
       <button onClick={handleNext} disabled={currentPage == Math.ceil(totaldata/dataPerPage)} className='cursor-pointer  bg-white flex justify-center items-center h-9 w-24 border text-gray-600 mr-1'>Next&nbsp;&gt;&gt;</button>
       
       <form onSubmit={handleSubmit(onSubmit)} className="flex" >
       <button  className='cursor-pointer  bg-white flex justify-center items-center h-9 w-24 border text-gray-600 mr-1'>Go to page</button>
        <input type="number" {...register("pageNo")} className=" w-[100px] h-9 border pl-4"></input>
       
       </form>


    </div>
    </div>
   )
}


export default Pagination;