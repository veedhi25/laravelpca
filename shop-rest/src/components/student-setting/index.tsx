import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { Controller, useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useTranslation } from "next-i18next";
import Radio from "@components/ui/radio/radio";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import { useCoursesQuery } from "@data/courses/use-courses.query";
import FileInput from "@components/ui/file-input";
import { classNames } from 'classnames';
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { loadingIndicatorCSS } from "react-select/src/components/indicators";


type FormValues = {
  name: string;
  guardian_name: string;
  guardian_number: number;
  guardian_email: string;
  guardian_relation : string;
  email: string;
  password: string;
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



const CustomerCreateForm = ({data}) => {
  
  console.log("user data" , data)

  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState(null);
 
  const defaultValues = {
    name: data?.me?.name || "" ,
    email: data?.me?.email || "",
    password: "",
    phone_number: '',
    // current_location: '',
    gender:  data?.me?.gender || "",
    date_of_birth:'',
    // occupation: ''
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const {data : courses} = useCoursesQuery()
 
  
  

  const coursesList = courses?.data?.courses?.map((course)=>(
    {
      id : course.id,
      name : course.name,
    }
  )) 

  console.log("coursesList" , coursesList);
  
  // async function onSubmit({ name,guardian_name, guardian_number, email, password,phone_number,present_address,permanent_address,gender,education_history,courses,date_of_birth }: FormValues) {
  async function onSubmit(data : any) {
    
    console.log("submitteddata" , data)
    

   
  }

  
  return (
    <div>
    <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("Update Your Profile")}
        </h1>
      </div>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5  mr-10">
        <Description
          title={t("Information")}
          details={t("Update your information from here")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3 ">
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
          <Input
            label={t("Relation with Guardian")}
            {...register("guardian_relation")}
            type="text"
            variant="outline"
            className="mb-4"
            // error={t(errors.name?.message!)}
          />
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
         <div className="flex justify-between">
         <div className="flex flex-col my-3">
            <div className="flex   text-body-dark h-3  font-semibold text-xs leading-none mb-3">
              Gender
            </div>
            <div className="flex flex-col   lg:space-y-8 mt-2 ">
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

          <div className="flex flex-col my-3">
          <div className="flex   text-body-dark h-3  font-semibold text-xs leading-none mb-3">
              Profile Pic
            </div>
            <div>
          <FileInput
                    name={`profile_image`}
                    control={control}
                    multiple={false}
                    // onChange={(image) => handleImageChange(index, image)}
                  />
           </div>
          </div>
          </div>

   

            <Input
              // value='Chandigarh'
              label={"Present  Address"} 
              {...register("present_address")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.current_location?.message!)} />
            <Input
              // value='Chandigarh'
              label={"Permanent Address"} 
              {...register("permanent_address")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.current_location?.message!)} />

               <Input
              // value='Chandigarh'
              label={"Previous Education History"} 
              {...register("education_history")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.current_location?.message!)} />

            <div className="flex flex-col  items-start mb-3">
            <span className="text-sm text-gray-600 mb-2 font-semibold">Courses Enrolled For</span>
             

                     <Controller
                      control={control}
                      name="courses"
                      render={({ field }) => (
                       
                        <Multiselect
                        displayValue="name"
                        options={coursesList}
                        onSelect={(selectedValues)=>{
                          field.onChange(selectedValues.map((item)=>({id:item.id , name: item.name})))
                        }}

                        onRemove={(selectedValues)=>{
                          field.onChange(selectedValues.map((item)=>({id:item.id , name: item.name})))
                        }}
                        />    
                      )}
                />
              </div>






            <PasswordInput
              label={t("Password")}
              {...register("password")}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-4"
            />
          </Card>
        </div>

      <div className="mb-4 text-end mr-10">
        <Button >
          {t("Update")}
        </Button>
      </div>
    </form>
    </div>
  );
};

export default CustomerCreateForm;
