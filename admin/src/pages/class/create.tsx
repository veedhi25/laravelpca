import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Input from "@components/ui/input";
import Description from '@components/ui/description';
import * as Yup from 'yup';
import { useTranslation } from "next-i18next";
import { useForm , Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@components/ui/select/select";
import { useCreateStreamMutation } from "@data/class-stream/use-create-stream.mutation";
import { useCreateClassMutation } from "@data/class/use-create-class.mutation";
import { useClassStreamsQuery } from "@data/class-stream/use-class-streams.query";

const validationScheme = Yup.object().shape(
    {
        name : Yup.string().required('Nmae is required')
    }
)

const stream = [
  {id:1 , label:'Medical'},
  {id:2 , label:'Non-Medical(PCB)'},
  {id:3 , label:'Arts'},
  {id:4 , label:'Commerce'},
  {id:5 , label:'None'},
  // {id:6 , label:'Medical'},
]


export default function  CreateOrUpdateClass  ({initialValues}) {

    const defauletValues = {
      name : initialValues?.name || '',
    }

    const { register , handleSubmit, control , formState: { errors } } = useForm({
      resolver : yupResolver(validationScheme) ,
      defaultValues : defauletValues

    })

    const {t} = useTranslation();

    const {data:stream} = useClassStreamsQuery();


    const filteredStream = stream?.map((stream)=> ({
      id:stream.id,
      label: stream.name

    }))

    console.log('stream', filteredStream)
     

    const createClassMutation = useCreateClassMutation();

    const onSubmit = async (data) => {
      console.log("data", data);
  
      try {
          const payload = {
              name: data.name,
              // stream_id: data.stream.id  // Extracting the id from the stream object
          };
          const responseData =  createClassMutation.mutate(payload);
          console.log("Response:", responseData);
      } catch (error) {
          console.error("Error creating stream:", error);
      }
  };
  


    return ( 

    <div>
      
       <form onSubmit={handleSubmit(onSubmit)}>

       <div className="flex flex-wrap pb-8 border-b space-y-4 border-dashed border-border-base my-5 sm:my-8">
        
        <Description
          title={t("Class")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the class")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={`${t("Class Name")}*`}
            type="number"
            {...register("name")}
            error={t(errors.name?.message || '')}
            variant="outline"
            className="mb-5"
            min={1}
            max={12}
          />
        </Card>


        {/* <Description
          title={t("Class Stream")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the stream like PCM")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

         <Card className="w-full sm:w-8/12 md:w-2/3">
          <Controller
          name="stream"
          control={control}
          render={({field})=>
            (
              <Select
              {...field}
            
              options={filteredStream}
               />
            )}
           />

        </Card>  */}

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
 
CreateOrUpdateClass.Layout = Layout;