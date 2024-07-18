import Layout from "@components/layouts/admin";
import CreateOrUpdateProductForm from "@components/product/product-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useProductQuery } from "@data/product/product.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CreateOrUpdateCourseForm from "../create";
import { useCourseQuery } from "@data/courses/use-course.query";
import { useExamQuery } from "@data/exams/use-exam.query";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import SetExamQuestion from './set-exam-question';
import Description from '@components/ui/description';
import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import { useCoursesQuery } from '@data/courses/use-courses.query';
import Select from '@components/ui/select/select';
import Label from "@components/ui/label";
import Multiselect from 'multiselect-react-dropdown';
import { useCreateExamMutation } from '@data/exams/use-exam-create.mutation';
import { useUpdateExamMutation } from '@data/exams/use-exam-update.mutation';
import { useModalAction } from "@components/ui/modal/modal.context";
import { useExamSectionsQuery } from '@data/exam-sections/use-exam-section.query';
import { useExamsQuestionsQuery } from '@data/exam-questions/use-exam-questions.query';
import { useQuestionTypesQuery } from '@data/question-type/use-question-type.query';
import { useMarkingSchemesQuery } from '@data/marking-scheme/use-marking-scheme.query';
import { useExamsQuery } from '@data/exams/use-exams.query';
import SetExamQuestion1 from "../create/set-exam-question1";


export default function UpdateExamPage({initialValues}) {

  const { t } = useTranslation();
  const { query } = useRouter();
 

  
  // const { data: course, loading, error } = useCourseQuery(query?.course_id);
  const {data : exam , loading , error} = useExamQuery(query?.exam_id)
  console.log("query" , exam)

  const [toggle , setToggle] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [qusWithMarking , setQusWithMarking] = useState([])
    console.log('qusWithMarking', qusWithMarking);
  const [options,selectOption] = useState([])
  const [questionType,setQuestionType] = useState([])
  const [question , setQuestion] = useState({})
  const [filterquestion , setFilterQuestion] = useState([]);
  const [questionToggel , setQuestionToggle] = useState(true);

   const [finalQuestion , setFinalQuestion] = useState([]);
   console.log('final', finalQuestion)
  const { openModal }  = useModalAction();


  const [hasSubSections, setHasSubSections] = useState(false);
  const [subSectionCount, setSubSectionCount] = useState(0);



  function handlePreview (data)
  {
    return  openModal('PREVIEW_QUESTION' , {
     data
    }) 
  }


  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: { name: initialValues?.name || '' },
  });



  const {data} = useCoursesQuery();
  const {data:sectionsData} = useExamSectionsQuery();
  console.log('sectionsData' , sectionsData);
  const {data:questionsData} = useExamsQuestionsQuery();
  const {data:questionTypes} = useQuestionTypesQuery();
  const {data : markingSchemes } = useMarkingSchemesQuery();



  

  const [sectionSubsectionDetails, setSectionSubsectionDetails] = useState(
    // options?.map(option => ({ sectionName: option?.name || "", ...option }))
  );

    
  
  
  useEffect(() => {
    setSectionSubsectionDetails(
      //@ts-ignore
        options?.map(({ name, ...option }) => ({
          sectionName: name || "", 
          ...option,
          subSections: option.subSections?.map((subsection:any) => ({
            ...subsection,
            instructionsImageId: subsection.instructionsImageId || ""
          }))
        })) || []
    );
  }, [options]);
  

  
  console.log('questionsData', sectionSubsectionDetails);
  

  // Handler to update whether a section has subsections
  const handleHasSubsectionsChange = (hasSubsections, optionIndex) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[optionIndex] = {
        ...updatedDetails[optionIndex], 
        hasSubsections,
        sectionName: updatedDetails[optionIndex]?.sectionName,  // use optional chaining to safeguard against undefined values
      };
      return updatedDetails;
    });
  };
  
  
  
  
  const handleSubsectionCountChange = (value, optionIndex) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[optionIndex] = {
        ...updatedDetails[optionIndex],
        subSectionCount: value === "" ? "" : parseInt(value, 10),
      };
  
      return updatedDetails;
    });
  };

// Handler to update the subsection name
const handleSubsectionNameChange = (name, optionIndex, subsectionIndex) => {
  setSectionSubsectionDetails((prevDetails) => {
    const updatedDetails = [...prevDetails];

    if (!updatedDetails[optionIndex].subSections) {
      updatedDetails[optionIndex].subSections = Array.from(
        { length: updatedDetails[optionIndex]?.subSectionCount || 0 },
        () => ({})
      );
    }

    updatedDetails[optionIndex].subSections[subsectionIndex] = { 
      ...updatedDetails[optionIndex].subSections[subsectionIndex], 
      name, 
    };
    
    return updatedDetails;
  });
};

