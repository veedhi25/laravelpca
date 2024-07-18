import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
 import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

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



const validationSchema = Yup.object().shape({
  name: Yup.string().required('Exam Name is required'),
});

export default function CreateOrUpdateExamSectionForm({ initialValues }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const [options,selectOption] = useState([])

  const { t } = useTranslation();
  
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { name: initialValues?.name || '' },
  });

  const {data} = useCoursesQuery();
  console.log('data', data?.data?.courses)

const courses = data?.data?.courses.map((item) => ({
    label: item.name,
    value: item.id
  }));
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

const createExamSectionMutation = useCreateExamSectionMutation();
const updateExamSectionMutation = useUpdateExamSectionMutation();

 const onSubmit = (formData: { name: any; }) => {
  
  console.log('values',formData);

  const examSection = {
     name: formData.name,
  };

  console.log('values',examSection);

  if (initialValues) {
    updateExamSectionMutation.mutate(
      //@ts-ignore
      { sectionId: initialValues?.id, updatedSection: examSection },
      {
        onSuccess: () => {
            toast.success(t("common:successfully-updated"));
            router.push('/exam-sections')
         },
        onError: (error: any) => {
          console.log(error?.response?.data?.message);
        },
      }
    );
  } else {
    createExamSectionMutation.mutate(
      //@ts-ignore
      examSection,
      {
        onSuccess: () => {
          toast.success(t("common:successfully-created"));

            router.push('/exam-sections')
          // Redirect or perform some action on success
        },
        onError: (error: any) => {
          console.log(error?.response?.data?.message);
          // assuming you have a function animateScroll.scrollToTop();
         },
      }
    );
  }
  
};

// Rest of your component


  return (
    <>
      {errorMessage ? (
        <Alert
        //@ts-ignore
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
              title={t("Exam Section")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the exam section")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Section Name")}*`}
                {...register("name")}
                error={t(errors.name?.message || '')}
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

CreateOrUpdateExamSectionForm.Layout = Layout;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
