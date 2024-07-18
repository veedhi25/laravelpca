import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
 import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Description from '@components/ui/description';
import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import Layout from "@components/layouts/admin";
import { useCoursesQuery } from '@data/courses/use-courses.query';
import Select from '@components/ui/select/select';
import Label from "@components/ui/label";
import Multiselect from 'multiselect-react-dropdown';
import FileInput from '@components/ui/file-input';
import { useExamsQuery } from '@data/exams/use-exams.query';
import { useCourseExamQuery } from '@data/exams/use-exam-course.query';
import { useCreateExamMutation } from '@data/exams/use-exam-create.mutation';
import { useUpdateExamMutation } from '@data/exams/use-exam-update.mutation';
import TextArea from '@components/ui/text-area';
import { useTagsQuery } from '@data/tag/use-tags.query';
import { useCreateExamQuestionMutation } from '@data/exam-questions/use-create-exam-question.mutation';
import { useUpdateExamQuestionMutation } from '@data/exam-questions/use-exam-question-update.mutation';
import { useQuestionTypesQuery } from '@data/question-type/use-question-type.query';
import { getFormattedImage } from "@utils/get-formatted-image";
import { toast } from 'react-toastify';
import Spinner from '@components/ui/loaders/spinner/spinner';
 

const sections = [
  {id: 1,value:'1',
  label: 'Physics'},
  {id: 2,value:'2',
  label: 'Chemistry'},
  {id: 3,value:'3',
  label: 'Maths'},
  {id: 4,value:'4',
  label: 'Biology'},
  {id: 5,value:'5',
  label: 'Reasoning'},
  {id: 6,value:'6',
  label: 'Aptitude'},
  {id: 7,value:'7',
  label: 'Quantitative'},
]

export const validationSchema = Yup.object().shape({
  course_id: Yup.number().required('Course is required'),
  exam_id: Yup.number().required('Exam is required'),
  section_id: Yup.number().required('Section is required'),
  question_type_id: Yup.number()
    .required('Question type is required')
    .test('question-type', 'Check question input based on type', function (value) {
      const { options, correct_option_id, correct_answer } = this.parent;
      if (value === 1) {
        return options && options.length > 0 && correct_option_id;
      } else if (value === 2) {
        return correct_answer;
      }
      return false;
    }),
  question: Yup.string().required('Question is required'),
  question_image_id: Yup.number(),
  question_tag_id: Yup.array().of(Yup.number()).required('Tags are required'),
  options: Yup.array()
    .of(
      Yup.object().shape({
        option_value: Yup.string().required(),
        image_id: Yup.number(),
      })
    )
    .when('question_type_id', {
      is: 1,
      then: Yup.array().min(1, 'At least one option is required'),
    }),
  correct_option_id: Yup.number().when('question_type_id', {
    is: 1,
    then: Yup.number().required('Correct option is required'),
  }),
  correct_answer: Yup.string().when('question_type_id', {
    is: 2,
    then: Yup.string().required('Correct answer is required'),
  }),
});

 

