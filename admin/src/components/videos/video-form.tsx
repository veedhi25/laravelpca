
import { useForm , FormProvider , Controller } from 'react-hook-form';
import Select from '@components/ui/select/select';
import Label from "@components/ui/label";
import Multiselect from 'multiselect-react-dropdown';
import Description from '@components/ui/description';
import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import { UseTranslation, useTranslation } from 'next-i18next';
import TextArea from '@components/ui/text-area';
import { method } from 'lodash';
import { useCoursesQuery } from '@data/courses/use-courses.query';
import { CourseList } from '@components/courses/courses-list';
import { useExamSectionsQuery } from '@data/exam-sections/use-exam-section.query';
import { useTagsQuery } from '@data/tag/use-tags.query';
import Button from '@components/ui/button';
import FileInput from '@components/ui/file-input';



const CreateOrUpdateVideoForm = ({initialValues}) => {
   
const methods = useForm()

const {t} = useTranslation();

const {handleSubmit , register} = methods

const {data : courses} = useCoursesQuery()
const {data : subjects} = useExamSectionsQuery()
const {data : tags} = useTagsQuery()
console.log('courses' , tags)
   
 const onSubmit = (data)=>
{
    console.log(data);
}

const CourseList = courses?.data?.courses?.map((item)=>({
    name : item?.name,
    id : item?.id,
   

}))

const subjectList = subjects?.data?.map((item)=>({
    label : item.name,
    id : item.id,
   
}))

 const tagList = tags?.tags?.data?.map((item)=>({
    name : item?.name,
    id : item?.id,
 }))

    return ( <div>
   
<FormProvider {...methods} >
 <form onSubmit={handleSubmit(onSubmit)}>
   
    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
        <Description
          title={t("Courses")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(" courses for the video")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
        <Label>Courses</Label>
        <Controller
          control={methods.control}
          name='courses'
          render={({field})=>
            (
                <Multiselect 
                  {...field}
                  displayValue='name'
                  options={CourseList}
                  placeholder={'select courses for video'}
                  hidePlaceholder={true}
                  onSelect={(a) => {
                    field.onChange(a.map(item => ({id:item.id , name:item.name})));
                    }}
                  onRemove={(a) => {
                    field.onChange(a.map((item)=>({id:item.id , name:item.name})))
                    }}
                  
                 />
            )}
        />
        </Card>

    </div>


    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("Subject")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t("subject for the video")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
        <Label>Subject</Label>
        <Controller
        control={methods.control}
        name="subject"
        defaultValue={initialValues ? initialValues?.subject : ""}
        render={({field})=>(
           <Select
             {...field}
             options={subjectList}
             placeholder={'select subject for the video'}
            /> 
        )}
         />

        </Card>

    </div>



    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
        <Description
          title={t("Tags")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(" tags for the video")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
        <Label>Tags</Label>
           <Controller
                 
                 name='tags'
                control={methods.control}
                render={({field})=>(
                  <Multiselect
                        {...field}
                        displayValue='name'
                        options={tagList}
                        onSelect={(a)=>{
                        field.onChange(a.map((item)=>({name:item.nmae , id:item.id}))) }}
                        onRemove={(a)=>{  field.onChange(a.map((item)=>({name:item.name , id:item.id})))
                                    }}
                    /> )}
            />

        </Card>

    </div> 


    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("Link")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t("video link of video")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
        
        <Input
          label={`${t("Video Link")}*`}
          {...register('link')}
          defaultValue={initialValues ? initialValues?.link  :""}
        
        />

        </Card>

    </div>

    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("Saurav")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t("Saurav of video")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
        
        <FileInput name="image" control={methods.control} multiple={false}  />

        </Card>

    </div>



    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        
        <Description
          title={t("Description")}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(" description for the video")}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <TextArea
            label={`${t("Description")}*`}
            {...register("description")}
            defaultValue={initialValues ? initialValues?.description  :""}
            // error={t(errors.name?.message || '')}
            variant="outline"
            className="mb-5"
          />
        </Card>

    </div> 

    <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            // onClick={router.back}
            className="me-4"
            type="button"
          >
            {t("form:button-label-back")}
          </Button>
        )}

        {/* <Button loading={creating || updating}> */}
        <Button >
          {initialValues
            ? t("form:button-label-update-tag")
            : t("form:button-label-add-tag")}
        </Button>
      </div>

 </form>
</FormProvider>
    </div> );
}
 
export default CreateOrUpdateVideoForm;