import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { Controller, useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useCreateUserMutation } from "@data/user/use-user-create.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerValidationSchema } from "./user-validation-schema";
import Radio from "@components/ui/radio/radio";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import { useCoursesQuery } from "@data/courses/use-courses.query";
import FileInput from "@components/ui/file-input";
import { classNames } from 'classnames';
import Select from "@components/ui/select/select";
import { useClassesQuery } from "@data/class/use-classes.query";
import { useClassStreamsQuery } from "@data/class-stream/use-class-streams.query";
import { useBatchesQuery } from "@data/batch/use-batches.query";
import { useUpdateUserMutation } from "@data/user/use-user-update.mutation";


type FormValues = {
  name: string;
  guardian_name: string;
  guardian_number: number;
  guardian_email: string;
  guardian_relation : string;
  email: string;
  // password: string;
  phone_number: number;
  // current_location: string;
  gender:string;
  present_address: string;
  permanent_address: string;
  education_history: string;
  courses: string;
  date_of_birth: Date;
  // occupation:string,
};


const guardianRelationList = [
  {id : 1 , label : "Father"},
  {id : 2 , label : "Mother"},
  {id : 3 , label : "GrandFather"},
  {id : 4 , label : "GrandMother"},
  {id : 5 , label : "Brother"},
  {id : 6 , label : "Sister"},
]


