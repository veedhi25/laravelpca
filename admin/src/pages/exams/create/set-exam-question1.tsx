import Label from "@components/ui/label";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Select from "@components/ui/select/select";
import { useTranslation } from "next-i18next";
import { classNames } from "classnames";
import { useEffect, useState, useMemo , useRef } from "react";
import { useModalAction } from "@components/ui/modal/modal.context";
// import { Table } from "@components/icons/category";
import { Table } from "@components/ui/table";
import { Eye } from "@components/icons/eye-icon";
import "./style.module.css";
import Pagination from "@components/pagination/pagination";
import Multiselect from "multiselect-react-dropdown";
import { useTagsQuery } from "@data/tag/use-tags.query";
import PaginationWithLimit from "@components/pagination/pagination-with -limit";
import Spinner from "@components/ui/loaders/spinner/spinner";


const SetExamQuestion1 = ({
  setToggle,
  questionToggel,
  setQuestionToggle,
  toggle,
  sections,
  questionType,
  que,
  qusWithMarking,
  setQusWithMarking,
  setFilterQuestion,
  finalQuestion,
  setFinalQuestion,
  onSubmit,
  handleSubmit,
  markingScheme,
  currentSection,
  SetCurrentSection,
  currentType, 
  SetCurrentType,
  currentSubSection,
   SetCurrentSubSection,
   currentPage,
    setCurrentPage,
    questionForNow,
    SetCurrentSectionId,
    SetCurrentTypeId,
    setTag,
    filterquestion,



}) => {


  console.log("saurav currentSection" , currentSection)
  console.log("saurav currentType" , currentType)
  console.log("saurav currentSubSection" , currentSubSection )
 const tagRef = useRef([])
 const [quetions , setQuestions] = useState([])

  useEffect(()=>
  {
    const reversedQuestion =  que?.data?.slice()?.reverse()
    setQuestions(reversedQuestion);
  },[])

  



  const dataPerPage = 10;

  console.log("sections", sections);

  const markingSch = markingScheme?.data?.map((data) => {
    return {
      label: data.name,
      id: data,
      marks: data.marks,
      negative: data.negative_marks,
    };
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // This makes the scrolling smooth, omit it for instant scrolling
    });

    // handleQuestion(currentSection,SetCurrentSectionId ,  currentType , SetCurrentTypeId , currentSubSection );
  }, [questionToggel]);

  const methods = useForm({});

  // const {handleSubmit : submitHere , watch , reset } = methods
  


  const { t } = useTranslation();

  const { openModal } = useModalAction();

  function handlePreview(data) {
    return openModal("PREVIEW_QUESTION", {
      data,
    });
  }

  const { data: tags } = useTagsQuery();



  const tagsOption = tags?.tags?.data?.map((tag) => ({
    name: tag.name,
    id: tag.id,
  }));

  const handleTags = () =>
  {

    const tagdId = tagRef.current?.map((data)=>
    {
      return data?.id
    })
     setCurrentPage(1);
    setTag(tagdId)


  }






  

  const handleQuestion = (section, sectionId ,   questiontype, questiontypeId ,  subSection ) => {


    setCurrentPage(1)
    SetCurrentSection(section);
    SetCurrentType(questiontype);
    SetCurrentSubSection(subSection);
    SetCurrentSectionId(sectionId)
    SetCurrentTypeId(questiontypeId)

    console.log("sauravkumr sec" , section);
    console.log("sauravkumr qt" ,questiontype);
    console.log("sauravkumr ss" ,subSection);
    console.log("sauravkumr secid" ,sectionId)
    console.log("sauravkumr qtid" ,questiontypeId)
   
  
  };

  const handleAdd = (id) => {
    const qe = qusWithMarking.filter((q) => q.id == id);
    const qqq = qe[0];
    {
      qqq?.marking_Scheme
        ? setFinalQuestion([...finalQuestion, qqq])
        : alert("please select marking sceme");
    }
  };

  const handleRemove = (id) => {
    const updatedQue = finalQuestion.filter((ques) => {
      return ques.id != id;
    });
    setFinalQuestion(updatedQue);
  };

  const handleSelected = ()=>
  {
    // setCurrentPage(1);
    setQuestionToggle(false)

    
    let currentque = finalQuestion?.filter((ques) => {
      return (
        ques?.section?.name === currentSection &&
        ques?.question_type?.type === currentType &&
        ques?.questionSubSection == currentSubSection

      );
    });
    console.log("hi this is clicked" , currentque)

    setFilterQuestion(currentque);
    
  }

  const handleAll = ()=>
  {
    // setCurrentPage(1);
    setQuestionToggle(true)

    setFilterQuestion(questionForNow?.data);
    
  }

  // const memoizedQuestion = useMemo(() => {
  //   // filterquestion
  //   const endIndex = currentPage * dataPerPage;
  //   const startIndex = endIndex - dataPerPage;

  //   return filterquestion?.slice(startIndex, endIndex);
  // }, [filterquestion, currentPage]);



  return (
    <div className="flex-row min-h-screen">
      {/* <div className="flex"> */}
      <button
        onClick={() => setToggle(!toggle)}
        className="-mt-4 w-20 h-12 bg-accent rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover mb-1"
      >
        Back
      </button>
      <div className=" bg-gray-100 flex justify-between">
        <div className="flex max-w-[800px] ">
          {/* <div className="flex max-w-[800px] overflow-auto" > */}
          {sections?.map((sec) => {
            return (
              <div className="border w-[200px] bg-white rounded gap-3">
                <div className=" text-xl font-semibold ml-2 mt-4 text-gray-800">
                  {sec.sectionName}
                </div>
                <div>
                  {sec.hasSubsections &&
                    sec.subSections?.map((data) => {
                      return data?.questionTypes?.map((type) => {
                        let currentque = finalQuestion?.filter((ques) => {
                          return (
                            ques?.section?.name === sec?.sectionName &&
                            ques?.question_type?.type === type?.name && 
                            ques?.questionSubSection == data?.name
                      
                          );
                        });

                        return (
                          <div
                            onClick={() =>
                              handleQuestion(
                                sec?.sectionName,
                                sec?.id,
                                type?.name,
                                type?.id,
                                data?.name,
                            
                              )
                            }
                            className={`flex hover:text-[#24bcd7e6] ml-6 mt-2 text-gray-700 ${
                              currentSection == sec.sectionName && 
                              currentType == type.name && currentSubSection == data.name
                                ? "text-[#24bcd7e6] scale-125 pl-2 duration-200"
                                : "text-black"
                            } cursor-pointer pb-2 justify-between font-semibold`}
                          >
                            <span>
                              <span className="mr-1">{data.name}</span>(
                              {type.name})
                            </span>{" "}
                            <div className="mr-6 text-white shadow-md shadow-black bg-[#06b5d4b3] rounded-full pl-1 pr-1 font-bold">
                              {currentque?.length}
                            </div>
                          </div>
                        );
                      });
                    })}
                  {!sec.hasSubsections &&
                    sec.questionTypes?.map((type) => {
                      let currentque = finalQuestion?.filter((ques) => {
                        return (
                          ques?.section?.name === sec?.sectionName &&
                          ques?.question_type?.type === type?.name
                        );
                      });

                      return (
                        <div
                          onClick={() =>
                            handleQuestion(sec?.sectionName,sec?.id, type?.name , type?.id)
                          }
                          className={`flex hover:text-[#24bcd7e6] ml-6 mt-2 text-gray-700 ${
                            currentSection == sec.sectionName &&
                            currentType == type.name
                              ? "text-[#24bcd7e6] scale-125 pl-2 duration-200"
                              : "text-black"
                          } cursor-pointer pb-2 justify-between font-semibold`}
                        >
                          {type.name}{" "}
                          <div className="mr-6 text-white shadow-md shadow-black bg-[#06b5d4b3] rounded-full pl-1 pr-1 font-bold">
                            {currentque?.length}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      
        <div className="self-end">
        <div className="self-end w-[300px] min-h-[50px] flex gap-2">  
        {/* <div className="self-end w-[300px] min-h-[50px] ">  
         <form onSubmit={submitHere(handleTagss)} className="flex gap-2"> */}
            <Controller
              name="tags"
              control={methods.control}
              render={({ field }) => (
                <Multiselect
                  {...field}
                  displayValue="name"
                  options={tagsOption}
                  showCheckbox={true}
                  closeOnSelect={false}
                  placeholder="Select tags"
                  onSelect={(e) =>{ field.onChange(e)
                  tagRef.current = e}}
                  onRemove={(e) => {field.onChange(e)
                    tagRef.current = e}}
                  
                    
                    
              
                />
              )}
            />
            <button onClick={(handleTags)} className="h-[50px] bg-purple-500 p-2 rounded-md font-semibold text-white ">
              Apply
            </button>  
            {/* <button  className="h-[50px] bg-purple-500 p-2 rounded-md font-semibold text-white ">
              Apply
            </button>   */}
          {/* </form> */}
          {/* <button onClick={handlereset}  className="h-[50px] bg-purple-500 p-2 rounded-md font-semibold text-white ">
              reset
            </button> */}
          
        </div>
          <button
            className={`w-36 h-12 mt-2 ${
              questionToggel
                ? "bg-magenta hover:bg-[#e11d48]"
                : "bg-white text-gray-700 border font-md"
            } rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none `}
            onClick={handleAll}
          >
            All Questions
          </button>
          <button
            className={` w-28 h-12 mt-2 ${
              !questionToggel
                ? "bg-magenta hover:bg-rose-600"
                : "bg-white text-gray-700 border font-md"
            } rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none  ml-2`}
            onClick={handleSelected}
          >
            Selected{" "}
          </button>
        </div>
      
      </div>
      {/* </div> */}
      <div className=" col-span-4  bg-gray-200">
        <div className="ml-6 mt-4 mr-6">

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

      <div className="w-full h-full">
        <div>
          {!questionForNow ? <Spinner /> :  filterquestion?.map((id) => {
            const buttCond = finalQuestion?.find((item) => item?.id == id.id);
            const marks = qusWithMarking?.filter((aaa) => aaa.id === id.id);

            return (
              <div className="bg-white mt-4 pl-4 pr-4 pt-2 pb-2 rounded-lg border">
                <div className="whitespace-pre-line text-gray-900">
                  {" "}
                  <span className="mr-2 text-medium font-semibold">
                    Q )
                  </span>{" "}
                  {id?.question}
                </div>

                <div className="mt-2 grid grid-cols-3">
                  <div className="col-span-2 min-h-[300px] max-h-[600px] mt-2  overflow-auto">
                    {id?.question_img_url ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${id?.question_img_url}`}
                        className=" "
                      />
                    ) : (
                      <div className="w-full h-[300px] flex  justify-center items-center ">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex ">
                      <div className="mt-2">
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
                              options={markingSch}
                              onChange={(value) => {
                                field.onChange(value);

                                id.marking_Scheme = value;
                                id.questionSubSection = currentSubSection;

                                const filteredQusWithMarking =
                                  qusWithMarking.filter(
                                    (aaa) => aaa.id != id.id
                                  );
                                setQusWithMarking([
                                  ...filteredQusWithMarking,
                                  id,
                                ]);
                              }}
                              onBlur={() => field.onBlur()}
                              className="w-[200px]"
                            />
                          )}
                        />
                      </div>

                      <div className="mt-1">
                        {!buttCond ? (
                          <button
                            onClick={() => handleAdd(id.id)}
                            className={`ml-6 w-[55px] h-[50px] mt-1 bg-accent rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover`}
                          >
                            <span className="text-4xl"> + </span>{" "}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemove(id.id)}
                            className={`ml-6 w-[55px] h-[50px] mt-1 bg-red-600 rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-orange-700`}
                          >
                            {" "}
                            <span className="text-4xl"> - </span>{" "}
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold mt-4">
                        Marks : {marks[0]?.marking_Scheme?.marks}{" "}
                      </div>
                      <div className="font-semibold mt-1">
                        Negative : {marks[0]?.marking_Scheme?.negative}
                      </div>
                    </div>

                    <div className=" mt-4 ">
                    <div className=" text-lg font-semibold mb-2">{id?.correct_options?.length == 0 ? <span  >Answer : <span className="text-green-400">{JSON.parse(id?.correct_answer)?.correct_answer1} {JSON.parse(id?.correct_answer)?.correct_answer2}</span></span> :"Options"}</div>
                      <ul className="list-decimal ml-5 text-base font-semibold">
                        {id?.options?.map((data) => {
                           const isCorret = id?.correct_options?.some((opt) => opt?.id == data?.id)
                          return (
                            <li className="flex items-center ">
                               {isCorret ? <span className="mr-2 w-6 h-6"><img  src="/correct.svg" className="w-full h-full" /></span> :   <span className="mr-2">*</span>}
                              {data?.value}
                              <span>
                                {data?.option_image_url && <img
                                  src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${data?.option_image_url}`}
                                  className="ml-1 "
                                />}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className=" w-full h-12 mt-4 bg-[#1e97a9f0] rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-[#3b8a96f7] mb-2"
        >
          Set Paper
        </button>
      </div>

      <div className="fixed bottom-0 bg-white w-[77%] bodrer rounded-md flex justify-center">
        {/* <Pagination
          currentPage={currentPage}
          dataPerPage={dataPerPage}
          setCurrentPage={setCurrentPage}
          totaldata={filterquestion?.length || 0}
        /> */}
       {questionToggel && <PaginationWithLimit
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={questionForNow?.last_page || 0}

        />}
      </div>
    </div>
  );
};

export default SetExamQuestion1;
