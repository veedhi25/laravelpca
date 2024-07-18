import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from "@components/ui/input";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Description from '@components/ui/description';
import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from "@components/layouts/admin";
import { useCreateCourseMutation } from '@data/courses/use-courses.mutation';
import { useUpdateCourseMutation } from '@data/courses/use-course.update.mutations';

const validationSchema = Yup.object().shape({
  courseName: Yup.string().required('Course Name is required'),
});

const defaultValues = {
  courseName: '',
};

type IProps = {
  initialValues?: any | null;
};

export default function CreateOrUpdateCourseForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();
  
  console.log('values', initialValues);
  
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { courseName: initialValues?.name || 'empty' },
});


  const {mutate: add_course} = useCreateCourseMutation();

  const {mutate: update_course} = useUpdateCourseMutation();


  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log('initial val', initialValues?.name )

  const onSubmit = async (values: any) => {
    try {

       if(initialValues){ 
        update_course({ courseId: initialValues?.id, updatedCourse: { courseName: values.courseName } }); 
    }else {
        add_course({ courseName: values.courseName });
         
       }
        
       console.log(values);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
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
              title={t("Courses")}
              details={`${
                initialValues
                  ? t("Edit")
                  : t("Add")
              } ${t(" the name of the course")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
                label={`${t("Course Name")}*`}
                {...register("courseName")}
                error={t(errors.courseName?.message!)}
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

CreateOrUpdateCourseForm.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

