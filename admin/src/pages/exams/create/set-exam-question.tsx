import Label from "@components/ui/label";
import { useForm, FormProvider, Controller } from 'react-hook-form';
import Select from '@components/ui/select/select';
import { useTranslation } from 'next-i18next';
import { classNames } from 'classnames';
import { useEffect, useState } from "react";
import { useModalAction } from "@components/ui/modal/modal.context";
// import { Table } from "@components/icons/category";
import { Table } from "@components/ui/table";
import { Eye } from "@components/icons/eye-icon";


                       

const SetExamQuestion = ({setToggle ,questionToggel,setQuestionToggle, toggle , sections , questionType , que , qusWithMarking , setQusWithMarking ,
  filterquestion , setFilterQuestion , finalQuestion ,setFinalQuestion , onSubmit , handleSubmit , markingScheme }) => {
   
    
     const [currentSection , SetCurrentSection] = useState('')
     const [currentType , SetCurrentType] = useState('')

    const markingSch =  markingScheme.data.map((data)=> 
    
    {
      return {label: data.name , id: data , marks : data.marks , negative: data.negative_marks }
          
    })

    useEffect(()=>{
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // This makes the scrolling smooth, omit it for instant scrolling
      });
      
     handleQuestion(currentSection,currentType);

    },[questionToggel]);
    
    const methods = useForm({  });

      const { t } = useTranslation();
      
      const { openModal }  = useModalAction()

    function handlePreview (data)
     {
      return  openModal('PREVIEW_QUESTION' , {
      data
      }) 
     }

      const handleQuestion = (section , questiontype) =>
      {
        SetCurrentSection(section);
        SetCurrentType(questiontype);

        if(questionToggel){
          let currentque = que?.filter((ques) =>
        {
          return (ques?.section?.name === section && ques?.question_type?.type === questiontype)
        })
        setFilterQuestion(currentque);
        }
         else
         {
          let currentque = finalQuestion?.filter((ques) =>
         {
          return (ques?.section?.name === section && ques?.question_type?.type === questiontype)
        })
        
        setFilterQuestion(currentque);
          
         }
        
      }

     
      const handleAdd = (id)=>
      {
        const qe = qusWithMarking.filter((q) => q.id == id)
        const qqq = qe[0]
        
        {
          qqq?.marking_Scheme ? setFinalQuestion([...finalQuestion , qqq]) : alert("please select marking sceme")
        }
      }

      const handleRemove = (id)=>
      {
        const updatedQue = finalQuestion.filter((ques) =>
        {
          return ques.id != id;
        })
        setFinalQuestion(updatedQue)
      }

      let columns = [
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          align: 'left',
  
          width: 30,
          ellipsis: true,
        },
        {
          title: "Queston img",
          // dataIndex: "id",
          key: "id",
          align: 'left',
          width: 250,
          // height : 100,
          render: (id)=>
          {
            console.log(id)
            return (<img src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${id?.question_img_url}`} className="w-full  h-full" />)
          },
          ellipsis: true,
        },
        {
          title: "Question",
          dataIndex: "question",
          key: "name",
          align: 'top',
          width: 250,
          
          // ellipsis: true,
        },
        {
          title: "Marking Sceme",
          key: "marking_sceme",
          align: 'left',
          width: 100,
          
          render : (id) =>  ( <Controller
                      name="Marking_Scheme"
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: true }} 
                      render={({ field }) => (
                        <Select
                        {...field}
                        placeholder={`${t("Select Marking Scheme")}*`}
                        isClearable
                        options={markingSch}
                        onChange={(value) =>{
                          field.onChange(value)
                          console.log('Selected value:', value);  
                          console.log('Selected id:', id);  
                          
                          id.marking_Scheme = value 
                          
                          console.log('Selected id after:', id);  
                          const filteredQusWithMarking = qusWithMarking.filter((aaa) => aaa.id != id.id)
                           
                          console.log('negative' , id?.marking_Scheme?.negative)
                           

                          
                          setQusWithMarking([...filteredQusWithMarking , id])
                          
                        }}
                      onBlur={() => field.onBlur()}
                      className="w-[200px]"
                      />
                      )}
                    />) ,   
        },
        {
          title: "Marks",
        
          key: "marks",
          align: 'left',
          width: 50,
          ellipsis: true,
          render : (id)=>
          {
           const marks =  qusWithMarking?.filter((aaa) => aaa.id === id.id)
            return (marks[0]?.marking_Scheme?.marks)
          }
        },
        {
          title: "Negative",
          
          key: "negative_marks",
          align: 'left',
          width: 50,
          ellipsis: true,
          render : (id)=>
          {
           const marks =  qusWithMarking?.filter((aaa) => aaa.id === id.id)
           console.log("saurav kumar" , marks);
            return (marks[0]?.marking_Scheme?.negative)
          }
        },

        {
          title: ("Add/Remove"),
          dataIndex: "id",
          key: "actions",
          align: "center",
          render : (  id )=>
          {
            const buttCond = finalQuestion?.find((item)=> item?.id == id )
            return (
              <div>
              { !buttCond ?  <button  onClick={() => handleAdd(id)} className={`ml-6 w-[55px] h-[50px] mt-1 bg-accent rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover`}><span className="text-4xl"> + </span>   </button> :

          <button  onClick={() => handleRemove(id)} className={`ml-6 w-[55px] h-[50px] mt-1 bg-red-600 rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-orange-700`}> <span className="text-4xl"> - </span> </button>}
          </div>
            )
          },
          width: 80,
          
        },
        {
          title: "Preview",
          key: "id",
          align: 'left',
          width: 50,
          ellipsis: true,
          render : (id) =>{
            return (<div onClick={() => handlePreview(id)}  className="h-10 w-10 cursor-pointer ml-2"><Eye /></div>)
          }
        },
      ]
      
    return ( <div className="flex-row min-h-screen" >
     
     {/* <div className="flex"> */}
     <button onClick={()=>setToggle(!toggle)} className=" w-20 h-12 bg-accent rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover mb-4">Back</button>
        <div className=" bg-gray-100 flex justify-between">
        <div className="flex max-w-[800px]">
        {sections?.map((sec) => {
    return (
      <div className="border w-[200px] bg-white rounded gap-3">
        <div className="text-xl font-semibold ml-2 mt-4 text-gray-800">
          {sec.sectionName}
        </div>
        <div>
          {sec.hasSubsections ? (
            // Case where there are subsections
            sec.subSections?.map((subSec) => 
              subSec.questionTypes?.map((type) => {
                let currentque = finalQuestion?.filter(
                  (ques) =>
                    ques?.section?.sectionName === sec?.sectionName && 
                    ques?.question_type?.name === type?.name && // Updated this to type?.name
                    ques?.subsection?.name === subSec?.name
                );
                return (
                  <div
                    onClick={() => handleQuestion(sec?.sectionName, type?.name, subSec?.name)} // Updated this to type?.name
                    className={`flex hover:text-[#24bcd7e6] ml-6 mt-2 text-gray-700 ${currentSection === sec.sectionName && currentType === type?.name && currentSubsection === subSec.name ? 'text-[#24bcd7e6] scale-125 pl-2 duration-200' : 'text-black'} cursor-pointer pb-2 justify-between font-semibold`}
                  >
                    {type.name}
                    <div className="mr-6 text-white shadow-md shadow-black bg-[#06b5d4b3] rounded-full pl-1 pr-1 font-bold">
                      {currentque?.length}
                    </div>
                  </div>
                );
              })
            )
          ) : (
            // Case where there are no subsections, map over question types directly
            sec.questionTypes?.map((type) => {
              let currentque = finalQuestion?.filter(
                (ques) =>
                  ques?.section?.sectionName === sec?.sectionName && 
                  ques?.question_type?.name === type?.name // Updated this to type?.name
              );
              return (
                <div
                  onClick={() => handleQuestion(sec?.sectionName, type?.name)} // Updated this to type?.name
                  className={`flex hover:text-[#24bcd7e6] ml-6 mt-2 text-gray-700 ${currentSection === sec.sectionName && currentType === type?.name ? 'text-[#24bcd7e6] scale-125 pl-2 duration-200' : 'text-black'} cursor-pointer pb-2 justify-between font-semibold`}
                >
                  {type?.name} {/* Display type name here */}
                  <div className="mr-6 text-white shadow-md shadow-black bg-[#06b5d4b3] rounded-full pl-1 pr-1 font-bold">
                    {currentque?.length}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
})}


</div>

            <div className="self-end">
              <button className={ `w-36 h-12 mt-2 ${questionToggel ? 'bg-magenta hover:bg-[#e11d48]' : 'bg-white text-gray-700 border font-md'  } rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none `} onClick={() => setQuestionToggle(true)}>All Questions</button>
              <button className={` w-28 h-12 mt-2 ${!questionToggel ? 'bg-magenta hover:bg-rose-600' : 'bg-white text-gray-700 border font-md'} rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none  ml-2`} onClick={() => setQuestionToggle(false)}>Selected </button>
            </div>
            {/* <div>
              <button className=" w-28 h-12 mt-2 bg-blue-600 rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-blue-700"  onClick={() => handlePreview(finalQuestion)}>Preview </button>
            </div> */}

        </div>
        {/* </div> */}
         <div className=" col-span-4  bg-gray-200">
            <div className="ml-6 mt-4 mr-6">
              {/* <div className="text-xl text-bold mb-4">{currentSection.section} --> {currentSection.questiontype}</div> */}

    {/* {question?.map((ques) =>
            
         { 
          const buttCond = finalQuestion?.find((item)=> item.id == ques.id )
          
          return (<div className=" flex border-b border-black border-dotted">
          <div className="w-[540px]  " >{ques.name}</div>
              <Controller
                  name="Marking_Scheme"
                  control={methods.control}
                  defaultValue=""
                  rules={{ required: true }} 
                  render={({ field }) => (
                    <Select
                    {...field}
                    placeholder={`${t("Select Marking Scheme")}*`}
                    isClearable
                    options={markingScheme}
                    onChange={value => field.onChange(value)}
                  onBlur={() => field.onBlur()}
                  className="w-[200px] ml-4 z-50"
                  />
                
                  )}
                />

                <div>
                  
          { !buttCond ?  <button  onClick={() => handleAdd(ques)} className={`ml-6 w-20 h-10 mt-1 bg-accent rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover`}>  ADD </button> :

          <button  onClick={() => handleRemove(ques)} className={`ml-6 w-20 h-10 mt-1 bg-red-600 rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-orange-700`}>  REMOVE  </button>}


          <button onClick={() => handlePreview(ques)} className="ml-6 w-20 h-10 mt-1 bg-blue-500 rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-blue-600">Preview</button>
          </div>
          </div>
          )
        })} */}

       </div>
        </div> 
         
          <div className="pt-4 pb-4">
            <div >
         <Table
          /* @ts-ignore */
          columns={columns}
           
          emptyText={("No Questions")}
          data={filterquestion}
          rowKey="id"
          scroll={{ x: 2000  }}
         style={{border : 'none'}}
          
        />
        </div>
        
       <button onClick={handleSubmit(onSubmit)} className=" w-full h-12 mt-4 bg-[#1e97a9f0] rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-[#3b8a96f7]">Set Paper</button>
       
        </div>

        </div>);
}
 
export default SetExamQuestion;



