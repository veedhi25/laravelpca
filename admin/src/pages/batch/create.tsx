import Card from "@components/common/card";
import Description from "@components/ui/description";
import Input from "@components/ui/input";
import Select from "@components/ui/select/select";
import { useForm , Controller } from "react-hook-form"
import { useTranslation } from "next-i18next";
import Layout from "@components/layouts/admin"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "@components/ui/label";
import { useBatchesQuery } from "@data/batch/use-batches.query";
import { useClassesQuery } from "@data/class/use-classes.query";
import { useCreateBatchMutation } from "@data/batch/use-create-batch.query";

const validationScheme = Yup.object().shape(
    {
        name : Yup.string().required('Nmae is required'),
    }
)

const data = [
    {id:1 , label : '11'},
    {id:12, label : '12'},
    {id:3 , label : '10'},
    {id:4 , label : '9'},
]

export default function createOrUpdateBatch  ({initialValues})  {

    const defaultValues ={
        name : initialValues?.name || '',
        class : {id : initialValues?.class?.id , label : initialValues?.class?.label } || '',
    }

    const {register , handleSubmit, control , formState : {errors}} = useForm({
        resolver : yupResolver(validationScheme),
        defaultValues : defaultValues,
    })
    const {t} = useTranslation()

    const { data } = useClassesQuery();

    const formattedData = data?.map(item => ({
      id: item.id,
      label: item.name
    }));
    
    console.log(formattedData);
       

    const createBatchMutation = useCreateBatchMutation();

    const onSubmit = async (data) => {
      console.log("Submitted data:", data);
    
      try {
        const payload = {
          name: data.name,
          // student_class_id: data.class.id  // Assuming 'class' field returns an object with an 'id' property
        };
        const responseData = await createBatchMutation.mutateAsync(payload);
        console.log("Response:", responseData);
      } catch (error) {
        console.error("Error creating batch:", error);
      }
    };
    
    return ( 
    
    <div>
      
        <form onSubmit={handleSubmit(onSubmit)}>
 
        {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
         
         <Description
           title={t("Class")}
           details={`${initialValues ? t("Edit") : t("Select")} ${t(" the name of the Class")}`}
           className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
         />


 
         <Card className="w-full sm:w-8/12 md:w-2/3">
         <Label>Class*</Label>
          <Controller
          name="class"
          control={control}
          render = {({field})=>
        {
            return (
                <Select
                {...field}
                placeholder={`${t("Select Class")}*`}
                options={formattedData}

                 />
            )
        }}
          />
         </Card>
 
       </div>  */}

        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
         
          <Description
            title={t("Batch")}
            details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the batch")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={`${t("Batch Name")}*`}
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
             {initialValues ? t("Update") : t("Add")}
           </button>
 
        </form>
     </div> );
}
 
createOrUpdateBatch.Layout = Layout;