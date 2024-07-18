const Reading_Hindi = ({handleClick , check , setCheck}) => {
    return ( <div className="ml-20">
    <div>
        <h1 className="  text-xl text-center mt-8">कृपया निम्नलिखित निर्देशों को ध्यान से पढ़ें</h1>
    </div>

    <div>
        <div>
            <div className="underline text-2xl font-bold text-black">सामान्य अनुदेश:</div>
        </div>
        
        <ol className="ml-10 mt-3 text-[18px]  mr-10">
            <li>1.  सभी प्रश्नों को हल करने की कुल अवधि JEE-Main - 4050367_B PLANNING 6th JAN 2020 Shift 2 Set 2 के लिए 180 मिनट है।</li>
            <li>2.  सर्वर पर घड़ी लगाई गई है तथा आपकी स्क्रीन के दाहिने कोने में शीर्ष पर काउंटडाउन टाइमर में आपके लिए परीक्षा समाप्त करने के लिए शेष समय प्रदर्शित होगा। परीक्षा समय समाप्त होने पर, आपको अपनी परीक्षा बंद या जमा करने की जरूरत नहीं है । यह स्वतः बंद या जमा हो जाएगी।</li>
            <li>3.  स्क्रीन के दाहिने कोने पर प्रश्न पैलेट, प्रत्येक प्रश्न के लिए निम्न में से कोई एक स्थिति प्रकट करता है: </li>

                <ol className="ml-10 ">
                    <li className="mb-7 flex items-center ">1.<span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')]"></span> आप अभी तक प्रश्न पर नहीं गए हैं।</li>
                    <li className="mb-7 flex items-center ">2.<span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo2.png')]"></span> आपने प्रश्न का उत्तर नहीं दिया है।</li>
                    <li className="mb-7 flex items-center ">3. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo3.png')]"></span>  आप प्रश्न का उत्तर दे चुके हैं।</li>
                    <li className="mb-7 flex items-center ">4. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo4.png')]"></span> आपने प्रश्न का उत्तर नहीं दिया है पर प्रश्न को पुनर्विचार के लिए चिन्हित किया है।</li>
                    <li className="mb-7 flex items-center ">5. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')]"></span> प्रश्न जिसका उत्तर दिया गया है और समीक्षा के लिए भी चिन्हित है , उसका मूल्यांकन किया जायेगा ।</li>
                </ol>

                <div>
               <p className="mb-7 flex items-center "> कृप्या ध्यान दे प्रश्न "समीक्षा के लिए चिह्नित" की जांच नहीं की जाएगी, इसलिए अंक आवंटित नहीं किए जाएंगे।</p>
                </div>
               
            
            <li>4. आप प्रश्न पैलेट को छुपाने के लिए "&gt;" चिन्ह पर क्लिक कर सकते है, जो प्रश्न पैलेट के बाईं ओर दिखाई देता है, जिससे प्रश्न विंडो सामने आ जाएगा. प्रश्न पैलेट को फिर से देखने के लिए, "&lt;" चिन्ह पर क्लिक कीजिए जो प्रश्न विंडो के दाईं ओर दिखाई देता है।</li>
            <li>5. सम्पूर्ण प्रश्नपत्र की भाषा को परिवर्तित करने के लिए आपको अपने स्क्रीन के ऊपरी दाहिने सिरे पर स्थित प्रोफाइल इमेज पर क्लिक करना होगा। प्रोफाइल इमेज को क्लिक करने पर आपको प्रश्न के अंतर्वस्तु को इच्छित भाषा में परिवर्तित करने के लिए ड्राप-डाउन मिलेगा ।</li>
            
            <li className="mb-7 flex items-center ">6. आपको अपने स्क्रीन के निचले हिस्से को स्क्रॉलिंग के बिना नेविगेट करने के लिए <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/down.png')]"></span>  और ऊपरी हिस्से को नेविगेट करने के लिए <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/up.png')]"></span>   पर क्लिक करना होगा ।.</li>
        </ol>
    </div>



<div>
<div>
<div className="underline text-2xl font-bold text-black">किसी प्रश्न पर जाना :</div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
<li>7. उत्तर देने हेतु कोई प्रश्न चुनने के लिए, आप निम्न में से कोई एक कार्य कर सकते हैं:
</li>
     

    <ol className="ml-10 ">
        <li className=" flex items-center ">
            a.स्क्रीन के दाईं ओर प्रश्न पैलेट में प्रश्न पर सीधे जाने के लिए प्रश्न संख्या पर क्लिक करें। ध्यान दें कि इस विकल्प का प्रयोग करने से मौजूदा प्रश्न के लिए आपका उत्तर सुरक्षित नहीं होता है।
         </li>

        <li className=" flex items-center ">b. वर्तमान प्रश्न का उत्तर सुरक्षित करने के लिए और क्रम में अगले प्रश्न पर जाने के लिए 
    &nbsp;  <strong className=" text-[#555] ">
      Save &amp; Next
    </strong> &nbsp;
    पर क्लिक करें।

    </li>
    <li className=" flex items-center ">c. वर्तमान प्रश्न का उत्तर सुरक्षित करने के लिए, पुनर्विचार के लिए चिह्नित करने और क्रम में अगले प्रश्न पर जाने के लिए  
    &nbsp;  <strong className=" text-[#555] ">
      Mark for Review &amp; Next
    </strong> &nbsp;
    पर क्लिक करें।
    </li>
        
    </ol>
