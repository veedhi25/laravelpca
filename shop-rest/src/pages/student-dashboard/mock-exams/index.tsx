import UserDashboardSideBar from "src/pages/user-dashboard-sidebar";
import NavBar from "@components/navbar/NavBar";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCoursesQuery } from "@data/courses/use-courses.query";
import { useExamsQuery } from "@data/exams/use-exams.query";
import { useEffect, useState } from "react";
import { useStartExamMutation } from "@data/exam-submit/use-exam-submit.mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useRef } from "react";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useUI } from "@contexts/ui.context";
import { toast } from "react-toastify";


const MockExams = () => {
  const [filteredExam, setFilteredExam] = useState([]);

  const { handleSubmit, register, reset, watch } = useForm();
  const router = useRouter();
  const { data: user } = useCustomerQuery();
  const formDataRef = useRef(null);

  const {isAuthorize} = useUI()



  useEffect(()=>{
    if(!isAuthorize)
   {
   toast.error("please login")
   router.push(`/jee_mains_paper/student_login_form`);
  
   }
  },[])




   

  const handleSuccess = (data) => {
    

    const formData = formDataRef.current;
    console.log("form", data, formData);
    let attemptId;
    if (
      JSON.parse(localStorage.getItem(`${formData?.Paper_Code}attemptId`)) ==
        null ||
      JSON.parse(localStorage.getItem(`${formData?.Paper_Code}attemptId`)) ==
        undefined
    ) {
      localStorage.clear();
      attemptId = data.attempt_id;
    } else {
      attemptId = JSON.parse(
        localStorage.getItem(`${formData?.Paper_Code}attemptId`)
      );
    }

    const selectedExam = courses?.data?.courses.filter((item) => {
      return item.id == formData?.Exam_Code;
    });

    // if ((selectedExam[0]?.name == "IIT" || selectedExam[0]?.name == "iit" ) && (formData?.Paper_Code == 29 || formData?.Paper_Code == 30)) {
    if (
      selectedExam[0]?.name == "IIT" ||
      selectedExam[0]?.name == "JEE Mains" ||
      selectedExam[0]?.name == "IIT Advanced"
    ) {
      router.push(
        `/jee_advanced_paper?exam_id=${formData?.Paper_Code}&attemptId=${attemptId}&userId=${user?.me?.id}&is_mock=1`
        // `/jee_mains_paper/instruction_page/${formData?.Paper_Code}?is_mock=1`
      );
    } else {
      `/jee_advanced_paper?exam_id=${formData?.Paper_Code}&attemptId=${attemptId}&userId=${user?.me?.id}&is_mock=1`;
      // `/jee_mains_paper/instruction_page/${formData?.Paper_Code}?is_mock=1`
    }

    reset();
  };

  const startExamMutation = useStartExamMutation(handleSuccess);

  const onSubmit = (formData) => {
    formDataRef.current = formData;
    if (!formData || !formData.Paper_Code) {
      alert("Please fill out the required form fields.");
      return;
    }
  
    const existingAttemptId = JSON.parse(localStorage.getItem(`${formData?.Paper_Code}attemptId`));
  
    if (!existingAttemptId) {
      const examData = {
        user_id: user?.me?.id,
        exam_id: parseInt(formData?.Paper_Code),
        is_mock: 1, // Indicates it's a mock exam
      };
      startExamMutation.mutate(examData);
    } else {
      // If there's an existing attempt ID, directly handle the success scenario
      handleSuccess({ attempt_id: existingAttemptId });
    }
  };
  

  const { data: courses , isLoading} = useCoursesQuery();
  const { data: exam } = useExamsQuery();

  console.log("saurav exam", exam);

  const handleCourse = (e:any) => {

    const currentDate = new Date()
    const courseId = e.target.value;
    console.log("sauravcourse", courseId);

    const filteredExam = exam?.filter((item) => {
      const endTime = new Date(item?.end_time);
      const Id = parseInt(courseId);

      if( endTime < currentDate  )
       {
        return  item.course_id == Id;
       }
       else
       {
        return false;
       }
      
     
    });

    setFilteredExam(filteredExam);
    console.log("filteredExam", filteredExam);
  };

  const course = courses?.data?.courses;
  if (!course ) return <Spinner />;
  console.log("courses", course);
  console.log("courses exam" , exam);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="">
          <UserDashboardSideBar className="p-2" />
        </div>
        <div className="col-span-5 sm:ml-2 sm:mt-1 ">
          <div className="bg-[#185734] min-h-[700px] rounded-lg mt-1">
            <div className="text-center text-white font-semibold text-2xl pt-2">
              Mock Exams
            </div>
            <div className="flex justify-center mt-1 ml-4 mr-4  max-h-[500px]">
              {!exam ?<Spinner  /> :<form
                onSubmit={handleSubmit(onSubmit)}
                className="shadow-xl rounded-lg flex flex-col bg-white mt-2 w-[400px] max-h-[500px]  items-center "
              >
                <span className="font-semibold">
                  Hey, {user?.me?.name.split(" ")[0]}
                </span>
                <div className=" w-[80%] mt-6">
                  <label className=" text-lg mb-1">
                    Select exam you would like to appear
                  </label>

                  <select
                    type="text "
                    className="border border-[#555]  w-full h-[40px]  "
                    {...register("Exam_Code")}
                    onChange={(e) => handleCourse(e)}
                  >
                    <option value="">--Select--</option>
                    {/* `` */}
                    {course.map((courses) => {
                      return <option value={courses.id}>{courses.name}</option>;
                    })}
                  </select>
                </div>

                <div className=" w-[80%] mt-3 ">
                  <label className=" text-lg mb-1">paper</label>

                  <select
                    type="text"
                    className="border border-[#555] w-full h-[40px]  "
                    {...register("Paper_Code")}
                  >
                    <option value="">--Select--</option>
                    {/* `` */}
                    {filteredExam?.map((exam) => {
                      return <option value={exam.id}>{exam.name}</option>;
                    })}
                  </select>
                </div>

                <button className="mt-6 border font-bold text-xl text-white border-[#2e6da4]  w-[80%] h-[40px] bg-[#337ab7]">
                  START MOCK TEST
                </button>

                {/* <div className='mt-8  flex justify-center text-lg ml-10 w-[80%]'>For NTA Mock Tests of December 2018 onwards, please click here</div> */}
              </form>}
            </div>

            <div className="text-center mt-10 text-3xl text-white">
              Welcome to{" "}
              <span className="font-bold text-[#f7931e] ">
                Patanjali Career Academy
              </span>
              , Test practice Centre
            </div>
            <div className=" border-t border-white ml-4 lg:ml-12 mr-4 lg:mr-12 mt-12 text-2xl text-white">
              <div className="lg:ml-10 mt-6">
                This Mock Test is to familiarize the students about processes of
                Computer Based Test (CBT), candidate can understand various
                processes of Computer Based Test (CBT) with the available mock
                test.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockExams;
