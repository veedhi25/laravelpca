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
import { useCreateExamMutation } from '@data/exams/use-exam-create.mutation';
import { useUpdateExamMutation } from '@data/exams/use-exam-update.mutation';
import { useCreateExamSectionMutation, useUpdateExamSectionMutation } from '@data/exam-sections/use-exam-section.mutation';
import { useCreateQuestionTypeMutation, useUpdateQuestionTypeMutation } from '@data/question-type/use-question-type.mutation';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Exam Name is required'),
});

export default function CreateOrUpdateQuestionTypeForm({ initialValues }) {
  
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null);

  const [options,selectOption] = useState([]);

  console.log('initialvalues', initialValues);

  const { t } = useTranslation();
  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: { type: initialValues?.type || '' },
  });

    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

const createQuestionType = useCreateQuestionTypeMutation();
const updateQuestionType = useUpdateQuestionTypeMutation();

 const onSubmit = (formData: { name: any; }) => {
  console.log('initialValues',initialValues);
  const questionType = {
    //@ts-ignore
     type: formData.type,
  };

  console.log('values',questionType);

  if (initialValues) {
    updateQuestionType.mutate(
      //@ts-ignore
      { id: initialValues.id, input: questionType }, // Changed the parameter name to match the update function
      {
        onSuccess: () => {
          router.push('/question-type');
         },
        onError: (error: any) => {
          console.log(error?.response?.data?.message);
       
        },
      }
    );
  } else {
    createQuestionType.mutate(
      questionType, 
      {
        onSuccess: () => {
          router.push('/question-type');
         },
        onError: (error: any) => {
          console.log(error?.response?.data?.message);
         },
      }
    );
  }
};


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
              title={t("Type")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the exam section")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Question Type")}*`}
                {...register("type")}
                error={t(errors.type?.message || '')}
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
      </FormProvider>
    </>
  );
}

CreateOrUpdateQuestionTypeForm.Layout = Layout;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