const handleSubsectionImageChange = (image, optionIndex, subsectionIndex) => {
  console.log('image changed');
  setSectionSubsectionDetails((prevDetails) => {
    const updatedDetails = [...prevDetails];

    if (!updatedDetails[optionIndex].subSections) {
      updatedDetails[optionIndex].subSections = Array.from(
        { length: updatedDetails[optionIndex]?.subSectionCount || 0 },
        () => ({})
      );
    }

    updatedDetails[optionIndex].subSections[subsectionIndex] = { 
      ...updatedDetails[optionIndex].subSections[subsectionIndex], 
      instructionsImageId: image.id
    };

    return updatedDetails;
  });
};

// Handler to update the question types for a section/subsection
const handleQuestionTypesChange = (questionTypes, optionIndex, subsectionIndex) => {
  setSectionSubsectionDetails((prevDetails) => {
    const updatedDetails = [...prevDetails];
    if (subsectionIndex !== undefined) {
      if (!updatedDetails[optionIndex].subSections) {
        updatedDetails[optionIndex].subSections = [];
      }
      updatedDetails[optionIndex].subSections[subsectionIndex] = { 
        ...updatedDetails[optionIndex].subSections[subsectionIndex], 
        questionTypes 
      };
    } else {
      updatedDetails[optionIndex] = { 
        ...updatedDetails[optionIndex], 
        questionTypes 
      };
    }
    return updatedDetails;
  });
};


const handleImage = () => {
   
}


// Use these handlers in your components, passing the appropriate arguments based on the inputs being changed

  
  



const courses = data?.data?.courses.map(item => ({
    label: item.name,
    value: item.id,
    id : item.id
  }));

  const sectionsArray = sectionsData?.data.map(item => ({
    id: item.id,
    name: item.name,
  }));

  const questionTypesArray = questionTypes?.data.map(item => ({
    id: item.id,
    name: item.type,
  }));
 
  // Then pass this to the Select
   

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods;

const createExamMutation = useCreateExamMutation();
const updateExamMutation = useUpdateExamMutation();

const{ data:exams} = useExamsQuery()


 const onSubmit = (formData) => {

  console.log("i am here");
  console.log( "sectionSubsectionDetails" ,  sectionSubsectionDetails);
  console.log('formData',formData)

  // return '' ;
 
  const finalQuestionDataBase = finalQuestion?.map((question) => {
    return {
      question_id: question.id, // assuming `question.id` holds the ID of the question
      marking_Scheme: {
        marks: question?.marking_Scheme?.marks, // replace with the correct attribute for marks
        negative: question?.marking_Scheme?.negative, 
        // replace with the correct attribute for negative marks 
      },
      question_subSection: question?.questionSubSection
      // subsection : 
    };
  });
  
   
  if(!sectionSubsectionDetails){
     return ''
  }

  const examData = {
    name: formData.name,
    total_marks: formData.total_marks,
    total_questions: formData.total_questions,
    time: { 
        hours: formData.hours, 
        minutes: formData.minutes 
    },
    course: formData.course_id,
    finalQuestion: finalQuestionDataBase,
    start_time: formData?.start_time,
    end_time: formData?.end_time,
    // Assuming you might need a date field
    date: formData.date,  // Add suitable values here
    instructions_img_id: formData.image?.id,  // Add suitable values here
    sections : sectionSubsectionDetails,    
  };

   console.log("examData ",sectionSubsectionDetails);
   
  if (initialValues) {
    console.log("i am not here");
    // If initialValues is present, it means you are updating an existing exam
    const examId = initialValues.id; // Or however you have the id in the initialValues
    updateExamMutation.mutate({ examId, updatedExam: examData });
  } else {
     // Create a new exam
    
    createExamMutation.mutate(examData,
      {
        onSuccess : () =>
        {
          toast.success(t("common:successfully-updated"));
          router.push('/exams')
        },
        onError : ()=>
        {
             console.log("we got an error")
        }
      });
  }
};

console.log("examData ",sectionSubsectionDetails);

// Rest of your component

