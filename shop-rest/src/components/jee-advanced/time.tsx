import CountDownTimer from "@components/time/countdownTimer";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

const Time = ({time , finalSubmit , setToggle , timeAfterRestart , paperId , resultToggle}) => {
    
    
    const {t} = useTranslation();

    const hour = parseInt(time);
    console.log("time[0]",hour)
    const totalSec = JSON.parse(localStorage.getItem(`${paperId}time` )) != null || undefined ?JSON.parse(localStorage.getItem(`${paperId}time` )) : hour*60;
    const finalSubmithere = ()=>
    {
        setToggle(false)
        toast.info(t("Time Over"));
        finalSubmit()
    }
    

    return  (  <div className="w-full bg-blue-400 sm:bg-white flex justify-end sm:justify-between pt-2 pb-2">
        <div className="ml-4 font-semibold hidden sm:block">sections</div>
        <div className=" mr-4 text-white sm:text-black sm:font-semibold">Time Left : 
        <span className="bg-black sm:bg-white rounded pl-3 sm:pl-0 pr-3 ml-2 sm:ml-0"> <CountDownTimer resultToggle={resultToggle} data={totalSec} finalSubmit={finalSubmithere} warningTime={300} timeAfterRestart={timeAfterRestart}/></span> </div>

    </div> );
}
 
export default Time; 