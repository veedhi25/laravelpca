import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SetExamQuestion from "./set-exam-question";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import Layout from "@components/layouts/admin";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import Select from "@components/ui/select/select";
import Label from "@components/ui/label";
import Multiselect from "multiselect-react-dropdown";
import { useCreateExamMutation } from "@data/exams/use-exam-create.mutation";
import { useUpdateExamMutation } from "@data/exams/use-exam-update.mutation";
import { getKeyValue } from "./../../../../student/src/utils/get-key-value";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useExamSectionsQuery } from "@data/exam-sections/use-exam-section.query";
import { useExamsQuestionsQuery } from "@data/exam-questions/use-exam-questions.query";
import { useQuestionTypesQuery } from "@data/question-type/use-question-type.query";
import { useMarkingSchemesQuery } from "@data/marking-scheme/use-marking-scheme.query";
import SetExamQuestion1 from "./set-exam-question1";
import { useExamsQuery } from "@data/exams/use-exams.query";
import FileInput from "@components/ui/file-input";
import Control from "react-select/src/components/Control";
import { useExamQuery } from "@data/exams/use-exam.query";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useClassesQuery } from "@data/class/use-classes.query";

// const validationSchema = Yup.object().shape({
//   course_id : Yup.string().required('Course is required'),
//   name: Yup.string().required('Exam Name is required'),
//   sections: Yup.string().required('Sections is required'),
//   total_marks: Yup.number().required('Exam Name is required'),
// });

