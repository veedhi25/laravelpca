import Radio from "@components/ui/radio/radio";
import  Label  from "@components/ui/label";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./quiz.module.css";
import DefaultLayout from "@components/layout/default-layout";
import  Button  from "@components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import ShopLayout from "@components/layout/shop-layout";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useQuizSubmitMutation } from "@data/quiz/use-quiz-submit.query";
import router from "next/router";
import { useAllQuizQuery } from "@data/quiz/use-all-quiz.query";


export default function Quiz() {

  const { register, handleSubmit, errors } = useForm();

  const queryClient = useQueryClient();
  const { closeModal, openModal } = useModalAction();
  const { isAuthorize } = useUI();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  // const [sortedBy, setColumn] = useState<SortContacts>(SortContacts.Desc);
  
  const {data:user} = useCustomerQuery();
  const [participation, setParticipation] = useState(false);

  const {
    data:quizData,
    // isLoading: loading,
    // error,
  } = useAllQuizQuery({
    limit: 1000,
    page,
    // sortedBy,
    // orderBy,
  });

  console.log('quizData',quizData?.quiz?.data);

//   const { mutate: createquiz, isLoading: loading } = useQuizSubmitMutation();

  const postQuiz = async (data:any)=> {
    setLoading(true);
    const {data: response} = await http.post(
      `${url}/${API_ENDPOINTS.QUIZ}`,
      data,
    )  
    setLoading(false);
    return response;
     
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function showResult(data:any){
     openModal('QUIZ_RESULT_MODAL', {data: data})
  }

    console.log('me',user)

  const { mutate: createquiz } = useMutation(postQuiz, {
    onSuccess: (data) => {
        setLoading(false);
        // alert('done');
        // showResult(data);
        router.push('/home');
        
      
      console.log('quiz', data)
    },

    onError: (data) => {
        setLoading(false);
     
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.QUIZ)
    },
  })

  const correctAnswers = {
    q1: '496 AD',
    q2: 'St. Valentinus',
    q3: 'Roses',
    q4: 'Jurassic Park',
    q5: 'Japan'
  };
 

  function quizValidate() {
    quizData?.quiz?.data.some((quiz)=> {
    quiz?.phone_number === user?.me?.phone_number ? setParticipation(true) : null
   }
   ) 
 }


 console.log('part',participation)


 useEffect(()=>{
  quizValidate()
})


  const onSubmit = (data:any) => {

    

    if(participation){
      return openModal('QUIZ_VALIDATOR')
    }
    // quizValidate();

    if (!data?.q1 || !data?.q2 || !data?.q3 || !data?.q4 || !data?.q5) {
      // setLoading(false);
      return setError('Please answer all the questions before submitting!');
    }
    
    let numCorrect = 0;

    localStorage.setItem('valentine-input', JSON.stringify(input));


    if(!isAuthorize){
        return openModal('OTP_REGISTER',{
            pathname: '/quiz-form',
        });
      }

 
       
      
      if (data?.q1 === correctAnswers.q1) {
        numCorrect++;
      }
      if (data?.q2 === correctAnswers.q2) {
        numCorrect++;
      }
      if (data?.q3 === correctAnswers.q3) {
        numCorrect++;
      }
      if (data?.q4 === correctAnswers.q4) {
        numCorrect++;
      }
      if (data?.q5 === correctAnswers.q5) {   
        numCorrect++;
      }

      let input = {
        name: user?.me?.name,
        email: user?.me?.email,
        campaign_name: 'Valentine',
        right_answers: numCorrect,
        phone_number: isAuthorize && user?.me?.phone_number,
        q1: data?.q1,
        q2: data?.q2,
        q3: data?.q3,
        q4: data?.q4,
        q5: data?.q5,
      };

      if (data?.q1 === correctAnswers.q1) {
        numCorrect++;
      }
      if (data?.q2 === correctAnswers.q2) {
        numCorrect++;
      }
      if (data?.q3 === correctAnswers.q3) {
        numCorrect++;
      }
      if (data?.q4 === correctAnswers.q4) {
        numCorrect++;
      }
      if (data?.q5 === correctAnswers.q5) {   
        numCorrect++;
      }


      console.log(input)

      createquiz(input)

      if (data?.q1 || data?.q2 || data?.q3 || data?.q4 || data?.q5) {
        // setLoading(false);
        !participation && showResult(input)
      }

       
  }



  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full lg:w-1/2 mx-auto lg:shadow-2xl text-left" >

      <Label className="text-2xl text-center pb-5">Valentine’s Day Quiz. </Label>

      <div className="flex flex-col space-y-4 mx-auto items-center w-full">

            <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

                <Label className="leading-5">  When did Valentine's Day start being celebrated as a holiday?</Label>

                <div className="flex flex-col space-y-2">
                <Radio
                    id="1000 AD"
                    type="radio"
                    {...register("q1")}
                    value="1000 AD"
                    label={("1000 AD")}
                    className=""
                    
                />

                <Radio
                    id="496 AD"
                    type="radio"
                    {...register("q1")}
                    value="496 AD"
                    label={("496 AD")}
                    className=""
                />

                <Radio
                    id="273 AD"
                    type="radio"
                    {...register("q1")}
                    value="273 AD"
                    label={("273 AD")}
                    className=""
                />
                </div>

            </div>

            <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

                <Label className="leading-5">  Who is considered the patron saint of love and romance?</Label>

                <div className="flex flex-col space-y-2">
                    <Radio
                    id="St. Valentinus"
                    type="radio"
                    {...register("q2")}
                    value="St. Valentinus"
                    label={("St. Valentinus")}
                    className=""
                    />

                    <Radio
                        id="St Rose"
                        type="radio"
                        {...register("q2")}
                        value="St Rose"
                        label={("St Rose")}
                        className=""
                    />

                    <Radio
                        id="St Anthony"
                        type="radio"
                        {...register("q2")}
                        value="St Anthony"
                        label={("St Anthony")}
                        className=""
                    />
                </div>

            </div>

            <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

                <Label className="leading-5">  What is the most popular flower given on Valentine's Day?</Label>

                <div className="flex flex-col space-y-2">
                    <Radio
                    id="Lilies"
                    type="radio"
                    {...register("q3")}
                    value="Lilies"
                    label={("Lilies")}
                    className=""
                    />

                    <Radio
                        id="Roses"
                        type="radio"
                        {...register("q3")}
                        value="Roses"
                        label={("Roses")}
                        className=""
                    />

                    <Radio
                        id="Tulips"
                        type="radio"
                        {...register("q3")}
                        value="Tulips"
                        label={("Tulips")}
                        className=""
                    />
                </div>

            </div>

            <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

                <Label className="leading-5">  Which of the following movies is not a romantic comedy released around Valentine's Day?</Label>

                <div className="flex flex-col space-y-2">
                    <Radio
                    id="The Notebook"
                    type="radio"
                    {...register("q4")}
                    value="The Notebook"
                    label={("The Notebook")}
                    className=""
                    />

                    <Radio
                        id="When Harry Met Sally"
                        type="radio"
                        {...register("q4")}
                        value="When Harry Met Sally"
                        label={("When Harry Met Sally")}
                        className=""
                    />

                    <Radio
                        id="Jurassic Park"
                        type="radio"
                        {...register("q4")}
                        value="Jurassic Park"
                        label={("Jurassic Park")}
                        className=""
                    />
                </div>

            </div>

            <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

                <Label className="leading-5">  In which country is it a tradition to give women chocolate on Valentine's Day?</Label>

                <div className="flex flex-col space-y-2">
                    <Radio
                    id="France"
                    type="radio"
                    {...register("q5")}
                    value="France"
                    label={("France")}
                    className=""
                    />

                    <Radio
                        id="Japan"
                        type="radio"
                        {...register("q5")}
                        value="Japan"
                        label={("Japan")}
                        className=""
                    />

                    <Radio
                        id="USA"
                        type="radio"
                        {...register("q5")}
                        value="USA"
                        label={("USA")}
                        className=""
                    />
                </div>

            </div>

      </div>
      <span className="text-red-500 text-sm py-2">{error}</span>

      <Button
      onClick={()=>onSubmit()}
        loading={loading}
        className="w-full w-60 mt-5 lg:w-auto lg:ms-auto"
      >
        Submit
      </Button>

    </form>
  )
  };

  
  
          