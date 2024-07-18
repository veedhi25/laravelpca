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
import { useUserExamAttemptsQuery } from "@data/exams/use-user-exam-attempts.query";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useUI } from "@contexts/ui.context";
import { toast } from "react-toastify";
import { useExamAttemptStatus } from "@data/exam-submit/use-exam-attempt-status.query";
import { useSpring, animated } from 'react-spring';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useRealTime } from "@data/realTime/real-time-query";

const Exams = () => {
  const [filteredExam, setFilteredExam] = useState([]);
  const [active, setActive] = useState(true);
  const [paperId , setPaperId] = useState(null)

  const { handleSubmit, register, reset, watch } = useForm();
  const router = useRouter();
  const { data: user } = useCustomerQuery();
  const formDataRef = useRef(null);
  const { data: allAttempts } = useUserExamAttemptsQuery(user?.me?.id);
  console.log("allAttempts", allAttempts);



  const { data: courses, isLoading } = useCoursesQuery();
  const { data: exam } = useExamsQuery();
  const { isAuthorize } = useUI();

  const {data:status } = useExamAttemptStatus(paperId, user?.me?.id);
    
  const {data : time} = useRealTime() 
   
  console.log("time" , time)

  console.log('status', status);
  console.log('status paper', paperId);
  console.log('status Id', user?.me?.id);

  const fadeInUp = useSpring({
    from: { opacity: 1, transform: 'translateY(1px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 50, // Adjust delay as needed
  });
  
  const fadeIn = useSpring({
    from: { opacity: 1 },
    to: { opacity: 1 },
    delay: 50, // Adjust delay as needed
  });
  


  useEffect( () => {
    if (!isAuthorize) {
      toast.error("please login");
      router.push(`/jee_mains_paper/student_login_form`);
    }

    
  }, []);

  

  const handleSuccess = (data) => {
    const formData = formDataRef.current;
    console.log("form", data, formData);
    let attemptId;
    if (                                                                            //
      JSON.parse(localStorage.getItem(`${formData?.Paper_Code}attemptId`)) ==
        null ||
      JSON.parse(localStorage.getItem(`${formData?.Paper_Code}attemptId`)) ==
        undefined
    ) {
      localStorage.clear();
      attemptId = data.attempt_id;
    } else {
      if(JSON.parse(localStorage.getItem(`${formData?.Paper_Code}userId`)) == user?.me?.id){
         
        attemptId = JSON.parse( localStorage.getItem(`${formData?.Paper_Code}attemptId`) );
       }
       else
       {
        localStorage.clear();
        attemptId = data.attempt_id;
       }
     
    }

    const selectedExam = courses?.data?.courses.filter((item) => {
      return item.id == formData?.Exam_Code;
    });

    // if ((selectedExam[0]?.name == "IIT" || selectedExam[0]?.name == "iit" ) && (formData?.Paper_Code == 29 || formData?.Paper_Code == 30)) {
    if (
      selectedExam[0]?.name == "IIT" ||
      selectedExam[0]?.name == "iit" ||
      selectedExam[0]?.name == "IIT Advanced"
    ) {
      router.push(
        `/jee_advanced_paper?exam_id=${formData?.Paper_Code}&attemptId=${attemptId}&userId=${user?.me?.id}&is_mock=0`
      );
    } else {
      router.push(
        `/jee_advanced_paper?exam_id=${formData?.Paper_Code}&attemptId=${attemptId}&userId=${user?.me?.id}&is_mock=0`
      );
      // router.push(`/jee_mains_paper/instruction_page/${formData?.Paper_Code}`);
    }
    reset();
  };

  const startExamMutation = useStartExamMutation(handleSuccess);

  const onSubmit = (formData) => {
    if (status?.is_submitted) {
      toast.error("Exam is already attempted");
      return;
    }
  
    formDataRef.current = formData;
    if (!formData || !formData.Paper_Code) {
      alert("Please fill out the required form fields.");
      return;
    }
  
    const existingAttemptId = JSON.parse(localStorage.getItem(`${formData?.Paper_Code}attemptId`));
    
    // Only call the mutation to start a new attempt if no existing attempt ID is found
    if (!existingAttemptId) {
      const examData = {
        user_id: user?.me?.id,
        exam_id: parseInt(formData?.Paper_Code),
        is_mock: 0,
      };
      startExamMutation.mutate(examData);
    } else {
      // Handle resuming the exam with the existing attempt ID
      handleSuccess({ attempt_id: existingAttemptId });
    }
  };
  
  

  console.log("saurav exam", exam);




  const handleCourse = (e) => {
    const courseId = e.target.value;
    console.log("sauravcourse", courseId);
    console.log("sauravcourse 11", exam);

    // const currentDate = new Date();

    const currentDate = new Date(time?.data?.dateTime);


    console.log("123 ",currentDate)
    // console.log("123 5 ",currentDate1)

    const filteredExam = exam?.filter((item) => {
      const startTime = new Date(item?.start_time);
      const endTime = new Date(item?.end_time);
      const Id = parseInt(courseId);


      

      if (currentDate >= startTime && endTime >= currentDate) {
        return item.course_id == Id;
      } else {
        return false;
      }
    });

    console.log("filteredExam.length", filteredExam?.length);
    if (filteredExam?.length == 0) {
      setActive(false);
    }
    setFilteredExam(filteredExam);
  };

  const checkAttemptId = (e) => {
    console.log("Sauravkjhbwjhbfvjbvw", e.target.value);
    //   const data = allAttempts.some((item) =>(item.exam_id == e.target.value) )
    //  if(data)
    //  {
    //   alert("You've already taken this exam")
    //  }
  };

  const course = courses?.data?.courses;
  if (!course || !time) return <Spinner />;
  console.log("courses", course);
  console.log("courses exam", exam);
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="lg:grid lg:grid-cols-6">
        <div className="">
          <UserDashboardSideBar className="p-2" />
        </div>
        <div className="col-span-5 sm:ml-2 sm:mt-1 ">
          <animated.div style={fadeInUp} className="bg-[#012B55] min-h-[700px] rounded-lg mt-1 shadow-lg transition-all duration-500">
            <div className="text-center text-white text-2xl pt-2 font-medium">
              Live Exams
            </div>

            <animated.div style={fadeIn} className="flex justify-center mt-1 ml-4 mr-4 max-h-[500px]">
              {!exam ? <Spinner /> : (
                <form onSubmit={handleSubmit(onSubmit)} className="shadow-xl rounded-lg flex flex-col bg-white mt-2 w-[400px] max-h-[500px] items-center p-4">
                  <span className="font-semibold ">
                    Hey, {user?.me?.name.split(" ")[0]}
                  </span>
                  <div className="w-full mt-6">
                    {/* Exam Selection Dropdown */}
                    <div className="mb-4">
                      <label className="block text-lg mb-2 font-semibold text-gray-700">
                        Select exam you would like to appear
                      </label>
                      <select
                        className="border border-gray-300 w-full h-10 px-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        {...register("Exam_Code")}
                        onChange={(e) => handleCourse(e)}
                      >
                        <option value="">--Select--</option>
                        {course.map((courses) => (
                          <option key={courses.id} value={courses.id}>{courses.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Paper Selection Dropdown */}
                    <div className="mb-6">
                      <label className="block text-lg mb-2 font-semibold text-gray-700">
                        Select Paper
                      </label>
                      <select
                        className="border border-gray-300 w-full h-10 px-3 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        {...register("Paper_Code")}
                        onChange={(e) => setPaperId(parseInt(e.target.value))}
                      >
                        <option value="">
                          {active ? "--Select--" : "Select Paper"}
                        </option>
                        {filteredExam?.map((exam) => (
                          <option key={exam.id} value={exam.id} disabled={exam.disabled}>
                            {exam.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button className="mt-6 w-full h-10 bg-[#337ab7] text-white font-bold rounded-md hover:bg-[#2e6da4] transition-all duration-300">
                    START TEST
                  </button>
                </form>
              )}
            </animated.div>

            <animated.div style={fadeIn} className="text-center mt-10 text-3xl text-white">
              Welcome to <span className="font-bold text-[#f7931e]">
                Patanjali Career Academy
              </span>, Test practice Centre
            </animated.div>
            <div className="border-t border-white ml-4 lg:ml-12 mr-4 lg:mr-12 mt-12 text-xl">
              <div className="lg:ml-10 mt-6 text-xl text-gray-300">
                <p>
                  This Mock Test is designed to familiarize students with the processes of a Computer Based Test (CBT). Through this mock test, you can understand various aspects of CBT, helping you to be better prepared for your actual examination.
                </p>
                <p className="mt-4">
                  The tests are structured to reflect the pattern and difficulty level of the real exams. We encourage you to utilize these resources to enhance your preparation and build confidence.
                </p>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );

  
};

export default Exams;
