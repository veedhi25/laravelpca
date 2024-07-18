
import { useForm, Controller } from 'react-hook-form';
import { useState , useEffect , useRef } from 'react';
import NumericKeypad from 'src/pages/void1';
import { type } from './../../../../admin/src/ts-types/custom.types'; 
 

const QuestionShowMobile = ({setResponse, quecount ,inputValue, setInputValue, currSubSecName , allSubSectionsImage ,   que , onSubmit  , toggle ,  setToggle  , handleClear ,  handleSubmit , register , handleAns   , index , setIndex, response , queLength , handleSaveNext , handleSaveMarkForReview ,setAnsArray , ansArray , checkedCheckboxes , setCheckedCheckboxes , handleBack , ansType , setAnsType }) => {
     console.log("saurav" , que?.[index]?.question_type?.type)
     
  console.log("que?.question_type?.type" , que?.question_type?.type)

  const { control , watch , reset } = useForm();
  const inputRef = useRef(null);

 
  useEffect(()=>
  {
    const trueKeys = [];

  for (const key in checkedCheckboxes) {
  if (checkedCheckboxes[key] === true) { 
    trueKeys.push(key); 
  }

  let arr = [...response]
      arr.splice(index+1,1,trueKeys) 
      setResponse(arr);
}



  },[checkedCheckboxes])

  useEffect(()=>
  {
    if(inputValue !== null && inputValue !== ''){
   
      const newElement = inputValue
          let res = [...response]
          res.splice(index+1,1,newElement)
          setResponse(res);
      }
      if(inputValue == 'Clear All'){
        let res = [...response]
        res.splice(index+1,1,0)
        setResponse(res);
  
        let typ = [...ansType]
        typ.splice(index+1,1,'2')
        setAnsType(typ);
        setInputValue('');
        
    }
  },[inputValue])

  useEffect(()=>
  {
    setCheckedCheckboxes([])
    {response[index+1] === 0 ? setInputValue('') : setInputValue(response[index+1]) }
  },[index])

  const handleCheckboxChange = (value) => {
    setCheckedCheckboxes((prevChecked) => ({
      ...prevChecked,
      ...value, 
    })); 
  };

  const checkCondition = (id : any)=>
  {
    const stringid = String(id);
      if(response[index+1] == 0)
      {
        return false;
      }
      else if(Array.isArray(response[index+1]))
      {
        if(response[index+1].includes(stringid))
        { 
          return true;
        }
        else
        {
          return false;
        }
      }
  }


    console.log("allSubSectionsImage123",allSubSectionsImage)
    console.log("allSubSectionsImage1234",currSubSecName)

  
    
    return ( <div className="flex relative">
    <div>
    <div className="h-[calc(100vh-26vh)] w-full overflow-auto flex-1" >

       
       <div  className=' border'>
        <h1 className="text-base font-semibold pt-1">Question No : {quecount}</h1>
        
        </div>
        
        {/* {que?.[index]?.question_type?.type == 'MCQ' && <img src='/jee-mains-photo/Section1.png' className=' max-w-full min-w-[50%]'/> }
        {que?.[index]?.question_type?.type == 'Multiple Correct' && <img src='Multiple.png' className=' max-w-full min-w-[50%]'/> }
        {que?.[index]?.question_type?.type == 'Integer' && <img src='/jee-mains-photo/section2.png' className=' max-w-full min-w-[50%]'/> } */}
         {allSubSectionsImage[currSubSecName] && <img src={allSubSectionsImage[currSubSecName]} className=' w-full min-w-[50%] max-h-40  pointer-events-none cursor-not-allowed'/> }
         {/* {allSubSectionsImage[currSubSecName] && <img src={allSubSectionsImage[currSubSecName]} className=' w-full min-w-[50%] max-h-40'/> } */}

        {/* <div>
        <img src='Multiple.png' className=' max-w-full min-w-[50%]'/>
        </div>
        <div>
        <img src='Multiple.png' className=' max-w-full min-w-[50%]'/>
        </div>
        <div>
        <img src='Multiple.png' className=' max-w-full min-w-[50%]'/>
        </div>
        <div>
        <img src='Multiple.png' className=' max-w-full min-w-[50%]'/>
        </div> */}
           <div className='text-lg mx-6 mt-4 whitespace-pre-wrap' >{que?.[index]?.question}</div> 
       {que[index]?.question_img_url && <img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${que[index]?.question_img_url}`} className='max-w-full pointer-events-none cursor-not-allowed'/>}
       
       

       {que?.[index]?.question_type?.type != "Integer" && que?.[index]?.question_type?.type != "Multiple Correct" &&
       <form   onSubmit={handleSubmit(handleAns)} className="ml-6">
        
        {que?.[index]?.options?.map((opt , indexx)=>
        {
          return (<div className="mt-1 flex">
            <label className='mt-1 flex cursor-pointer'>
            <input type="radio" value={opt.id}  name="radiospage01" id="rOp-b8t" {...register("Ans")} defaultChecked={response[index+1] == opt.id} />
            {opt?.value && <span key={opt.id} className='ml-2 pointer-events-none cursor-not-allowed'>{opt?.value}</span>}
            {opt?.option_image_url && <span key={opt.id}><img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${opt?.option_image_url}`} className="ml-1 pointer-events-none cursor-not-allowed " /></span>}
            </label>
            </div> )
        })}
        
       
       </form>

         } 
         
         {que?.[index]?.question_type?.type == "Integer" && 
          <form   onSubmit={handleSubmit(handleAns)}  className=' ml-10 '>
        
          <div className="">
            
            <input
  
    className="text-base border border-1 border-black  pl-2"
    {...register("integer")}
    ref={inputRef}
    value={inputValue}
    defaultValue={response[index+1] === 0 ? null : response[index+1]  } 
  
  />
  <div className='w-[200px] bg-gray-100'>
  <div className='w-full flex justify-center pb-2'>
  <NumericKeypad inputValue={inputValue} setInputValue={setInputValue} inputRef={inputRef} />
  </div>
  </div>
            </div>   
         
         </form>
         }

         {que?.[index]?.question_type?.type == "Multiple Correct" &&
         <form className='ml-6'>
      {que?.[index]?.options?.map((option , index) => {
       
       return  (<div key={option.id} className='mt-1 flex'>
          <label className='mt-1 flex'>
            <Controller
              name={option.value == null ? `option${index}` : option?.value}
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Update the form field
                    handleCheckboxChange({ [option.id]: e.target.checked });
                  }}
                  checked={checkCondition(option.id)}
                />
              )}
            />
            <span><img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${option?.option_image_url}`} className="ml-1 " /></span>
          </label>
        </div>)
})}  
    </form>
}


         

       <div className='border flex flex-row-reverse '>
      
       </div>

       
       
    </div>

    <div className="h-5 border">

    </div>

    <div className='bg-gray-100 fixed bottom-0 w-full'>
        <div className='flex justify-between'>
     
      <div>
      <button onClick={handleSubmit(handleClear)}   className='border border-gray-300 rounded-sm  text-sm h-8 bg-white pl-2 pr-2  text-black mt-2 mb-2 ml-1'>Clear Response</button>
      </div>
      <div>
        { quecount != 1 &&  <div>
       <button onClick={handleBack}   className='border border-gray-300 rounded-sm   text-sm h-8 bg-white pl-2 pr-2  text-black mt-2'>Previous</button>
      </div>}
      <div>
      <button  onClick={handleSubmit(handleSaveMarkForReview)}  className='border border-gray-300 rounded-sm  text-sm h-8 bg-white pl-2 pr-2  text-black mt-2 mb-2 mr-1'>Mark For Review & Next</button>
      </div>
      </div>
      </div>
      <div className='flex justify-between'>
      <button onClick={()=>setToggle(false)}  className='w-[50%] h-10 pl-4 pr-4 font-semibold text-base bg-[#337ab7] text-white'>Submit</button>
      <button onClick={handleSubmit(handleSaveNext)}  className='w-[49%] h-10 pl-4 pr-4 font-semibold text-base bg-green-600 text-white '>Save & Next</button>
      </div>
    </div>

    

    </div>
    
    
  </div> );
}
 
export default QuestionShowMobile;