</ol>
</div>


<div>
<div>
<div className="underline text-2xl font-bold text-black"> प्रश्नों का उत्तर देना : </div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
<li>8. बहुविकल्पीय प्रकार के प्रश्न के लिए
</li>
     

    <ol className="ml-10 ">
        <li className=" flex items-center ">
            a. अपना उत्तर चुनने के लिए, विकल्प के बटनों में से किसी एक पर क्लिक करें।

         </li>

        <li className=" flex items-center ">b. चयनित उत्तर को अचयनित करने के लिए, चयनित विकल्प पर दुबारा क्लिक करें या &nbsp;  <strong className=" text-[#555] ">Clear Response</strong> &nbsp; बटन पर क्लिक करें।

    </li>
        <li className=" flex items-center ">
            c. अपना उत्तर बदलने के लिए, अन्य वांछित विकल्प बटन पर क्लिक करें।

         </li>
         
        <li className=" flex items-center ">d. अपना उत्तर सुरक्षित करने के लिए, आपको &nbsp;  <strong className=" text-[#555] ">Save & Next</strong> &nbsp; पर क्लिक करना जरूरी है।

    </li>
        <li className=" flex items-center ">e. किसी प्रश्न को पुनर्विचार के लिए चिह्नित करने हेतु &nbsp;  <strong className=" text-[#555] "> Mark for Review & Next</strong> &nbsp; बटन पर क्लिक करें।

    </li>
        
    </ol>
    <li>9.     किसी प्रश्न का उत्तर बदलने के लिए, पहले प्रश्न का चयन करें, फिर नए उत्तर के विकल्प पर क्लिक करने के बाद &nbsp;  <strong className=" text-[#555] ">Save & Next </strong> &nbsp;  बटन पर क्लिक करें। </li>
</ol>
</div>



<div>
<div>
<div className="underline text-2xl font-bold text-black"> अनुभागों द्वारा प्रश्न पर जाना:</div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
<li>10. इस प्रश्नपत्र में स्क्रीन के शीर्ष बार पर अनुभाग (Sections) प्रदर्शित हैं। किसी अनुभाग के प्रश्न, उस अनुभाग के नाम पर क्लिक करके देखे जा सकते हैं। आप वर्तमान में जिस अनुभाग का उत्तर दे रहे हैं, वह अनुभाग हाईलाइट होगा।</li>
     

    
    <li>11. किसी अनुभाग के लिए अंतिम प्रश्न के Save & Next बटन पर क्लिक करने के बाद, आप स्वचालित रूप से अगले अनुभाग के प्रथम प्रश्न पर पहुंच जाएंगे।</li>
    <li>12. आप परीक्षा में निर्धारित समय के दौरान किसी भी समय प्रश्नावलियों और प्रश्नों के बीच अपनी सुविधा के अनुसार आ-जा (शफल कर) सकते हैं।</li>
    <li>13. परीक्षार्थी संबंधित सेक्शन की समीक्षा को लीजेन्ड के भाग के रूप में देख सकते हैं ।</li>
    
    
</ol>
</div>

<div className="  border-t border-b text-[18px] mt-4 mb-4 pt-6 pb-6 text-[#a94442]">
कृपया ध्यान दें कि सभी प्रश्न आपकी चयनित डिफ़ॉल्ट भाषा में दिखाई देंगे। इस भाषा को बाद में किसी विशेष प्रश्न के लिए बदला जा सकता है ।
</div>

<div className="border-b text-[18px] mb-6">
<div className="mb-8 mt-4">
<input defaultChecked={check} type="checkbox" onClick={()=> setCheck(!check)} className="mr-2"/> 
मैंने उपरोक्त सभी निर्देशों को पढ़ और समझ लिया है। मेरे लिए आवंटित सभी कंप्यूटर हार्डवेयर उचित काम करने की स्थिति में हैं। मैं घोषणा करता हूं कि मैं किसी भी प्रकार के निषिद्ध गैजेट जैसे मोबाइल फोन, ब्लूटूथ डिवाइस इत्यादि / परीक्षा हॉल में मेरे साथ किसी भी प्रकार की निषिद्ध सामग्री नहीं हैं । मैं सहमत हूं कि निर्देशों का पालन न करने के मामले में, मैं इस टेस्ट और अनुशासनात्मक कार्रवाई के लिए उत्तरदायी होऊँगा, जिसमें भविष्य मे होने वाले टेस्ट / परीक्षाओं से प्रतिबंध भी शामिल हो सकता है ।
</div>
</div>
<div className="flex items-center  justify-center mb-16">
<button onClick={handleClick}  className="bg-[#5cb85c] border-[#4cae4c] w-[30%] text-base font-bold text-white h-[38px]">PROCEED</button>
</div>

</div> );
}
 
export default Reading_Hindi;