
import { useForm, Controller } from 'react-hook-form';
import { useState , useEffect , useRef } from 'react';
import NumericKeypad from 'src/pages/void1';


const QuestionShow = ({setResponse , que , onSubmit  , toggle ,  setToggle  , handleClear ,  handleSubmit , register , handleAns   , index , setIndex, response , queLength , handleSaveNext , handleSaveMarkForReview ,setAnsArray , ansArray , checkedCheckboxes , setCheckedCheckboxes ,  }) => {
     
  const [inputValue, setInputValue] = useState(null);
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

console.log("trueKeys" , trueKeys);

  },[checkedCheckboxes])

  useEffect(()=>
  {
    if(inputValue !== null && inputValue !== ''){
      console.log("this is saurav")
    const newElement = inputValue
        let res = [...response]
        res.splice(index+1,1,newElement)
        setResponse(res);
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

  console.log(checkedCheckboxes)

   

  const type = "Integer" ;
  // const type = "any" ;
  // const type = "multiple ans" ;

  
    
    return ( <div className="flex ">
    <div>
    <div className="h-[calc(100vh-330px)] w-full overflow-auto flex-1" >

       
       <div  className=' border flex justify-between '>
        <h1 className="text-base font-semibold pt-1">Question No {index + 1}:</h1>
        <img src="https://www.nta.ac.in/img/QuizIcons/down.png" className='w-8 h-8'/>
        </div>
        <img src='advanced1.png' className=' max-w-full min-w-[50%]'/>
           <div>{que?.[index]?.question}</div> 
       <img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${que[index]?.question_img_url}`} className='max-w-full'/>
       
       {/* <img src='advanced2.png' className=' max-w-full'/> */}

       {type != "Integer" && type != "multiple ans" &&
       <form   onSubmit={handleSubmit(handleAns)} className="ml-6">
        
        {que?.[index]?.options?.map((opt , indexx)=>
        {
          return (<div className="mt-1 flex">
            <input type="radio" value={opt.id}  name="radiospage01" id="rOp-b8t" {...register("Ans")} defaultChecked={response[index+1] == opt.id} /> <img src="optiona.png" />
            </div> )
        })}
        
       
       </form>
         } 
         {type == "Integer" && 
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

         {type == "multiple ans" &&
         <form onSubmit={handleSubmit(onSubmit)}>
      {que?.[index]?.options?.map((option) => {
        // console.log("saurav data" , option)
       return  (<div key={option.id}>
          <label>
            <Controller
              name={option.value}
              control={control}
              // defaultValue={true}
              
              // defaultValue={response[index+1]?.includes(option.id)}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Update the form field
                    handleCheckboxChange({ [option.id]: e.target.checked });
                  }}
                  defaultChecked={checkCondition(option.id)}
                />
              )}
            />
            {option.label}
          </label>
        </div>)
})}
      
    </form>
}
    {/* <form   onSubmit={handleSubmit(handleAns)}  className=' ml-10 '>
        
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
       
       </form> */}
        
        

         

       
        
       
       
         
         

       <div className='border flex flex-row-reverse '>
       <img src="https://www.nta.ac.in/img/QuizIcons/down.png" className='w-8 h-8'/>
       </div>

       
       
    </div>

    <div className="h-5 border">

    </div>

    <div className='flex justify-between flex-wrap border items-center pl-3 lg:pl-6 max-h-30 pt-2 pb-2'>
        <div>
      <button  onClick={handleSubmit(handleSaveMarkForReview)}  className='border border-gray-300 rounded-sm font-semibold text-base   h-10  pl-4 pr-4 mr-2'>Mark For Review & Next</button>
      <button onClick={handleSubmit(handleClear)}   className='border border-gray-300 rounded-sm font-semibold text-base  h-10  pl-4 pr-4  text-black mr-2'>Clear Response</button>
      </div>
      <div>
      <button onClick={handleSubmit(handleSaveNext)}  className='border rounded-sm border-[#2e6da4] h-10 pl-4 pr-4 font-semibold text-base bg-[#337ab7] text-white mr-2'>Save & Next</button>
      </div>
    </div>

    

    </div>
    
    
  </div> );
}
 
export default QuestionShow;