import AdminLayout from "@components/layouts/admin";
import Alert from "@components/ui/alert";
import { useState } from "react";
import { useForm , Controller } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Select from "@components/ui/select/select";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import TextArea from "@components/ui/text-area";
import { type } from './../../../../shop-rest/src/ts-types/generated';
import FileInput from "@components/ui/file-input";
 import { useClassesQuery } from "@data/class/use-classes.query";
import { useCreateStudyMaterialMutation } from "@data/study-material/use-create-study-material.mutation";
 

export default function CreateUpdateStudyMaterial ({initialValues}) {
    
    console.log('initialvalues', initialValues)

    const [errorMessage , setErrorMessage] = useState()

    const {handleSubmit, register, control} = useForm({
      defaultValues: initialValues
  });
  

    const {data : classes} = useClassesQuery()
    const formattedClasses = classes?.map(item => {
      let suffix = 'th';
      
      if (item.name === 1) {
        suffix = 'st';
      } else if (item.name === 2) {
        suffix = 'nd';
      } else if (item.name === 3) {
        suffix = 'rd';
      }
    
      return {
        id: item.id,
        label: item.name + suffix
      };
    });
    
    
    
    // console.log("class" ,classes);
    const {data : course } = useCoursesQuery()
    console.log("course" , course);

    const {t} = useTranslation()

    const CourseList = course?.data?.courses?.map((course)=>
    (
      {id : course?.id , label : course?.name}
    ))

    const createStudyMaterialMutation = useCreateStudyMaterialMutation();


    const onSubmit = (data) => {
      const payload = {
        // name: data.book_name,
        student_class_id: data.class.id,
        course_id: data.course.id,
        pdf_id: data.image.id,  // assuming the FileInput component returns an object with an id for the uploaded file
        // author_name: data.author_name,
        description: data.description
      };
    
      createStudyMaterialMutation.mutate(payload);
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
      ) : null }

      <Card>Study Material</Card>
      
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Select Class")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" class")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Label >Select Class*</Label>
            <Controller 
              name="class"
              control={control}
              defaultValue={initialValues?.class_id} // or appropriate mapping
              render={({field})=>(
                  <Select
                      {...field}
                      options={formattedClasses}
                  />
              )}
          />

            </Card>

          </div>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Select Course")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" course")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Label >Select Course*</Label>
              <Controller 
              name="course"
              control={control}
              defaultValue={initialValues?.course_id}
              render={({field})=>(
                <Select
                  {...field}
                  options={CourseList}
                 />
              )}
              />


            </Card>

          </div>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Upload Book Pdf")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" Pdf")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Label >Uploade Book PDF*</Label>
           
              <FileInput name="image" control={control} multiple={false}  />

            </Card>

          </div>
          {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Book Name")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t("book name")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
            label="Book Name"
            defaultValue={initialValues?.name}
            type="text"
            name="book_name"
            {...register("book_name")}
             />
            </Card>

          </div> */}
          {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Author Name")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t("book author name")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
            label="Author Name"
            type="text"
            name="author_name"
            {...register("author_name")}
             />
            </Card>

          </div> */}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
            <Description
              title={t("Description")}
              details={`${initialValues ? t("Edit") : t("Add")} ${t(" description")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            
            <Card className="w-full sm:w-8/12 md:w-2/3">
            <Label >Description*</Label>
              <TextArea
              name="description"
              {...register("description")}

               />
            </Card>

          </div>
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-accent rounded font-semibold text-base tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover"
          >
            {initialValues ? t("UPDATE") : t("ADD")}
          </button>
        </form>
     
    </>);
}
 
CreateUpdateStudyMaterial.Layout = AdminLayout ;