export default function CreateOrUpdateExamQuestionForm({ initialValues }:any) {

  console.log("initial values" , initialValues)

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [option_number,selectOption] = useState([]);
  const [questionType, setQuestionType] = useState(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState( initialValues ? {id : initialValues?.question_type?.id , value : initialValues?.question_type?.type , label : initialValues?.question_type?.type   }  : '');
   console.log("selectedQuestionType" , selectedQuestionType)
  const [pastedImage, setPastedImage] = useState(null);
  const [pastedOptionImage, setPastedOptionImage] = useState([]);
    console.log("pastedOptionImage" , pastedOptionImage)

  const [isQuestionImageUplodaded , setIsQuestionImageUplodaded] = useState(false)
  const [isQuestionTextUplodaded , setIsQuestionTextUplodaded] = useState(false)

 




  const initialOptionNumber = initialValues && initialValues?.options ? initialValues.options.length == 0 ? Object.keys(JSON.parse(getInitialValue("correct_answer"))).length : initialValues.options.length   : 1;
  const [numOptions, setNumOptions] = useState(initialOptionNumber);

  const {data:all_tags} = useTagsQuery();
  function getInitialValue(prop, defaultValue = '') {
    return initialValues && initialValues[prop] !== undefined ? initialValues[prop] : defaultValue;
  }
  console.log("saurav tag" , getInitialValue('tags', []), )

  const [options, setOptions] = useState(Array(numOptions).fill({ text: '', image: null }));
  let correctOption: any[];
if (initialValues && initialValues.options) {
  // Edit mode: Map over initialValues.options
  correctOption = initialValues.options.map((opt, index) => ({
    id: opt.id,
    label: `Option ${index + 1}`,
    value: opt.id,
  }));
} else {
  // Creation mode: Generate options based on numOptions
  correctOption = Array.from({ length: numOptions }, (_, index) => ({
    id: index,
    label: `Option ${index + 1}`,
    value: index,
  }));
}


   correctOption?.forEach((option, index) => {
    if (initialValues && initialValues.options && initialValues.options[index ]) {
      option.option_id = initialValues.options[index].id;
    }
  });



   useEffect(() => {
    setOptions(Array(numOptions).fill({ text: '', image: null }));
  }, [numOptions]);
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
    setValue(`option_${index + 1}`, value); 
  };
  const handleQuestionImageChange = (value) => {
   
    setValue(`image`, value); 
  };
  const handleImageChange = (index, image) => {
    console.log('FileInput', image, index)
    setValue(`option_image_${index + 1}`, image,  );
    const imageData = watch(`option_image_${index + 1 }`);
    const newOptions = [...options];
    newOptions[index].imageId = image.id; 
    setOptions(newOptions);
    console.log('FileInput handleImageChange options', options)
    console.log('FileInput handleImageChange index', index)
    console.log('FileInput', image, index)
    console.log('FileInput handleImageChange watch', imageData);
  };

const isEditMode = initialValues && initialValues.options;

// Initialize options state
useEffect(() => {
  if (isEditMode) {
    const formattedOptions = initialValues.options.map((opt, index) => ({
      id: opt.id,
      label: `Option ${index + 1}`,
      value: opt.id,
    }));
    setOptions(formattedOptions);
  } else {
    // Logic for new question creation
    setOptions(Array(numOptions).fill({ text: '', image: null }));
  }
}, [initialValues, numOptions, isEditMode]);

// Get initial correct options for edit mode
const getinitialCorrectOptions = () => {
  return isEditMode ? initialValues.correct_options.map((item) => {
    const optionIndex = initialValues.options.findIndex(opt => opt.id === item.id);
    return {
      id: item.id,
      label: `Option ${optionIndex + 1}`,
      value: item.id,
    };
  }) : [];
}

 


  const imgFormatForDefault = (url , id) =>
  {
    const img = {id : id , original : `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${url}` , thumbnail : `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${url}` }
    console.log('image watch for default' , img)
    return getFormattedImage(img);
  }
  
  const { t } = useTranslation();

  const defaultValues = {
    course: { label: initialValues?.course?.name, value: initialValues?.course?.id } || '',
    section: { label: initialValues?.section?.name, value: initialValues?.section?.id } || '',
    question_type: { label: initialValues?.question_type?.type, value: initialValues?.question_type?.id } || '',
    tags:initialValues?.tags?.map((item) => ({ name : item?.name , value : item?.id})), 
    image : {id: initialValues?.attachment?.id, thumbnail: `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${initialValues?.question_img_url}`},
    correct_answer1: initialValues ?  JSON.parse(getInitialValue("correct_answer"))?.correct_answer1 : '', 
    correct_answer2: initialValues ?  JSON.parse(getInitialValue("correct_answer"))?.correct_answer2 : '', 
    correct_answer3: initialValues ?  JSON.parse(getInitialValue("correct_answer"))?.correct_answer3 : '', 
    correct_option: getinitialCorrectOptions()?.[0] || '',
    correct_options: getinitialCorrectOptions() || '',
  };
console.log("saurav default" , defaultValues,
)
  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch
  } = methods;
  
  
  
  const {data} = useCoursesQuery();
  const { mutate: add_exam_question } = useCreateExamQuestionMutation();
  const { mutate: update_exam_question } = useUpdateExamQuestionMutation();
  const {data:question_type}=useQuestionTypesQuery();
   
  const question_types = question_type?.data?.map((type)=> ({
    id: type?.id,
    value: type?.type,
    label: type?.type,
  }))
  const optionsArray = data?.data?.courses.map(item => ({
    label: item.name,
    value: item.id,
   }));
  const tagsArray = all_tags?.tags?.data?.map(item=> ({
    name:  item?.name,
    value: item?.id
  }))


  useEffect(() => {
    if(watch('image')?.id != undefined)
    {
      setIsQuestionImageUplodaded(true)
    }
    else
    {
      setIsQuestionImageUplodaded(false)
    }
  }, [watch('image')]);
  useEffect(() => {

    if(watch('question_text') != "" && watch('question_text') != undefined  )
    {

      setIsQuestionTextUplodaded(true)
   
    }
    else
    {
      setIsQuestionTextUplodaded(false)
  
    }
  }, [watch('question_text')]);
  const handleQuestionPopPop = (data : string)=>
  {
    toast.error(`Already question ${data} is given`)
  }
  const handleOptionPopPop = (data : string)=>
  {
    toast.error(`Already Option ${data} is given`)
  }
  
  const onSubmit = async (values:any) => {

    console.log('saurav img123 values', values)

    if(!isQuestionImageUplodaded && !isQuestionTextUplodaded)
      {
        toast.error("Please upoloade question")
        return ;
      }

      if(selectedQuestionType?.id == 3 && !values?.correct_answer1  )
        {
          toast.error("Please provide answer")
          return ;

        }
    


    const question_options = initialValues ?   // if
    initialValues?.options?.map((initialOption, index) => {
      const optionValue = values[`option_${index +1 }`] || initialOption.value;
      const imageInfo = values[`option_image_${index + 1}`] || initialOption.image_id;
  
      return {
        id: initialOption.id, // Include the ID from the initial data
        option: [`option_${index + 1}`],
        option_value: optionValue, 
        image_id: imageInfo?.id || null
      };
    }).filter(option => option.option_value || option.image_id) : // else
    Array.from({ length: 12 }, (_, index) => {
      const optionValue = values[`option_${index + 1}`];
      const imageInfo = values[`option_image_${index + 1}`];
      return {
        option: [`option_${index + 1}`],
        option_value: optionValue || '', 
        image_id: imageInfo?.id || null 
      };
    }).filter(option => option.option_value || option.image_id);

    console.log('step 2');

    console.log("initailValues values" , values);

    const selectedTagsId = values?.tags?.map((tg) => tg?.value);



    let ans={};
    console.log('step 3')
    if(selectedQuestionType?.value == 'Integer' )
    {
    Array.from({ length: numOptions }, (_, index) => (
      ans = { ...ans, [`correct_answer${index + 1}`]: values[`correct_answer${index + 1}`] }
       
      ))
    }
    console.log('step 4')
  
    const examData = {
      course_id: values?.course?.value,
      // exam_id: values?.exam?.value,
      section_id: parseInt(values?.section?.value, 10),
      question_type_id: values?.question_type?.id,
      question_tag_id: selectedTagsId ?? '',
      question: values?.question_text,
      question_img_id: values?.image?.id ?? '',
      options: question_options,
      correct_option_id:  selectedQuestionType?.value === 'Multiple Correct'
      ? values.correct_options?.map((option) => option.id) || null
      : values.correct_option?.label || null,
      correct_answer: selectedQuestionType?.value == 'Integer' ? ans : '',
    };


    console.log('examData VALUES',values);

    console.log('saurav img123 values examData',examData?.correct_option_id);
      // return '';


    if (initialValues) { 
      update_exam_question(
        { examQuestionId: initialValues.id, updatedExamQuestion: {...examData, correct_option_id:  
          selectedQuestionType?.value === 'Multiple Correct'
        ? values.correct_options?.map((option) => option.id) || null 
        : selectedQuestionType?.value === 'MCQ' 
        ? values.correct_option?.id || null
        : values.correct_option?.option_id || null
      } },
        {
          onSuccess: () => {
            router.push('/exam-questions'); 
          },
          onError: (error: any) => {
            console.log(error?.response?.data?.message);
           },
        }
      );
    } else {
      add_exam_question(
        examData,
        {
          onSuccess: () => {
            router.push('/exam-questions'); 
          },
          onError: (error: any) => {
            // alert('error aa gya')
            console.log(error?.response?.data?.message);
          },
        }
      );
    }
  };
  
  console.log("image watch" , watch('image'))
  return (
    <>
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
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("Course")}
            details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the Course")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          /> 
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Select Subjects</Label>
              <Controller
                name="course"
                control={methods.control}
                // defaultValue={getInitialValue('course')}
                rules={{ required: true }} 
                render={({ field }) => (
                  <Select
                  {...field}
                  placeholder={`${t("Select Course")}*`}
                  isClearable
                  options={optionsArray}
                  onChange={value => field.onChange(value)}
                  onBlur={() => field.onBlur()}
                />
              
                )}
              />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("Select Section")}
                details={`${initialValues ? t("Edit") : t("Add")} ${t("section")}`}
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />  
              <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Exam Sections</Label>
              <Controller
                name="section"
                control={methods.control}
                // defaultValue={getInitialValue('section')}
                rules={{ required: true }} 
                render={({ field }) => (
                  <Select
                  {...field}
                  placeholder={`${t("Select Section")}*`}
                  isClearable
                   options={sections}
                   onChange={value => field.onChange(value)}
                onBlur={() => field.onBlur()}
                />
              
                )}
              />
              </Card>
          </div>
         
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("  Question type")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" question type")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            /> 
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Label>Select question Type</Label>
            <Controller
                name="question_type"
                // defaultValue={getInitialValue('question_type')}
                control={control}
                 rules={{ required: true }} 
                render={({ field }) => (
            <Select
            {...field}
              options={question_types}
              placeholder={`${t("Question Type")}*`}
              isClearable
              // value={selectedQuestionType}
              onChange={(value) => {
                field.onChange(value);
                setSelectedQuestionType(value);
               }}
            />
            )}
              />
            </Card>
          </div>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Tags")}
              details={`${initialValues ? t("Edit") : t("Give")} ${t("tags to question ")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Controller
                name="tags"
                // defaultValue={getInitialValue('tags')}
                control={control}
                render={({ field }) => (
                  <Multiselect
                    displayValue="name"
                    options={tagsArray}
                    selectedValues={field.value}
                    onSelect={e => field.onChange(e)}
                    onRemove={e => field.onChange(e)}
                  />
                )}
              />
              </Card>
          </div>
          <div   className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
                
                title={t("Question")}
                details={t("Add question info")}
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            /> 
            
            <div onClick={() => isQuestionImageUplodaded ? handleQuestionPopPop("image") : ""} className=' w-full sm:w-8/12 md:w-2/3'>
            <Card  className={` w-full ${isQuestionImageUplodaded ? "opacity-30 pointer-events-none cursor-not-allowed" : "" }`}>
              <TextArea
                label={`${t("Question")}*`}
                 {...register("question_text")}
                error={t(errors.question_text?.message || '')}
                variant="outline"
                className="mb-5"
                defaultValue={initialValues?.question}
                // disabled={isQuestionImageUplodaded}
              />
            </Card>
            </div>
          </div>
          <div  className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8 ">
            <Description
              title={t("Question Image")}
              details={t("Upload question image")}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
           <div onClick={() => isQuestionTextUplodaded ? handleQuestionPopPop("text") : ""} className='w-full sm:w-8/12 md:w-2/3'>
            <Card className={ `w-full  ${isQuestionTextUplodaded ? "opacity-30 pointer-events-none cursor-not-allowed" : "" } `}>
              <FileInput 
              defaultValue = {`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT+initialValues?.question_img_url}`}
              onChange={(image) => handleQuestionImageChange(  image)}
                name="image" control={control} multiple={false}   />
              
            </Card>
            </div>
          </div>
          
          <div className='my-4 w-60'>
            <Label>Select Number of Options</Label>
            <Input
              name='No. of Options'
              type="number"
              variant="outline"
               value={numOptions}
              onChange={(e) => setNumOptions(e.target.value)}
              min="2"
            />
          </div>
         
      <Card className={` ${selectedQuestionType?.value !== 'Integer' ? 'block' : 'hidden'}`}>
        {selectedQuestionType?.value !== 'Integer' && (
          Array.from({ length: numOptions }, (_, index) => (
            <div  key={index}>
              <div onClick={() => watch(`option_image_${index}`)?.id != undefined ? handleOptionPopPop("image") : ""}  >
              <div className={`${watch(`option_image_${index}`)?.id != undefined ? "opacity-30 pointer-events-none cursor-not-allowed" : "" }`}>
               <Input
                label={`Option ${index + 1} value`}
                variant="outline"
                
                //@ts-ignore
                onChange={(e) => handleOptionChange(index, e.target.value)}
                //@ts-ignore
                {...register(`option_${index + 1}`)}
                defaultValue={initialValues?.options[index]?.value}
              />
              </div>
              </div>
              <div  className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                  title={`Option Image ${index + 1}`}
                  details={`Upload clear image`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />
             
              <div onClick={() => watch(`option_${index + 1}`) != "" && watch(`option_${index + 1}`) != undefined ? handleOptionPopPop("text") : ""}  className={` w-full sm:w-8/12 md:w-2/3 `}>
                <Card className={`w-full ${watch(`option_${index + 1}`) != "" && watch(`option_${index + 1}`) != undefined ? "opacity-30 pointer-events-none cursor-not-allowed" : "" }`}>
                  <FileInput
                    name={`option_image_${index + 1 }`}
                    control={control}
                    
                    multiple={false}
                    onChange={(image) => handleImageChange(index, image)}
                    defaultValue={imgFormatForDefault(initialValues?.options[index]?.option_image_url , initialValues?.options[index]?.image_id )}
                  />
                 
                </Card>
              </div>
              </div>
            </div>
          ))
        )}
      </Card>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
    <Description
        title={numOptions == 0 ?  t("Correct Answer") : t("Correct Answers")}
        details={t("")}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
    />
    <Card className="w-full sm:w-8/12 md:w-2/3">
        {selectedQuestionType?.value == 'Integer' ? (
           Array.from({ length: numOptions }, (_, index) => (
             <Input
                label={`${t("Correct Answer")}*`}
                {...register(`correct_answer${index + 1}`)}
                // {...register("correct_answer")}
                error={t(errors.correct_answer?.message || '')}
                variant="outline"
                className="mb-5"
            />
             ))
        ) : selectedQuestionType?.value === 'Multiple Correct' || initialValues?.question_type?.type == 'Multiple Correct' ? (
            <Controller
                name="correct_options" // Note that I changed the name to 'correct_options' to indicate multiple values
                control={methods.control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={correctOption}
                        isClearable
                        isMulti
                        placeholder="Select Options"
                        onChange={value => {field.onChange(value)}}

                        onBlur={() => field.onBlur()}
                    />
                )}
            />
        ) : (
            <Controller
                name="correct_option"
                control={methods.control}
                // defaultValue=""
                rules={{ required: true }}
                // classNames=""
                render={({ field }) => (
                    <Select
                        {...field}
                        options={correctOption}
                        isClearable
                        placeholder="Select Option"
                        onChange={value => field.onChange(value)}
                        onBlur={() => field.onBlur()}
                    />
                )}
            />
        )}
    </Card>
</div>
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-accent rounded font-semibold text-base tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover"
          >
            {initialValues ? t("form:button-label-update") : t("form:button-label-add")}
          </button>
        </form>
      </FormProvider>
    </>
  );
}
CreateOrUpdateExamQuestionForm.Layout = Layout;
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});