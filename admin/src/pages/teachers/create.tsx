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
import { useCreateExamSectionMutation, useUpdateExamSectionMutation } from '@data/exam-sections/use-exam-section.mutation';

import { useExamSectionsQuery } from '@data/exam-sections/use-exam-section.query';
import { useCourseQuery } from '@data/courses/use-course.query';


const batch_array = [
  {"id": 1, "name": "John"},
  {"id": 2, "name": "Sarah"},
  {"id": 3, "name": "Michael"},
  {"id": 4, "name": "Emily"},
  {"id": 5, "name": "David"},
  {"id": 6, "name": "Sophia"},
  {"id": 7, "name": "William"},
  {"id": 8, "name": "Olivia"},
  {"id": 9, "name": "James"},
  {"id": 10, "name": "Emma"}
]


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Exam Name is required'),
});

export default function CreateUpdateTeacersForm({ initialValues }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const [options,selectOption] = useState([])


  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { name: initialValues?.name || '' },
  });


  const {data : Subjects} = useExamSectionsQuery()

  const subjectList = Subjects?.data?.map((data)=>({ 
      id : data.id,
      name : data.name })
  );
  

  const {data : Courses} = useCoursesQuery();

  const coursesList = Courses?.data?.courses?.map((data=>({
    id: data.id,
    name : data.name
  })))
  
 


  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;



 const onSubmit = (formData: { name: any; }) => {
  console.log('values',formData);
  
      
  
};

// Rest of your component


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
              title={t("Name")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Name")}*`}
                {...register("name")}
                error={t(errors.name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>

          </div> 

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Email")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the email of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Email")}*`}
                {...register("email")}
                type={'email'}
                error={t(errors.name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>

          </div> 
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Mobile Number")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the mobile number of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Mobile Number")}*`}
                {...register("number")}
                type={'number'}
                error={t(errors.name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>

          </div> 

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Address")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the address of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Address")}*`}
                {...register("address")}
                // type={'email'}
                error={t(errors.name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>

          </div> 

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Highest Qualification")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the highest qualification of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Highest Qualification")}*`}
                {...register("qualification")}
                // type={'email'}
                error={t(errors.name?.message || '')}
                variant="outline"
                className="mb-5"
              />
            </Card>

          </div> 


          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Subjects")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the subjects of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
             
             <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Select Subjects</Label>
              
              <Controller 
              // control={methods.control}
              name="subjects"
              render={({field}) =>(
                <Multiselect
                
                displayValue="name"
                options = {subjectList}
                onSelect={(a) => {
                  field.onChange(a.map(item => ({id:item.id , name:item.name})));
                  }}

                onRemove={(selectedList) => {
                  field.onChange(selectedList.map(item => ({id:item.id , name:item.name})));
                  }}
                 />
              )  }
              />
                </Card>
            

          </div> 

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Courses")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the courses of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
             
             <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Select Courses</Label>
              
              <Controller 
              // control={methods.control}
              name="courses"
              render={({field}) =>(
                <Multiselect
                
                displayValue="name"
                options = {coursesList}
                onSelect={(selectedList) => {
                  field.onChange(selectedList.map(item => ({id:item.id , name:item.name})));
                  }}

                onRemove={(selectedList) => {
                  field.onChange(selectedList.map(item => ({id:item.id , name:item.name})));
                  }}
                 />
              )  }
              />
                </Card>
            

          </div> 

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Batches")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" the batches of the teacher")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
             
             <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>Select Courses</Label>
              
              <Controller 
              control={methods.control}
              name="batches"
              render={({field}) =>(
                <Multiselect
                
                displayValue="name"
                options = {batch_array}
                onSelect={(selectedList) => {
                  field.onChange(selectedList.map(item => ({id:item.id , name:item.name})));
                  }}

                onRemove={(selectedList) => {
                  field.onChange(selectedList.map(item => ({id:item.id , name:item.name})));
                  }}
                 />
              )  }
              /> 
                </Card>
            

          </div> 

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Password")}
              details={`${initialValues ? t("Edit") : t("Create")} ${t(" password")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("Password")}*`}
                {...register("password")}
                type={'password'}
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

CreateUpdateTeacersForm.Layout = Layout;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
