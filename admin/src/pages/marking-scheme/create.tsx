//@ts-ignore
import { useRouter } from 'next/router';
import { useState } from 'react';
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
import { useCreateMarkingSchemeMutation, useUpdateMarkingSchemeMutation } from '@data/marking-scheme/use-marking-scheme.mutation';
import Button from '@components/ui/button';
import { useMarkingSchemesQuery } from '@data/marking-scheme/use-marking-scheme.query';
import { useExamSectionsQuery } from '@data/exam-sections/use-exam-section.query';
import { useQuestionTypesQuery } from '@data/question-type/use-question-type.query';
import { toast } from 'react-toastify';



const validationSchema = Yup.object().shape({
  scheme_name: Yup.string().required('name is required'),
  // course: Yup.string().required('Course name is required'),
  // section: Yup.string().required('Section is required'),
  // question_type: Yup.string().required('Question Type is required'),
  question_mark: Yup.number().required('Marks are required'),
  negative_marks: Yup.number().required('Negative Marks are required'),
});


export default function CreateOrUpdateMarkingSchemeForm({ initialValues }:any) {
  
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  
  const [courseId, setCourseId] = useState();
  
  const {data:exams} = useExamsQuery();

  const { t } = useTranslation();

  

  const {data} = useCoursesQuery();

   const {data:sections} = useExamSectionsQuery();
   const {data:question_types}= useQuestionTypesQuery();

   console.log('initialvalues', initialValues);

  

  const optionsArray = data?.data?.courses.map(item => ({
    label: item.name,
    value: item.id
  }));

  const questionTypeArray = question_types?.data.map(item => ({
    label: item.type,
    value: item.id
  }));

  const sectionsArray = sections?.data?.map(item => ({
    label: item.name,
    value: item.id
  }));
  console.log('sections', sectionsArray);

  const examsArray = exams?.map((exam)=>({
    label: exam.name,
    value: exam.id
  }))
  
  const { mutate: addMarkingScheme } = useCreateMarkingSchemeMutation();

  const { mutate: updateMarkingScheme } = useUpdateMarkingSchemeMutation();
   
  const defaultValues =  {
    scheme_name: initialValues?.name || '', 
    course: { label: initialValues?.course?.name, value: initialValues?.course?.id } || '',
    section: { label: initialValues?.section?.name, value: initialValues?.section?.id } || '',
    question_type: { label: initialValues?.question_type?.type, value: initialValues?.question_type?.id } || '',
    question_mark: initialValues?.marks || '',
    negative_marks: initialValues?.negative_marks || '', 
   }
   
  const { register, handleSubmit, control, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  
  console.log('defaultValues',defaultValues)
  console.log("type" , initialValues?.question_type?.type)


  const onSubmit =  (values:any) => {
    //  event.preventDefault();
    console.log('values',values);
  
    const newMarkingScheme = {
      course_id: values.course?.value ?? '',
      name: values.scheme_name ?? '',
      section_id: values.section?.value ?? '',
      question_type_id: values.question_type?.value ?? '',
      marks: values.question_mark,
      negative_marks: values.negative_marks,
    };

    console.log('new data' , newMarkingScheme )
 
    if (initialValues) {
      const markingSchemeId = initialValues?.id;
      updateMarkingScheme({ id: markingSchemeId, updatedMarkingScheme: newMarkingScheme }, {
        onSuccess: () => {
          toast.success(t("common:successfully-updated"));
          router.push('/marking-scheme');
        },
        onError: (error: any) => {
          console.log(error?.response?.data?.message);
        },
      });
    }
     else  {
      addMarkingScheme(newMarkingScheme,
        {
          onSuccess: () => {
            toast.success(t("common:successfully-created"));
              router.push('/marking-scheme')
          },
          onError: (error: any) => {
            console.log(error?.response?.data?.message);
           },
        }
        );
      // setErrorMessage(error.message);
     }
   };

   console.log('Selected value:',selectedQuestionType?.id)

  return (
    <>
      
      {/* <FormProvider {...methods}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='flex w-full'>
               <Label className=''>Marking Scheme</Label>  
            </Card>
            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("Name")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t("Scheme Name")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
                label={`${t("Scheme Name")}`}
                {...register("scheme_name")}
                defaultValue={initialValues?.scheme_name}
                error={t(errors.scheme_name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>
          </div>

          {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("Course")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the Course")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            /> 
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Select Course</Label>
              <Controller
                name="course"
                control={control}
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
          </div> */}
          
          {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
              <Description
                title={t("Select Section")}
                details={`${initialValues ? t("Edit") : t("Add")} ${t("section")}`}
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
              />  
              <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Exam Sections</Label>
              <Controller
                name="section"
                control={control}
                 rules={{ required: true }} 
                render={({ field }) => (
                  <Select
                  {...field}
                  placeholder={`${t("Select Section")}*`}
                  isClearable
                   options={sectionsArray}
                   onChange={value => field.onChange(value)}
                onBlur={() => field.onBlur()}
                />
              
                )}
              />
              </Card>
          </div> */}
          {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("Question type")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" question type")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            /> 
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Label>Select question Type</Label>
            <Controller
                  name="question_type"
                  control={control}
                   rules={{ required: true }} 
                  render={({ field }) => (
            <Select
            {...field}
            placeholder={`${t("Question Type")}*`}
            isClearable
              // displayValue="question_type"
              options={questionTypeArray}
              // value={selectedQuestionType}
              onChange={(value) => 
                field.onChange(value)
                // console.log('Selected value:', value);  
                // setSelectedQuestionType(value);
              }
               onBlur={() => field.onBlur()}
            />
            )}
            />
            </Card>
          </div> */}

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
                title={t("Marks Alloted")}
                details={t("")}
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            /> 
              
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Question Mark")}`}
                {...register("question_mark")}
                defaultValue={initialValues?.marks}
                error={t(errors.question_mark?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
                title={t("Negative Mark")}
                details={t("")}
                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            /> 
              
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Marks")}`}
                {...register("negative_marks")}
                defaultValue={initialValues?.negative_marks}
                error={t(errors?.negative_marks?.message)}
                variant="outline"
                className="mb-5"
              />
            </Card>
          </div>
          
          <button
             type="submit"
            className="w-full h-12 mt-4 bg-accent rounded font-semibold text-base tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover"
          >
            {initialValues ? t("form:button-label-update") : t("form:button-label-add")}
          </button>
      </form>
        
      {/* </FormProvider> */}
     
    </>
  );
}

CreateOrUpdateMarkingSchemeForm.Layout = Layout;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