export default function CreateOrUpdateExamForm({ initialValues }) {
  const router = useRouter();
  const [toggle, setToggle] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [qusWithMarking, setQusWithMarking] = useState([]);
  // console.log("saurav qusWithMarking", qusWithMarking);
  const [options, selectOption] = useState([]);
  const [questionType, setQuestionType] = useState([]);
  const [question, setQuestion] = useState({});
  const [filterquestion, setFilterQuestion] = useState([]);
  const [questionToggel, setQuestionToggle] = useState(true);

  const [finalQuestion, setFinalQuestion] = useState([]);
  // console.log("saurav final", finalQuestion);
  const { openModal } = useModalAction();

  const [hasSubSections, setHasSubSections] = useState(false);
  const [subSectionCount, setSubSectionCount] = useState(0);
  const [initialSectionArray, setsinitialSectionArray] = useState(null);

   const [currentSection, SetCurrentSection] = useState("");
   const [currentSectionId, SetCurrentSectionId] = useState("");
  const [currentType, SetCurrentType] = useState("");
  const [currentTypeId, SetCurrentTypeId] = useState("");
  const [currentSubSection, SetCurrentSubSection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState([]);





  function handlePreview(data) {
    return openModal("PREVIEW_QUESTION", {
      data,
    });
  }

  const defaultValues = {
    name: initialValues?.name || "",
    course_id:
      { label: initialValues?.course_name, value: initialValues?.course_id } ||
      "",
      // class_id: 
    start_time: initialValues?.start_time || "",
    end_time: initialValues?.end_time || "",
    total_questions: initialValues?.total_questions || "",
    total_marks: initialValues?.total_marks || "",
    hours: Math.floor(parseInt(initialValues?.time) / 60) || 1,
    minutes: parseInt(initialValues?.time) % 60 || 0,
    // sections :  initialSectionArray
    // question_type: { label: initialValues?.question_type?.type, value: initialValues?.question_type?.id } || '',
    // question_mark: initialValues?.marks || '',
    // negative_marks: initialValues?.negative_marks || '', start_time
  };

  const { t } = useTranslation();
  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { data } = useCoursesQuery();
  const { data: sectionsData } = useExamSectionsQuery();
  const { data: questionsData } = useExamsQuestionsQuery({
    currentPage, 
    section_id: currentSectionId, 
    question_type_id: currentTypeId, 
    tag_id: tag 
   });
  const { data: questionTypes } = useQuestionTypesQuery();
  const { data: markingSchemes } = useMarkingSchemesQuery();

  const {data: student_class} = useClassesQuery();

  console.log("questionsData" , questionsData);

  const [sectionSubsectionDetails, setSectionSubsectionDetails] =
    useState();
    // options?.map(option => ({ sectionName: option?.name || "", ...option }))

    useEffect(()=>{
      if(!questionToggel)
      {
        let currentque = finalQuestion?.filter((ques) => {
          return (
            ques?.section?.name === currentSection &&
            ques?.question_type?.type === currentType &&
            ques?.questionSubSection == currentSubSection
    
          );
        });
      
    
        setFilterQuestion(currentque);
        return ;
      }
     setFilterQuestion(questionsData?.data)
    },[questionsData])

    useEffect(() => {
      setSectionSubsectionDetails(
        options?.map(({ name, ...option }) => ({
          sectionName: name || "",
          ...option,
          subSections: option.subSections?.map((subsection) => ({
            ...subsection,
            instructionsImageId: subsection.instructionsImageId || "",
          })),
        })) || []
      );
    }, [options]);

  useEffect(() => {
    let Obj = [];
    // Obj.push
    if (initialValues) {
      initialValues?.questions?.map((que) => {
        if (!Obj?.some((item) => item?.sectionName == que?.section_name)) {
          Obj.push({ sectionName: que?.section_name, id: que?.section?.id });
        }
      });

      const data123 = initialValues?.questions?.map((que) => {
        const data2 = Obj?.some(
          (item) => que.section_name == item?.sectionName
        );

        if (que?.question_subSection) {
          //  data2.subSections = que?.question_subSection
        }
      });

      // setsinitialSectionArray

      const sectionsArray = Obj?.map((item) => ({
        id: item.id,
        name: item.sectionName,
      }));
      setsinitialSectionArray(sectionsArray);
      selectOption(sectionsArray);
    }
  }, [initialValues]);

 

  // Handler to update whether a section has subsections
  const handleHasSubsectionsChange = (hasSubsections, optionIndex) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[optionIndex] = {
        ...updatedDetails[optionIndex],
        hasSubsections,
        sectionName: updatedDetails[optionIndex]?.sectionName, // use optional chaining to safeguard against undefined values
      };
      return updatedDetails;
    });
  };

  const handleSubsectionCountChange = (value, optionIndex) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[optionIndex] = {
        ...updatedDetails[optionIndex],
        subSectionCount: value === "" ? "" : parseInt(value, 10),
      };

      return updatedDetails;
    });
  };

  // Handler to update the subsection name
  const handleSubsectionNameChange = (name, optionIndex, subsectionIndex) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];

      if (!updatedDetails[optionIndex].subSections) {
        updatedDetails[optionIndex].subSections = Array.from(
          { length: updatedDetails[optionIndex]?.subSectionCount || 0 },
          () => ({})
        );
      }

      updatedDetails[optionIndex].subSections[subsectionIndex] = {
        ...updatedDetails[optionIndex].subSections[subsectionIndex],
        name,
      };

      return updatedDetails;
    });
  };

  const handleInstructionImageChange = (
    image,
    sectionIndex,
    subsectionIndex = null
  ) => {
    console.log("image changed:", image); // Debugging line
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      if (subsectionIndex !== null) {
        updatedDetails[sectionIndex].subSections[
          subsectionIndex
        ].instructionsImageId = image?.id || "";
      } else {
        updatedDetails[sectionIndex].instructionsImageId = image?.id || "";
      }
      console.log("Updated Details:", updatedDetails); // Debugging line
      return updatedDetails;
    });
  };

  const handleSubsectionImageChange = (image, optionIndex, subsectionIndex) => {
   
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];

      if (!updatedDetails[optionIndex].subSections) {
        updatedDetails[optionIndex].subSections = Array.from(
          { length: updatedDetails[optionIndex]?.subSectionCount || 0 },
          () => ({})
        );
      }

      updatedDetails[optionIndex].subSections[subsectionIndex] = {
        ...updatedDetails[optionIndex].subSections[subsectionIndex],
        section_instruction_img: image.original,
      };

      return updatedDetails;
    });
  };

  const handleSubsectionQuestionLimitChange = (
    limit,
    optionIndex,
    subsectionIndex
  ) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      if (!updatedDetails[optionIndex]?.subSections) {
        updatedDetails[optionIndex].subSections = [];
      }
      if (!updatedDetails[optionIndex].subSections[subsectionIndex]) {
        updatedDetails[optionIndex].subSections[subsectionIndex] = {};
      }
      updatedDetails[optionIndex].subSections[subsectionIndex].questionLimit =
        parseInt(limit, 10);
      return updatedDetails;
    });
  };

  // Handler to update the question types for a section/subsection
  const handleQuestionTypesChange = (
    questionTypes,
    optionIndex,
    subsectionIndex
  ) => {
    setSectionSubsectionDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      if (subsectionIndex !== undefined) {
        if (!updatedDetails[optionIndex].subSections) {
          updatedDetails[optionIndex].subSections = [];
        }
        updatedDetails[optionIndex].subSections[subsectionIndex] = {
          ...updatedDetails[optionIndex].subSections[subsectionIndex],
          questionTypes,
        };
      } else {
        updatedDetails[optionIndex] = {
          ...updatedDetails[optionIndex],
          questionTypes,
        };
      }
      return updatedDetails;
    });
  };

  const handleImage = () => {};

  // Use these handlers in your components, passing the appropriate arguments based on the inputs being changed

  const courses = data?.data?.courses.map((item) => ({
    label: item.name,
    value: item.id,
    id: item.id,
  }));

  const sectionsArray = sectionsData?.data.map((item) => ({
    id: item.id,
    name: item.name,
  }));


  const questionTypesArray = questionTypes?.data.map((item) => ({
    id: item.id,
    name: item.type,
  }));

  const classes = student_class?.map((item) => ({
    id: item.id,
    label: item.name+"th",
    value: item.name,
  }));

  console.log('classes', classes)

  // Then pass this to the Select

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods;

  const createExamMutation = useCreateExamMutation();
  const updateExamMutation = useUpdateExamMutation();

  const { data: exams } = useExamsQuery();

  console.log("sectionSubsectionDetails", sectionSubsectionDetails);

  const onSubmit = (formData) => {
    console.log("formData", formData);

   
    let finalQuestionInSequence = []
    sectionSubsectionDetails?.map((section)=>
    {
        console.log("section" , section)
        console.log("hasSubsections" , section?.hasSubsections)
        //sectionName

        if(section?.hasSubsections)
        {
        
          section?.subSections?.map((sec)=>{
             
            sec?.questionTypes?.map((type)=>{
              const data =  (finalQuestion?.filter((question)=>(question?.section_name == section?.sectionName && question?.question_type?.type == type.name && 
                question?.questionSubSection == sec?.name)))
              finalQuestionInSequence = [...finalQuestionInSequence , ...data ]
            })
            
          })
         
        }
        else
        {
          section?.questionTypes?.map((type)=>{
            const data =  (finalQuestion?.filter((question)=>(question?.section_name == section?.sectionName && question?.question_type?.type == type.name)))
            finalQuestionInSequence = [...finalQuestionInSequence , ...data ]
          })
          
        }

        

    })

    console.log("finalQuestionInSequence" , finalQuestionInSequence)

    const finalQuestionDataBase = finalQuestionInSequence?.map((question) => {
      return {
        question_id: question?.id, // assuming `question.id` holds the ID of the question
        marking_Scheme: {
          marks: question?.marking_Scheme?.marks, // replace with the correct attribute for marks
          negative: question?.marking_Scheme?.negative,
          // replace with the correct attribute for negative marks
        },
        question_subSection: question?.questionSubSection,
        // subsection :
      };
    });

    if (!sectionSubsectionDetails) {
      return "";
    }

    const examData = {
      name: formData.name,
      total_marks: formData.total_marks,
      total_questions: formData.total_questions,
      time: {
        hours: formData.hours,
        minutes: formData.minutes,
      },
      class_id: formData.class?.id,
      course: formData.course_id,
      finalQuestion: finalQuestionDataBase,
      start_time: formData?.start_time,
      end_time: formData?.end_time,
      date: formData.date, // Add suitable values here
      instructions_img_id: formData.image?.id, // Add suitable values here
      sections: sectionSubsectionDetails,
    };

    console.log("examData ", sectionSubsectionDetails);

    if (initialValues) {
      // If initialValues is present, it means you are updating an existing exam
      const examId = initialValues.id; // Or however you have the id in the initialValues
      updateExamMutation.mutate({ examId, updatedExam: examData });
    } else {
      // Create a new exam
      createExamMutation.mutate(examData, {
        onSuccess: () => {
          toast.success(t("common:successfully-updated"));
          router.push("/exams");
        },
        onError: () => {
        },
      });
    }
  };