console.log(' sections details',questionTypesArray)
  

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  
 
  
  return (
    <>

     {toggle && 
     <div>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card className='flex w-full mb-6'>
               <Label className=''>Exams</Label>  
            </Card>

            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("Course")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the Course")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
           
            <Card className="w-full sm:w-8/12 md:w-2/3">
                <Label>Select Course</Label>
                <Controller
                    name="course_id"
                    control={methods.control}
                    defaultValue=""
                    rules={{ required: true }} 
                    render={({ field }) => ( 
                      <Select
                      {...field}
                      placeholder={`${t("Select Course")}*`}
                      isClearable
                      options={courses}
                      onChange={value => field.onChange(value)}
                      onBlur={() => field.onBlur()}
                    />
                  
                    )}
                  />
              </Card>
            </div>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Exams")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the exam")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Exam Name")}*`}
                {...register("name")}
                error={t(errors.name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>

          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("Exam Timing")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the start and end time of the exam")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>{t("Exam Start Time")}*</Label>
              <input 
                type="datetime-local" 
                {...register("start_time")} 
                className="mb-5 w-full h-12 border border-gray-300 rounded px-3" 
              />

              <Label>{t("Exam End Time")}*</Label>
              <input 
                type="datetime-local" 
                {...register("end_time")} 
                className="mb-5 w-full h-12 border border-gray-300 rounded px-3" 
              />
            </Card>
          </div>


          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("Exam Sections")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of exam sections")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                <Label>Exam Sections</Label>
                <Controller
                    control={methods.control}
                    name="sections"
                    render={({ field }) => (
                    <Multiselect
                        displayValue="name"
                        options={sectionsArray}
                        selectedValues={field?.value?.map(value => sectionsArray?.find(section => section.id === value))}
                        onSelect={(selectedList) => {
                        selectOption(selectedList);
                        field.onChange(selectedList.map(item => item.id));
                        }}
                        onRemove={(selectedList) => {
                        selectOption(selectedList);
                        field.onChange(selectedList.map(item => item.id));
                        }}
                    />
                    )}
                />
                </Card>

         </div>


         {options?.map((option, optionIndex) => (
  <div key={optionIndex} className="mb-4">
    <Description
      title={`${t("Section")}: ${option.name}`}
      className="w-full px-0 bg-white rounded my-4 sm:p-4"
    />

    <Card className="w-full sm:w-8/12 md:w-2/3">
      <Label>Does this section have Sub Sections?</Label>
      <div className='flex items-center space-x-16'>
        <div className='flex items-center space-x-4'>
          <label className='font-md text-gray-600 text-sm' htmlFor={`yes-${optionIndex}`}>Yes</label>
          <input
            id={`yes-${optionIndex}`}
            name={`hasSubSections-${optionIndex}`}
            type="radio"
            value="yes"
            checked={sectionSubsectionDetails[optionIndex]?.hasSubsections === true}
            onChange={() => handleHasSubsectionsChange(true, optionIndex)}
          />
        </div>
        <div className='flex items-center space-x-4'>
          <label className='font-md text-gray-600 text-sm' htmlFor={`no-${optionIndex}`}>No</label>
          <input
            id={`no-${optionIndex}`}
            name={`hasSubSections-${optionIndex}`}
            type="radio"
            value="no"
            checked={sectionSubsectionDetails[optionIndex]?.hasSubsections === false}
            onChange={() => handleHasSubsectionsChange(false, optionIndex)}
          />
        </div>
      </div>
    </Card>

    {sectionSubsectionDetails[optionIndex]?.hasSubsections ? (
      <div className="mt-4">
       <Label>Number of Sub Sections:</Label>
        <Input
           min={1}
           max={4}
          variant='outline'
          type="number"
          value={sectionSubsectionDetails[optionIndex]?.subSectionCount ?? 1}
          onChange={(e) => handleSubsectionCountChange(e.target.value, optionIndex)}
        />

        {Array.from({ length: sectionSubsectionDetails[optionIndex]?.subSectionCount || 1 }, (_, index) => (
          <Card key={index} className="space-y-5 mt-4 w-full ">
            <Label>Sub section name</Label>
            <Input 
              placeholder={`subsection ${index + 1}`} 
              type="text" 
              value={sectionSubsectionDetails[optionIndex]?.subSections?.[index]?.name || ''}
              onChange={(e) => handleSubsectionNameChange(e.target.value, optionIndex, index)}
            />

  


            
            <Label>Question Types in Sub Section {index + 1}:</Label>
            <Controller
              name={`questionType${optionIndex}${index + 1}`}
              control={methods.control}
              render={({ field }) => (
                <Multiselect
                  displayValue="name"
                  options={questionTypesArray}
                  selectedValues={field?.value?.map((value) => 
                    questionTypesArray?.find((section) => section.id === value)
                  )}
                  onSelect={(selectedList) => {
                    field.onChange(selectedList.map((item) => item.id));
                    handleQuestionTypesChange(selectedList.map((item) => item), optionIndex, index);
                  }}
                  onRemove={(selectedList) => {
                    field.onChange(selectedList.map((item) => item.id));
                    handleQuestionTypesChange(selectedList.map((item) => item), optionIndex, index);
                  }}
                  
                />
              )}
            />

          </Card>
        ))}
      </div>
    ) : (
      hasSubSections === false && (
        <div
        className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8"
        key={optionIndex}
      >
        <Description
          title={t(`${option.name}`)}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(
            `${option.name} questions-Type`
          )}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="mt-4 w-full sm:w-8/12 md:w-2/3">
          <Label>Question Types in {option.name} section:</Label>
          <Controller
              name={`questionType${optionIndex}`}
              control={methods.control}
              render={({ field }) => (
                <Multiselect
                  displayValue="name"
                  options={questionTypesArray}
                  selectedValues={field?.value?.map((value) => 
                    questionTypesArray?.find((section) => section.id === value)
                  )}
                  onSelect={(selectedList) => {
                    field.onChange(selectedList.map((item) => item.id));
                    handleQuestionTypesChange(selectedList.map((item) => item), optionIndex);
                  }}
                  onRemove={(selectedList) => {
                    field.onChange(selectedList.map((item) => item.id));
                    handleQuestionTypesChange(selectedList.map((item) => item), optionIndex);
                  }}
                />
              )}
            />
        </Card>
        </div>
      )
    )}
  </div>
))}






  

          <div className="flex flex-wrap pb-8 border-b border-dashed 
                          border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Total Marks")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" total marks")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Total Marks")}*`}
                {...register("total_marks")}
                error={t(errors.total_marks?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed 
                          border-border-base my-5 sm:my-8">
            <Description
              title={t("Total Questions")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" total number of questions")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                type='number'
                label={`${t("Total Questions")}*`}
                {...register("total_questions")}
                error={t(errors.total_questions?.message || '')}
                variant="outline"
                className="mb-5"
                min={1}
                max={300}
              />
            </Card>

          </div>


            <div className="flex flex-wrap pb-8 border-b border-dashed 
                            border-border-base my-5 sm:my-8">
        
              <Description
                title={t("Time duration")}
                details={`${initialValues ? t("Edit") : t("Add")} ${t(" exam time duration")}`}
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />

              <Card className="flex items-center space-x-4 w-full sm:w-8/12 md:w-2/3">
                <Input
                  type='number'
                  label={`${t("Hours")}*`}
                  placeholder='hours'
                  {...register("hours")}
                  error={t(errors.hours?.message || '')}
                  variant="outline"
                  className="mb-5"
                  defaultValue={1}
                  min={1}
                  max={3}
                />

              <Input
                  type='number'
                  label={`${t("Minutes")}*`}
                  placeholder='minutes'
                  {...register("minutes")}
                  error={t(errors.minutes?.message || '')}
                  variant="outline"
                  className="mb-5"
                  defaultValue={0}
                  min={0}
                  max={59}
                />
              </Card>
            </div>

    

          <button
            onClick={()=> setToggle(!toggle)}
            type="submit"
            className="w-full h-12 mt-4 bg-accent rounded font-semibold text-base tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover"
          >
            {  t("Set Question")}
          </button>
        </form>
      </FormProvider>
      </div>
      }

      {!toggle && <SetExamQuestion1 setToggle = {setToggle} toggle={toggle} 
                                    questionType={questionType} sections={sectionSubsectionDetails} 
                                    que={questionsData} qusWithMarking={qusWithMarking}  
                                    setQusWithMarking={setQusWithMarking} filterquestion={filterquestion} 
                                    setFilterQuestion={setFilterQuestion} finalQuestion={finalQuestion} 
                                    setFinalQuestion={setFinalQuestion} handleSubmit={handleSubmit}  
                                    onSubmit={onSubmit} markingScheme={markingSchemes} 
                                    questionToggel={questionToggel} setQuestionToggle={setQuestionToggle}  />}

    </>
  );
  
  }
  



UpdateExamPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
