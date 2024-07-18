import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Input from "@components/ui/input";
import Description from '@components/ui/description';
import * as Yup from 'yup';
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateClassStreamMutation } from "@data/class/use-create-class.mutation";
import { create } from "lodash";
import { useCreateStreamMutation } from "@data/class-stream/use-create-stream.mutation";

const validationScheme = Yup.object().shape(
    {
        name : Yup.string().required('Nmae is required')
    }
)


export default function  CreateOrUpdateClassStream  ({initialValues}) {


    const defauletValues = {
      name : initialValues?.name || '',
    }

    const { register , handleSubmit , formState: { errors } } = useForm({
      resolver : yupResolver(validationScheme) ,
      defaultValues : defauletValues

    })
    const {t} = useTranslation()

    const {mutate: createClassStream} = useCreateStreamMutation();
     

    const onSubmit = (data : any)=>
    {
       console.log("data" , data);

       createClassStream({
        data
       }

       )
    }

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
            {...register("name")}
            error={t(errors.name?.message || '')}
            variant="outline"
            className="mb-5"
          />
        </Card>


        {/* <Description
          title={t("Class Stream")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(" the name of the stream like PCM")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={`${t("Class Stream")}*`}
            {...register("stream")}
            placeholder=" Arts , Medical, Non-Medical"
            error={t(errors.name?.message || '')}
            variant="outline"
            className="mb-5"
          />
        </Card> */}

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
 
CreateOrUpdateClassStream.Layout = Layout;