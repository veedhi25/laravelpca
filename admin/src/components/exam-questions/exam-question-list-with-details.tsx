import Label from "@components/ui/label";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Select from "@components/ui/select/select";
import { useEffect, useState, useMemo } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useTagsQuery } from "@data/tag/use-tags.query";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePaginatedExamQuestionsQuery } from "@data/exam-questions/use-paginated-exam-questions.query";
import Spinner from "@components/ui/loaders/spinner/spinner";
import PaginationWithLimit from "@components/pagination/pagination-with -limit";
import { useExamSectionsQuery } from "@data/exam-sections/use-exam-section.query";
import { useExamsQuestionsQuery } from "@data/exam-questions/use-exam-questions.query";


const QuestionListWithDetails = ({}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [latestOldToggle, setLatestOldToggle] = useState(true);
  const [totalPage , setTotalPage] = useState(1);
  const [filterQuestions , setFilterQuestions] = useState([])
  const [tags_id, setTags_Id] = useState()
  const [section_id, setSection_Id] = useState(null);
  const [question_type_id, setQuestionType_Id] = useState(null)
  const { data: subject } = useExamSectionsQuery();
  const { data: tags } = useTagsQuery();
  // const { data: questions } = usePaginatedExamQuestionsQuery(currentPage);

  const { data: questions } = useExamsQuestionsQuery({
     currentPage, 
     section_id: section_id, 
     question_type_id: question_type_id, 
     tag_id: tags_id 
    });

  console.log("questions", currentPage);

  const router = useRouter();

  const {  control } = useForm();

useEffect(()=>{
  setFilterQuestions(questions?.data)
 
  if(totalPage != questions?.last_page && questions?.last_page != undefined)
  {
  
    setTotalPage(questions?.last_page || 1)
  }
},[questions])



  const subjectOption = subject?.data?.map((sub: any) => ({
    label: sub?.name,
    id: sub?.id,
  }));

  const tagsOption = tags?.tags?.data?.map((tag) => ({
    name: tag.name,
    id: tag.id,
  }));
  console.log("subject", tagsOption,tags_id);

  // const memoizedQuestion = useMemo(() => {
  //   // filterquestion
  //   const endIndex = currentPage * dataPerPage;
  //   const startIndex = endIndex - dataPerPage;

  //   if (filterSubjectWiseQuestion) {
  //     return filterSubjectWiseQuestion?.slice(startIndex, endIndex);
  //   }

  //   return filterquestion?.slice(startIndex, endIndex);
  // }, [filterquestion, currentPage, filterSubjectWiseQuestion]);

  // console.log("memoizedQuestion", memoizedQuestion);

  // const { openModal } = useModalAction();

  // function handlePreview(data) {
  //   return openModal("PREVIEW_QUESTION", {
  //     data,
  //   });
  // }

  // const handleQuestion = (section, questiontype, subSection) => {
  //   SetCurrentSection(section);
  //   SetCurrentType(questiontype);
  //   SetCurrentSubSection(subSection);

  //   if (questionToggel) {
  //     let currentque = que?.filter((ques) => {
  //       return (
  //         ques?.section?.name === section &&
  //         ques?.question_type?.type === questiontype
  //       );
  //     });
  //     setFilterQuestion(currentque);
  //   } else {
  //     let currentque = finalQuestion?.filter((ques) => {
  //       return (
  //         ques?.section?.name === section &&
  //         ques?.question_type?.type === questiontype
  //       );
  //     });

  //     setFilterQuestion(currentque);
  //   }
  // };

  // const handleLatest = () => {
  //   setFilterQuestion(filterquestion?.slice()?.reverse());
  //   questions?.reverse();
  //   // console.log("questions after" , questions)
  //   setLatestOldToggle(false);
  //   setCurrentPage(1);
  // };
  // const handleOld = () => {
  //   setFilterQuestion(filterquestion?.slice()?.reverse());
  //   questions = questions?.reverse();
  //   setLatestOldToggle(true);
  //   setCurrentPage(1);
  // };

  // const handleTagSubmit = (data: any) => {
  //   const filterQuestionsByTags = questions?.filter((que) => {
  //     const isTagsPresent = data?.tags?.every((tag) => {
  //       console.log("filterTag", tag);
  //       return que?.tags?.some((tag1) => tag1?.name == tag?.name)
  //         ? true
  //         : false;
  //     });

  //     return isTagsPresent;
  //   });

  //   setFilterQuestion(filterQuestionsByTags);
  //   setCurrentPage(1);

  //   console.log("filterQuestionsByTags", filterQuestionsByTags);
  // };

  if (!subject || !tags) return <Spinner />;

  return (
    <div className="flex-row min-h-screen">
      <div className=" bg-gray-100 flex justify-between flex-wrap gap-2">
        <div className="">
          <button
            className={`w-28 h-12 mt-2 ${
              !latestOldToggle
                ? "bg-magenta hover:bg-[#e11d48]"
                : "bg-white text-gray-700 border font-md"
            } rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none `}
            onClick={() => {
              setCurrentPage(questions?.last_page)
              
              setLatestOldToggle(false)
            }}
            disabled={!latestOldToggle}
          >
            Latest
          </button>
          <button
            className={` w-22 h-12 mt-2 ${
              latestOldToggle
                ? "bg-magenta hover:bg-rose-600"
                : "bg-white text-gray-700 border font-md"
            } rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none  ml-2`}
            onClick={() => {setCurrentPage(1)
              setLatestOldToggle(true)}}
            disabled={latestOldToggle}
          >
            All{" "}
          </button>
        </div>

        <div className=" w-[200px] ">
          <form>
            <Controller
              name="subject"
              control={control}
              render={() => (
                <Select
                  options={subjectOption}
                  isClearable
                  placeholder="Select Subject"
                  onChange={(value) => {
                    console.log('subject id',value?.id)
                   value && setSection_Id(value?.id)
                   setCurrentPage(1)
                    

                    if(value == undefined || value == null){
                       setSection_Id(null)
                       setCurrentPage(1)
                    }
                    // const quetionSubjectWise = questions?.filter(
                    //   (question) => question?.section?.name == value?.label
                    // );
                    // if (value) {
                    //   setFilterQuestion(quetionSubjectWise);
                    //   if (quetionSubjectWise) {
                    //     setCurrentPage(1);
                    //   }
                    // } else {
                    //   setFilterQuestion(questions);
                    //   setCurrentPage(1);
                    // }

                    // console.log("quetionSubjectWise" , filterquestion)
                  }}

                


                />
              )}
            />
          </form>
        </div>

        <div className="self-end  min-h-[50px]">
          {/* <form onSubmit={handleSubmit(handleTagSubmit)} className="flex gap-2"> */}
           <div className="flex gap-2"> 
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Multiselect
                  {...field}
                  displayValue="name"
                  options={tagsOption}
                  showCheckbox={true}
                  closeOnSelect={false}
                  placeholder="Select tags"
                  keepSearchTerm={false}
                  onSelect={(e) => {
                    setTags_Id(e?.map((tag)=>tag?.id))
                    setCurrentPage(1)
                    console.log('subject',e),
                    field.onChange(e)}}

                    onRemove={(e) => {
                      console.log('tag id',e)
                      setTags_Id(e?.map((tag)=>tag?.id))
                      setCurrentPage(1)
                      field.onChange(e)}}
                  
                  // emptyRecordMsg = {ture}
                  // onChange={(value)=>{

                  //   const quetionSubjectWise = questions?.filter((question)=>(question?.section?.name == value?.label))
                  //   if(value)
                  //   {
                  //   setFilterQuestion(quetionSubjectWise)
                  //   if(quetionSubjectWise){
                  //   setCurrentPage(1)
                  //   }
                  //   }
                  //   else
                  //   {
                  //     setFilterQuestion(questions)
                  //     setCurrentPage(1)
                  //   }

                  // }}
                />
              )}
            />
            <button className="min-h-[50px] bg-purple-500 p-2 rounded-md font-semibold text-white ">
              Apply
            </button>
            </div>
          {/* </form> */}
        </div>

        {/* <div>
              <button className=" w-28 h-12 mt-2 bg-blue-600 rounded font-semibold text-lg tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-blue-700"  onClick={() => handlePreview(finalQuestion)}>Preview </button>
            </div> */}
      </div>
      {/* </div> */}
      <div className=" col-span-4  bg-gray-200">
        <div className="ml-6 mt-4 mr-6"></div>
      </div>

      {!questions ? <Spinner /> : <div className="w-full h-full mb-0.5">
        <div>
          {filterQuestions?.map((id) => {
            console.log("correct_options" , id)
            return (
              <div
                key={id.id}
                className="bg-white mt-4 pl-4 pr-4 pt-2 pb-2 rounded-lg border"
              >
                <div
                  key={id.id}
                  className="whitespace-pre-line text-gray-900 flex justify-between"
                >
                  <div className="mr-2 text-medium font-semibold">Q )</div>
                  <Link href={`${router.asPath}/${id.id}/edit`}>
                    <div className="self-end mb-2 border h-10 rounded-md shadow-md w-20 flex justify-center items-center font-semibold text-gray-500 cursor-pointer">
                      Edit
                    </div>
                  </Link>
                </div>

                <div className="mt-2 grid grid-cols-3">
                  <div className="col-span-2 min-h-[300px] max-h-[600px] mt-2 overflow-auto whitespace-pre-wrap">
                    {id?.question && id?.question}
                    {id?.question_img_url ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${id?.question_img_url}`}
                        className=" "
                      />
                    ) : (
                      <div className="w-full h-[200px] flex  justify-center items-center ">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <div className=" mt-4 ">
                      <div className=" text-lg font-semibold mb-2">{id?.correct_options?.length == 0 ? <span  >Answer : <span className="text-green-400">{JSON.parse(id?.correct_answer)?.correct_answer1} {JSON.parse(id?.correct_answer)?.correct_answer2}</span></span> :"Options"}</div>
                      <ul className="list-decimal ml-5 text-base font-semibold">
                        {id?.options?.map((data) => {
                          
                          const isCorret = id?.correct_options?.some((opt) => opt?.id == data?.id)
                          return (
                            <li
                              key={data?.id}
                              className="flex items-center w-full"
                            >
                             {isCorret ? <span className="mr-2 w-6 h-6"><img  src="/correct.svg" className="w-full h-full" /></span> :   <span className="mr-2">*</span>}

                              <span>
                                {data?.option_image_url && (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${data?.option_image_url}`}
                                    className="ml-1 "
                                  />
                                )}
                                {data?.value && <span>{data?.value}</span>}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      {/* <div className=" text-lg font-semibold mb-2 text-green-400">Correct </div>
                      <ul className="list-decimal ml-5 text-base font-semibold">
                        {id?.options?.map((data) => {
                          return (
                            <li
                              key={data?.id}
                              className="flex items-center w-full"
                            >
                              <span className="mr-2">*</span>

                              <span>
                                {data?.option_image_url && (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${data?.option_image_url}`}
                                    className="ml-1 "
                                  />
                                )}
                                {data?.value && <span>{data?.value}</span>}
                              </span>
                            </li>
                          );
                        })}
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>}

      <div className="fixed bottom-0 bg-white w-[77%] bodrer rounded-md flex justify-center">
        <PaginationWithLimit
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={ totalPage|| 0}
        />
      </div>
    </div>
  );
};

// const Pagination = ({currentPage ,setCurrentPage , totaldata , dataPerPage} : any)=>
// {
//   const number = [];
//   console.log("currentPage" , currentPage)
//   console.log("totaldata" , totaldata)

//   const {handleSubmit , register , reset } = useForm();

//   for(let i = 1; i<=Math.ceil(totaldata/dataPerPage); i++)
//   {
//     number.push(i);
//   }
//   console.log("number" , number)

//   const handleNext = ()=>
//   {
//     setCurrentPage((pre)=>(pre + 1))
//   }
//   const handlePrevious = ()=>
//   {
//     setCurrentPage((pre)=>(pre - 1))
//   }

//   const onSubmit = (data : any) =>
//   {
//     console.log("data" , data) ;
//     console.log("data Math.ceil(totaldata/dataPerPage" , Math.ceil(totaldata/dataPerPage)) ;

//     const pageNo = parseInt(data?.pageNo);
//     if(pageNo > 0 && pageNo <= Math.ceil(totaldata/dataPerPage) )
//     {
//     setCurrentPage(pageNo);
//     reset();
//     }
//     else
//     {
//       console.log("hi thsi is saurav")
//       reset();
//     }

//   }

//    return (
//     <div className="">
//     <div className="flex gap-1 flex-wrap">

//       <button onClick={handlePrevious} disabled={currentPage == 1} className='cursor-pointer  bg-white flex justify-center items-center h-9 w-24 border text-gray-600 ml-1' >&lt;&lt;&nbsp;Previous</button>
//        {
//         number?.slice( currentPage < 4 ? 0 : currentPage-4 ,currentPage < 4 ? 7 : currentPage + 3)?.map((num)=>
//         {
//           return (<div key={num} onClick={()=>(setCurrentPage(num))} className={ num == currentPage ? 'flex justify-center items-center h-9 w-9 border text-white bg-blue-600 cursor-pointer' : 'cursor-pointer  bg-white flex justify-center items-center h-9 w-9 border text-gray-600'} >{num}</div>)
//         })
//        }
//        <button onClick={handleNext} disabled={currentPage == Math.ceil(totaldata/dataPerPage)} className='cursor-pointer  bg-white flex justify-center items-center h-9 w-24 border text-gray-600 mr-1'>Next&nbsp;&gt;&gt;</button>

//        <form onSubmit={handleSubmit(onSubmit)} className="flex" >
//        <button  className='cursor-pointer  bg-white flex justify-center items-center h-9 w-24 border text-gray-600 mr-1'>Go to page</button>
//         <input type="number" {...register("pageNo")} className=" w-[100px] h-9 border pl-4"></input>

//        </form>

//     </div>
//     </div>
//    )
// }

export default QuestionListWithDetails;
