

const Reading_English = ({handleClick , check , setCheck}) => {
    

    





    return ( <div className="ml-20">
        <div>
            <h1 className="  text-xl text-center mt-8">Please read the instructions carefully</h1>
        </div>

        <div>
            <div>
                <div className="underline text-2xl font-bold text-black">General Instructions:</div>
            </div>
            
            <ol className="ml-10 mt-3 text-[18px]  mr-10 ">
                <li>1.  Total duration of JEE-Main - 4050367_B PLANNING 6th JAN 2020 Shift 2 Set 2 is 180 min.</li>
                <li>2.  The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                <li>3.  The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols: </li>

                    <ol className="ml-10 ">
                        <li className="mb-7 flex items-center ">1.<span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')]"></span> You have not visited the question yet.</li>
                        <li className="mb-7 flex items-center ">2.<span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo2.png')]"></span> You have not answered the question.</li>
                        <li className="mb-7 flex items-center ">3. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo3.png')]"></span>  You have answered the question.</li>
                        <li className="mb-7 flex items-center ">4. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo4.png')]"></span> You have NOT answered the question, but have marked the question for review.</li>
                        <li className="mb-7 flex items-center ">5. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')]"></span> The question(s) "Answered and Marked for Review" will be considered for evalution.</li>
                    </ol>
                   
                
                <li>4. You can click on the "&gt;" arrow which apperes to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on "&lt;" which appears on the right side of question window.</li>
                <li>5. You can click on your "Profile" image on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile image you will get a drop-down to change the question content to the desired language.</li>
                <li className="mb-7 flex items-center ">6. You can click on <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/down.png')]"></span> to navigate to the bottom and <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/up.png')]"></span>  to navigate to top of the question are, without scrolling.</li>
            </ol>
        </div>



<div>
<div>
    <div className="underline text-2xl font-bold text-black">Navigating to a Question:</div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
    <li>7. To answer a question, do the following:</li>
         

        <ol className="ml-10 ">
            <li className=" flex items-center ">
                a.Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.
             </li>

            <li className=" flex items-center ">b. Click on 
        &nbsp;  <strong className=" text-[#555] ">
          Save &amp; Next
        </strong> &nbsp;
        to save your answer for the current question and then go to the next question.
        </li>
        <li className=" flex items-center ">c. Click on 
        &nbsp;  <strong className=" text-[#555] ">
          Mark for Review &amp; Next
        </strong> &nbsp;
        to save your answer for the current question, mark it for review, and then go to the next question.
        </li>
            
        </ol>
</ol>
</div>


<div>
<div>
    <div className="underline text-2xl font-bold text-black"> Answering a Question: </div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
    <li>8. Procedure for answering a multiple choice type question:</li>
         

        <ol className="ml-10 ">
            <li className=" flex items-center ">
                a. To select you answer, click on the button of one of the options.

             </li>

            <li className=" flex items-center ">b. To deselect your chosen answer, click on the button of the chosen option again or click on the &nbsp;  <strong className=" text-[#555] ">Clear Response</strong> &nbsp; button

        </li>
            <li className=" flex items-center ">
                c. To change your chosen answer, click on the button of another option

             </li>

            <li className=" flex items-center ">d. To save your answer, you MUST click on the Save & Next button.

        </li>
            <li className=" flex items-center ">e. To mark the question for review, click on the Mark for Review & Next button.
            
        </li>
            
        </ol>
        <li>9. To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
        
</ol>
</div>



<div>
<div>
    <div className="underline text-2xl font-bold text-black"> Navigating through sections: </div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
    <li>10. Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by click on the section name. The section you are currently viewing is highlighted.</li>
         

        
        <li>11. After click the Save & Next button on the last question for a section, you will automatically be taken to the first question of the next section.</li>
        <li>12. You can shuffle between sections and questions anything during the examination as per your convenience only during the time stipulated.</li>
        <li>13. Candidate can view the corresponding section summery as part of the legend that appears in every section above the question palette.</li>
        
        
</ol>
</div>

<div className="  border-t border-b text-[18px] mt-4 mb-4 pt-6 pb-6 text-[#a94442]">
Please note all questions will appear in your default language. This language can be changed for a particular question later on.
</div>

<div className="border-b text-[18px] mb-6">
    <div className="mb-8 mt-4">
<input type="checkbox" defaultChecked={check} onClick={()=> setCheck(!check)} className="mr-2"/> 
I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall.I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations
</div>
</div>
<div className="flex items-center  justify-center mb-16">
    <button onClick={handleClick}  className="bg-[#5cb85c] border-[#4cae4c] w-[30%] text-base font-bold text-white h-[38px]">PROCEED</button>
</div>

    </div> );
}
 
export default Reading_English;