//  if(!questionsData) return <Spinner />

  return (
    <>
      {toggle && (
        <div>
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
              <Card className="flex w-full mb-6">
                <Label className="">Exams</Label>
              </Card>

              <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                  title={t("Course")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " the name of the Course"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Label>Select Course</Label>
                  <Controller
                    name="course_id"
                    control={methods.control}
                    // defaultValue={initialValues?.course_id || ""}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={`${t("Select Course")}*`}
                        isClearable
                        options={courses}
                        onChange={(value) => field.onChange(value)}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </Card>
              </div>
              <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                  title={t("Exams")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " the name of the exam"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Input
                    label={`${t("Exam Name")}*`}
                    {...register("name")}
                    error={t(errors.name?.message || "")}
                    variant="outline"
                    className="mb-5"
                  />
                </Card>
              </div>

         
              <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                  title={t("Class")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " the name of the Class"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Label>Select Class</Label>
                  <Controller
                    name="class"
                    control={methods.control}
                    // defaultValue={initialValues?.course_id || ""}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={`${t("Select Class")}*`}
                        isClearable
                        options={classes}
                        onChange={(value) => field.onChange(value)}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </Card>
              </div>

              <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                  title={t("Exam Timing")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " the start and end time of the exam"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Label>{t("Exam Start Time")}*</Label>
                  <input
                    type="datetime-local"
                    {...register("start_time")}
                    className="mb-5 w-full h-12 border border-gray-300 rounded px-3"
                  />

                  <Label>{t("Exam End Time")}*</Label>
                  <input
                    type="datetime-local"
                    {...register("end_time")}
                    className="mb-5 w-full h-12 border border-gray-300 rounded px-3"
                  />
                </Card>
              </div>

              <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                <Description
                  title={t("Exam Sections")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " the name of exam sections"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Label>Exam Sections</Label>
                  <Controller
                    control={methods.control}
                    name="sections"
                    render={({ field }) => (
                      <Multiselect
                        displayValue="name"
                        options={sectionsArray}
                        // selectedValues={initialSectionArray}
                        selectedValues={field?.value?.map((value) =>
                          sectionsArray?.find((section) => section.id === value)
                        )}
                        onSelect={(selectedList) => {
                          selectOption(selectedList);
                          field.onChange(selectedList.map((item) => item.id));
                        }}
                        onRemove={(selectedList) => {
                          selectOption(selectedList);
                          field.onChange(selectedList.map((item) => item.id));
                        }}
                      />
                    )}
                  />
                </Card>
              </div>

              {options?.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-4">
                  <Description
                    title={`${t("Section")}: ${option.name}`}
                    className="w-full px-0 bg-white rounded my-4 sm:p-4"
                  />

                  <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Label>Does this section have Sub Sections?</Label>
                    <div className="flex items-center space-x-16">
                      <div className="flex items-center space-x-4">
                        <label
                          className="font-md text-gray-600 text-sm"
                          htmlFor={`yes-${optionIndex}`}
                        >
                          Yes
                        </label>
                        <input
                          id={`yes-${optionIndex}`}
                          name={`hasSubSections-${optionIndex}`}
                          type="radio"
                          value="yes"
                          checked={
                            sectionSubsectionDetails[optionIndex]
                              ?.hasSubsections === true
                          }
                          onChange={() =>
                            handleHasSubsectionsChange(true, optionIndex)
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <label
                          className="font-md text-gray-600 text-sm"
                          htmlFor={`no-${optionIndex}`}
                        >
                          No
                        </label>
                        <input
                          id={`no-${optionIndex}`}
                          name={`hasSubSections-${optionIndex}`}
                          type="radio"
                          value="no"
                          checked={
                            sectionSubsectionDetails[optionIndex]
                              ?.hasSubsections === false
                          }
                          onChange={() =>
                            handleHasSubsectionsChange(false, optionIndex)
                          }
                        />
                      </div>
                    </div>
                  </Card>

                  {sectionSubsectionDetails[optionIndex]?.hasSubsections ? (
                    <div className="mt-4">
                      <Label>Number of Sub Sections:</Label>
                      <Input
                        min={1}
                        max={4}
                        variant="outline"
                        type="number"
                        value={
                          sectionSubsectionDetails[optionIndex]
                            ?.subSectionCount ?? 1
                        }
                        onChange={(e) =>
                          handleSubsectionCountChange(
                            e.target.value,
                            optionIndex
                          )
                        }
                      />

                      {Array.from(
                        {
                          length:
                            sectionSubsectionDetails[optionIndex]
                              ?.subSectionCount || 1,
                        },
                        (_, index) => (
                          <Card key={index} className="space-y-5 mt-4 w-full ">
                            <Label>Sub section name</Label>
                            <Input
                              placeholder={`subsection ${index + 1}`}
                              type="text"
                              value={
                                sectionSubsectionDetails[optionIndex]
                                  ?.subSections?.[index]?.name || ""
                              }
                              onChange={(e) =>
                                handleSubsectionNameChange(
                                  e.target.value,
                                  optionIndex,
                                  index
                                )
                              }
                              // {...methods.register(`subsectionName${optionIndex}${index + 1}`)}
                            />
                            <Label>Sub section question limit</Label>

                            <Input
                              placeholder={`subsection ${
                                index + 1
                              } question limit`}
                              type="number"
                              // defaultValue={0}
                              min={0}
                              max={20}
                              value={
                                sectionSubsectionDetails[optionIndex]
                                  ?.subSections?.[index]?.questionLimit !==
                                undefined
                                  ? sectionSubsectionDetails[optionIndex]
                                      ?.subSections?.[index]?.questionLimit
                                  : ""
                              }
                              onChange={(e) =>
                                handleSubsectionQuestionLimitChange(
                                  e.target.value,
                                  optionIndex,
                                  index
                                )
                              }
                            />

                            <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                              <Description
                                title={t("Sub Section Instructions Image")}
                                details={t("Upload Instructions image")}
                                className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                              />

                              <Card className="w-full sm:w-8/12 md:w-2/3">
                                <div onClick={() => console.log("Clicked!")}>
                                  <FileInput
                                    name={`image-${optionIndex}-${index}`}
                                    control={control}
                                    multiple={false}
                                    onChange={(imageData) =>
                                      handleSubsectionImageChange(
                                        imageData,
                                        optionIndex,
                                        index
                                      )
                                    }
                                  />
                                </div>
                              </Card>
                            </div>

                            <Label>
                              Question Types in Sub Section {index + 1}:
                            </Label>
                            <Controller
                              name={`questionType${optionIndex}${index + 1}`}
                              control={methods.control}
                              render={({ field }) => (
                                <Multiselect
                                  displayValue="name"
                                  options={questionTypesArray}
                                  selectedValues={field?.value?.map((value) =>
                                    questionTypesArray?.find(
                                      (section) => section.id === value
                                    )
                                  )}
                                  onSelect={(selectedList) => {
                                    field.onChange(
                                      selectedList.map((item) => item.id)
                                    );
                                    handleQuestionTypesChange(
                                      selectedList.map((item) => item),
                                      optionIndex,
                                      index
                                    );
                                  }}
                                  onRemove={(selectedList) => {
                                    field.onChange(
                                      selectedList.map((item) => item.id)
                                    );
                                    handleQuestionTypesChange(
                                      selectedList.map((item) => item),
                                      optionIndex,
                                      index
                                    );
                                  }}
                                />
                              )}
                            />
                          </Card>
                        )
                      )}
                    </div>
                  ) : (
                    hasSubSections === false && (
                      <div
                        className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8"
                        key={optionIndex}
                      >
                        <Description
                          title={t(`${option.name}`)}
                          details={`${initialValues ? t("Edit") : t("Add")} ${t(
                            `${option.name} questions-Type`
                          )}`}
                          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                        />
                        <Card className="mt-4 w-full sm:w-8/12 md:w-2/3">
                          <Label>
                            Question Types in {option.name} section:
                          </Label>

                          <Controller
                            name={`questionType${optionIndex}`}
                            control={methods.control}
                            render={({ field }) => (
                              <Multiselect
                                displayValue="name"
                                options={questionTypesArray}
                                selectedValues={field?.value?.map((value) =>
                                  questionTypesArray?.find(
                                    (section) => section.id === value
                                  )
                                )}
                                onSelect={(selectedList) => {
                                  field.onChange(
                                    selectedList.map((item) => item.id)
                                  );
                                  handleQuestionTypesChange(
                                    selectedList.map((item) => item),
                                    optionIndex
                                  );
                                }}
                                onRemove={(selectedList) => {
                                  field.onChange(
                                    selectedList.map((item) => item.id)
                                  );
                                  handleQuestionTypesChange(
                                    selectedList.map((item) => item),
                                    optionIndex
                                  );
                                }}
                              />
                            )}
                          />
                          {/* <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
                            <Description
                              title={t("Section Instruction Image")}
                              details={t("Upload Instructions image")}
                              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                            />

                            <Card className="w-full sm:w-8/12 md:w-2/3">
                              <div onClick={() => console.log("Clicked!")}>
                                <FileInput
                                  name={`section-instruction-image-${optionIndex}`}
                                  control={control}
                                  multiple={false}
                                  onChange={(image) =>
                                    handleInstructionImageChange(
                                      image,
                                      optionIndex
                                    )
                                  }
                                />
                              </div>
                            </Card>
                          </div> */}
                        </Card>
                      </div>
                    )
                  )}
                </div>
              ))}

              {/* {
  options?.map((option, optionIndex) => {
    const que1 = questionsData.filter((question) => {
      return question.section === option.name;
    });

    return (
      <div
        className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8"
        key={optionIndex}
      >
        <Description
          title={t(`${option.name}`)}
          details={`${initialValues ? t("Edit") : t("Add")} ${t(
            `${option.name} questions-Type`
          )}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Label>Does this section have Sub Sections?</Label>
          <div className="flex items-center space-x-16">
            <div className="flex items-center space-x-4">
              <label
                className="font-md text-gray-600 text-sm"
                htmlFor={`yes-${optionIndex}`}
              >
                Yes
              </label>
              <input
                id={`yes-${optionIndex}`}
                name={`hasSubSections${optionIndex}`}
                type="radio"
                value="yes"
                checked={
                  sectionSubsectionDetails[optionIndex]?.hasSubsections === true
                }
                onChange={() => handleHasSubsectionsChange(true, optionIndex)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label
                className="font-md text-gray-600 text-sm"
                htmlFor={`no-${optionIndex}`}
              >
                No
              </label>
              <input
                id={`no-${optionIndex}`}
                name={`hasSubSections${optionIndex}`}
                type="radio"
                value="no"
                checked={
                  sectionSubsectionDetails[optionIndex]?.hasSubsections === false
                }
                onChange={() => handleHasSubsectionsChange(false, optionIndex)}
              />
            </div>
          </div>

          {sectionSubsectionDetails[optionIndex]?.hasSubsections === false && (
            <Controller
              control={methods.control}
              name={`${option.name}`}
              render={({ field }) => (
                <Multiselect
                  displayValue="name"
                  options={questionTypesArray}
                  selectedValues={field?.value?.map((value) =>
                    questionTypesArray?.find((section) => section.id === value)
                  )}
                  onSelect={(selectedList) => {
                    setQuestionType({
                      ...questionType,
                      [`${option.name}`]: selectedList,
                    });
                    field.onChange(selectedList.map((item) => item.id));
                  }}
                  onRemove={(selectedList) => {
                    //@ts-ignore
                    setQuestionType({
                      ...question,
                      [`${option.name}`]: selectedList,
                    });
                    field.onChange(selectedList.map((item) => item.id));
                  }}
                />
              )}
            />
          )}
        </Card>
      </div>
    )
  })
}
             */}

              <div
                className="flex flex-wrap pb-8 border-b border-dashed 
                          border-border-base my-5 sm:my-8"
              >
                <Description
                  title={t("Total Marks")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " total marks"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Input
                    label={`${t("Total Marks")}*`}
                    {...register("total_marks")}
                    error={t(errors.total_marks?.message || "")}
                    variant="outline"
                    className="mb-5"
                  />
                </Card>
              </div>

              <div
                className="flex flex-wrap pb-8 border-b border-dashed 
                          border-border-base my-5 sm:my-8"
              >
                <Description
                  title={t("Total Questions")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " total number of questions"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Input
                    type="number"
                    label={`${t("Total Questions")}*`}
                    {...register("total_questions")}
                    error={t(errors.total_questions?.message || "")}
                    variant="outline"
                    className="mb-5"
                    min={1}
                    max={300}
                  />
                </Card>
              </div>

              <div
                className="flex flex-wrap pb-8 border-b border-dashed 
                            border-border-base my-5 sm:my-8"
              >
                <Description
                  title={t("Time duration")}
                  details={`${initialValues ? t("Edit") : t("Add")} ${t(
                    " exam time duration"
                  )}`}
                  className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
                />

                <Card className="flex items-center space-x-4 w-full sm:w-8/12 md:w-2/3">
                  <Input
                    type="number"
                    label={`${t("Hours")}*`}
                    placeholder="hours"
                    {...register("hours")}
                    error={t(errors.hours?.message || "")}
                    variant="outline"
                    className="mb-5"
                    // defaultValue={1}
                    min={1}
                    max={3}
                  />

                  <Input
                    type="number"
                    label={`${t("Minutes")}*`}
                    placeholder="minutes"
                    {...register("minutes")}
                    error={t(errors.minutes?.message || "")}
                    variant="outline"
                    className="mb-5"
                    // defaultValue={0}
                    min={0}
                    max={59}
                  />
                </Card>
              </div>

              {/* <div>
        <label htmlFor="hours">Hours:</label>
        <Controller
          name="hours"
          control={methods.control}
          defaultValue=""
          render={({ field }) => <input {...field} type="number" min="0" step="1" />}
        />
      </div>
      <div>
        <label htmlFor="minutes">Minutes:</label>
        <Controller
          name="minutes"
          control={methods.control}
          defaultValue=""
          render={({ field }) => <input {...field} type="number" min="0" max="59" step="1" />}
        />
      </div> */}

              <button
                onClick={() => setToggle(!toggle)}
                type="submit"
                className="w-full h-12 mt-4 bg-accent rounded font-semibold text-base tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-accent-hover"
              >
                {t("Set Question")}
              </button>
            </form>
          </FormProvider>
        </div>
      )}

      {!toggle && (
        <SetExamQuestion1
          setToggle={setToggle}
          toggle={toggle}
          questionType={questionType}
          sections={sectionSubsectionDetails}
          que={questionsData}
          qusWithMarking={qusWithMarking}
          setQusWithMarking={setQusWithMarking}
          filterquestion={filterquestion}
          setFilterQuestion={setFilterQuestion}
          finalQuestion={finalQuestion}
          setFinalQuestion={setFinalQuestion}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          markingScheme={markingSchemes}
          questionToggel={questionToggel}
          setQuestionToggle={setQuestionToggle}

          currentSection={currentSection}
          SetCurrentSection={SetCurrentSection}
          currentType={currentType}
          SetCurrentType={SetCurrentType}
          currentSubSection={currentSubSection}
          SetCurrentSubSection={SetCurrentSubSection}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          questionForNow={questionsData}

          SetCurrentSectionId={SetCurrentSectionId}
          SetCurrentTypeId={SetCurrentTypeId}

          setTag={setTag}
        />
      )}

     
    </>
  );
}

CreateOrUpdateExamForm.Layout = Layout;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

// {
//   options?.map((option) =>
//  { const que1 = que.filter((ques) =>
//    {
//      return ques.section === option.name
//    })

//    return (
//      <div className="flex flex-wrap pb-8 border-b border-dashed
//                  border-border-base my-5 sm:my-8">

//    <Description
//      title={t(`${option.name}` )}
//      details={`${initialValues ? t("Edit") : t("Add")} ${t(`${option.name} questions`)}`}
//      className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
//    />

//    <Card className="w-full sm:w-8/12 md:w-2/3">
//    <Controller
//     control={methods.control}
//      name={`${option.name}`}
//      render={({ field }) => (
//     <Multiselect
//       displayValue="name"
//         options={que1}
//         selectedValues={field?.value?.map(value => que1?.find(section => section.id === value))}
//          onSelect={(selectedList) => {

//            setQuestion({...question , [`${option.name}`] : selectedList} )
//        field.onChange(selectedList.map(item => item.id));
//        }}
// onRemove={(selectedList) => {
//  setQuestion({...question , [`${option.name}`] : selectedList} )
//  field.onChange(selectedList.map(item => item.id));
// }}
// />
// )}
// />
//    </Card>
//    <button
//    onClick={() => handlePreview(question[option.name])}

//    className="w-1/4 h-12 mt-4 bg-blue-500 rounded font-semibold text-base tracking-wide text-white transition-colors duration-200 focus:outline-none hover:bg-blue-600"
//  >
//    { t("preview") }
//  </button>
//  </div>
//    )
//  })
//    }
