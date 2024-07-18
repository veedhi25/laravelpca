import {useState , useEffect}  from 'react';
import { toast } from "react-toastify";
import { UseTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const CountDownTimer = ({data , finalSubmit , warningTime , timeAfterRestart , resultToggle}) => {

  const {t} = useTranslation();
  const router = useRouter();
  const paperId = router?.query?.exam_id;
 

  if(!data) return;

  const [count , setCount] = useState( timeAfterRestart != 0 ? timeAfterRestart : data);

  // useEffect(()=>
  // {
  //   if(timeAfterRestart != 0)
  //   {
  //     setCount(timeAfterRestart)
  //   }
  // },[])

  useEffect(()=>
  {
    if(count == warningTime )
    {
       toast.error(t('Just 5 minutes left; the exam will auto-submit'),
       {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }
       
       )
    }

    if(count > 0)
    {
    setTimeout(() =>
    {
      setCount(count - 1 )
      const data = JSON.stringify(count)
      if(!resultToggle)
      {
      localStorage.setItem(`${paperId}time`, data)
      }
      else
      {
        localStorage.removeItem(`${paperId}attemptId`);
      }
    } , 1000);
  }
  else{
    finalSubmit();
  }

  
  },[count] 

  )

  const timeFormat = (time : any) =>
  {
      const hours = Math.floor(time/3600) ;
      const minutes = Math.floor((time%3600) / 60);
      const seconds = Math.floor(time%60);

      return (`${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`)
  }

 

  return ( <span>
    {timeFormat(count)} </span> );
}

export default CountDownTimer;