const CustomerCreateForm = ({initialValues}) => {
  const { t } = useTranslation();
  // const { mutate: registerUser, isLoading: loading } = useCreateUserMutation();
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation();

 
  console.log("initialValues" , initialValues)
  
  const {data : courses } = useCoursesQuery();
  const {data : classes , isLoading} = useClassesQuery();
  const {data:stream} = useClassStreamsQuery();
  const {data : batch} = useBatchesQuery();

  // Create a new Date object for November 3, 2023
  console.log( "classes" , classes,stream)

  const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };
  
  // ...
  
  const initialDate = initialValues?.date_of_birth ? parseDate(initialValues?.date_of_birth) : '';
  
  const [birthDate, setBirthDate] = useState(initialDate);

  const defaultValues = {
    name : initialValues?.name || '',
    email: initialValues?.email || "",
    guardian_name: initialValues?.guardian_name,
    guardian_email: initialValues?.parents_email,
    phone_number	: initialValues?.phone_number || '',
    date_of_birth	: initialDate || '',
    gender	:  initialValues?.gender || '',
    permanent_address	: initialValues?.permanent_address || '',
    class	: initialValues ? {id : initialValues?.student_class?.id , label : initialValues?.student_class?.name  } : "",
    stream	: initialValues ? {id : initialValues?.class_stream?.id , label : initialValues?.class_stream?.name  } : "",
    batch	: initialValues ? {id : initialValues?.batch?.id , label : initialValues?.batch?.name  } : "",
    guardian_relation : {id : initialValues?.guardian_relation_id , label : (guardianRelationList?.find(item => item.id == initialValues?.guardian_relation_id))?.label} || '',
    guardian_number : initialValues?.parent_phone_number || '',
    courses : initialValues?.courses?.map((data)=>({id : data?.id , name : data?.name})),
    // profile_image : {id : initialValues?.profile_image?.id , original : `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${initialValues?.profile_image?.url}` , thumbnail : `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${initialValues?.profile_image?.url}` },
  };
  
  // console.log("relation" , {id : initialValues?.profile_image?.id , original : `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${initialValues?.profile_image?.url}` , thumbnail : `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${initialValues?.profile_image?.url}` } )
  

  // useEffect(() => {
  //   if (initialValues) {
  //     Object.keys(initialValues).forEach(key => {
  //       setValue(key, initialValues[key]);
  //     });
  //   }
  // }, [initialValues, setValue]);
  
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    // resolver: yupResolver(customerValidationSchema),
  });

  // console.log("coursesList" , batch);

  // const CreateUserMutation = useCreateUserMutation()

  const coursesList = courses?.data?.courses?.map((course)=>(
    { id : course.id, name : course.name,} )) 

  const classList = classes?.map((data) =>
  {
    return {label : data?.name , id : data?.id }
  })

  const streamList = stream?.map((stream)=> ({
    id:stream.id,
    label: stream.name
  }))

  const batchList = batch?.map((stream)=> ({
    id:stream.id,
    label: stream.name
  }))

  // async function onSubmit({ name,guardian_name, guardian_number, email, password,phone_number,present_address,permanent_address,gender,education_history,courses,date_of_birth }: FormValues) {
    function onSubmit(data: any) {
      console.log("submitteddata", data);
      var formattedDate = "";
      if (data?.date_of_birth) {
          const day = data?.date_of_birth?.getDate()?.toString()?.padStart(2, '0');
          const month = (data?.date_of_birth?.getMonth() + 1)?.toString()?.padStart(2, '0'); // Months are 0-based
          const year = data?.date_of_birth?.getFullYear();
          formattedDate = `${day}/${month}/${year}`;
      }
  
      const dataForDatabase = {
          name: data?.name,
          guardian_name: data?.guardian_name,
          phone_number: data?.phone_number,
          date_of_birth: formattedDate,
          gender: data?.gender,
          current_location: data?.present_address,
          student_class_id: data?.class?.id,
          stream_id: data?.stream?.id,
          parents_email: data?.guardian_email,
          batch_id: data?.batch?.id,
          permanent_address: data?.permanent_address,
          guardian_relation_id: data?.guardian_relation?.id,
          parent_phone_number: data?.guardian_number,
          // Include other fields as needed
      };
  
      // Include email only if it has been modified
      if (initialValues?.email !== data?.email) {
          dataForDatabase.email = data?.email;
      }
  
      console.log("dataForDatabase", dataForDatabase);
  
      updateUser({ variables: { id: initialValues?.id, input: dataForDatabase } });
  }
  


  const handleImageChange = (index, image) => {
    console.log('FileInput', image, index);
    setValue(`profile_image`, image);
    const imageData = watch(`profile_image`);
    
    console.log('FileInput handleImageChange index', index);
    console.log('FileInput', image, index);
    console.log('FileInput handleImageChange watch', imageData);
  };


  
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description 
          title={t("Information")}
          details={initialValues ? t("Update student information from here") : t("Add your student information and create a new student from here")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("Name")}
            {...register("name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
          />
          <Input
            label={t("Guardian Name")}
            {...register("guardian_name")}
            type="text"
            variant="outline"
            className="mb-4"
            // error={t(errors.name?.message!)}
          />
          <Input
            label={t("Guardian Number")}
            {...register("guardian_number")}
            type="number"
            variant="outline"
            className="mb-4"
            // error={t(errors.name?.message!)}
          />
          <Input
            label={t("Guardian Email")}
            {...register("guardian_email")}
            type="email"
            variant="outline"
            className="mb-4"
            // error={t(errors.name?.message!)}
          />

          
          <div className="flex flex-col  items-start mb-3 w-full sm:w-[50%]">
            <span className="text-sm text-gray-600 mb-2 font-semibold">Relation with Guardian </span>
             
            <div className="w-full">
                     <Controller
                      control={control}
                      name="guardian_relation"
                      render={({ field }) => (
                       
                        <Select
                           {...field}
                          options={guardianRelationList}
                        />    
                      )}
                />
              </div>
              </div>
          <Input
            label={t("Email")}
            {...register("email")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
         
          <Input
            label={t("Your Phone number")}
            {...register("phone_number")}
            type="number"
            variant="outline"
            className="mb-4"
            error={t(errors.phone_number?.message!)}
          />

           <div className="col-span-2 my-3 sm:col-span-1">
        
            <div className="flex  text-body-dark h-3  font-semibold text-xs leading-none mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-600 to-blue-600">
                  Date of Birth </span> </div>
              <Controller
                      control={control}
                      name="date_of_birth"
                      render={({ field: { onChange, onBlur, value } }) => (
                        //@ts-ignore
                        <DatePicker
                        selected={birthDate}
                        onChange={(date) => {
                          setBirthDate((date));
                          setValue("date_of_birth", date);
                        }}
                        dateFormat="dd-MM-yyyy"
                        className="text-sm h-12 w-full px-4 border border-border-base rounded focus:border-accent"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        peekNextMonth
                        showWeekNumbers
                        minDate={new Date(1900, 1, 1)}
                        maxDate={new Date()}
                        placeholderText={t("your date of birth")}
                        // className="w-full"
                  />    
                      )}
                />
        </div>
         <div className="sm:flex justify-between ">
         <div className="flex flex-col my-3">
            <div className="flex   text-body-dark h-3  font-semibold text-xs leading-none mb-3">
              Gender
            </div>
            <div className="flex gap-4 sm:gap-0 sm:flex-col sm:space-y-4 md:space-y-8 sm:mt-2 ">
              <Radio
                id="male"
                type="radio"
                {...register("gender")}
                value="male"
                label={t("Male")}
                className=""
              />

              <Radio
                id="female"
                type="radio"
                {...register("gender")}
                value="female"
                label={t("Female")}
                className=""
              />
              <Radio
                id="other"
                type="radio"
                {...register("gender")}
                value="other"
                label={t("Other")}
                className=""
              />
              </div>
          </div>

          {/* <div className="flex flex-col my-3">
          <div className="flex   text-body-dark h-3  font-semibold text-xs leading-none mb-3">
              Profile Pic
            </div>
            <div>
          <FileInput
                    name={`profile_image`}
                    control={control}
                    multiple={false}
                    onChange={(image) => handleImageChange(index, image)}
                  />
           </div>
          </div> */}
          </div>


            {/* <Input
              
              label={" Address"} 
              {...register("present_address")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.present_address?.message!)} /> */}
            <Input
            
              label={" Address"} 
              {...register("permanent_address")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.permanent_address?.message!)} />

               {/* <Input
              label={"Previous Education History"} 
              {...register("education_history")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.current_location?.message!)} /> */}

        <div className="flex justify-between flex-wrap w-full"  >
           <div className="flex flex-col items-start mb-3 w-full sm:w-[30%]">
            <span className="text-sm text-gray-600 mb-2 font-semibold">Select class </span>
             
                    <div className="w-full ">
                     <Controller
                      control={control}
                      name="class"
                      render={({ field }) => (
                       
                        <Select
                           {...field}
                          options={classList}
                        />    
                       
                      )}
                      className="w-28"
                />
              </div>
              </div>
         
           <div className="flex flex-col  items-start mb-3 w-full sm:w-[30%]">
            <span className="text-sm text-gray-600 mb-2 font-semibold">Select Stream </span>
             
            <div className="w-full">
                     <Controller
                      control={control}
                      name="stream"
                      render={({ field }) => (
                       
                        <Select
                           {...field}
                          options={streamList}
                        />    
                      )}
                />
              </div>
              </div>

           <div className="flex flex-col  items-start mb-3 w-full sm:w-[30%]">
            <span className="text-sm text-gray-600 mb-2 font-semibold">Select Batch </span>
             
            <div className="w-full ">
                     <Controller
                      control={control}
                      name="batch"
                      render={({ field }) => (
                       
                        <Select
                           {...field}
                          options={batchList}
                        />    
                      )}
                />
              </div>
              </div>
           </div>
            {/* <div className="flex flex-col  items-start mb-3">
            <span className="text-sm text-gray-600 mb-2 font-semibold">Courses Enrolled For</span>
             

                     <Controller
                      control={control}
                      name="courses"
                      
                      render={({ field }) => (
                       
                        <Multiselect
                        displayValue="name"
                        options={coursesList}
                        selectedValues={field.value}
                        onSelect={(selectedValues)=>{
                          field.onChange(selectedValues.map((item)=>({id:item.id , name: item.name})))
                        }}

                        

                        onRemove={(selectedValues)=>{
                          field.onChange(selectedValues.map((item)=>({id:item.id , name: item.name})))
                        }}
                        />    
                      )}
                />
              </div> */}






            {/* <PasswordInput
              label={t("Password")}
              {...register("password")}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-4"
            /> */}
          </Card>
        </div>

      <div className="mb-4 text-end">
        <Button  loading={loading} disabled={loading}>
          {initialValues ? t("Update Student") :t("Create Student")}
        </Button>
      </div>
    </form>
  );
};
 
export default CustomerCreateForm;
