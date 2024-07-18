const Reading_Gujrati = ({handleClick , check , setCheck}) => {
    return ( <div className="ml-20">
    <div>
        <h1 className="  text-xl text-center mt-8">કૃપા કરીને સૂચનાઓને કાળજીપૂર્વક વાંચો</h1>
    </div>

    <div>
        <div>
            <div className="underline text-2xl font-bold text-black">સામાન્ય સૂચનાઓ:</div>
        </div>
        
        <ol className="ml-10 mt-3 text-[18px]  mr-10">
            <li>1.  JEE-Main - 4050367_B PLANNING 6th JAN 2020 Shift 2 Set 2 ની કુલ સમયગાળો 180 મિનિટ છે.</li>
            <li>2. ઘડિયાળ સર્વર પર સેટ કરવામાં આવશે. સ્ક્રીનની ઉપર જમણા ખૂણે કાઉન્ટડાઉન ટાઈમર પરીક્ષા પૂર્ણ કરવા તમારા માટે ઉપલબ્ધ બાકી સમય પ્રદર્શિત કરશે. જ્યારે ટાઈમર શૂન્ય સુધી પહોંચે છે, પરીક્ષા પોતે જ અંત લાવશે. તમારે તમારી પરીક્ષા સમાપ્ત કરવી અથવા સબમિટ કરવાની જરૂર નથી.</li>
            <li>3.  નીચેનાં પ્રતીકોમાંથી કોઇ એક પ્રતીકનો ઉપયોગ કરીને સ્ક્રીનની જમણી બાજુએ દર્શાવવામાં આવેલા પ્રશ્નોની પેલેટ દરેક પ્રશ્નની સ્થિતિ દર્શાવશે: </li>

                <ol className="ml-10 ">
                    <li className="mb-7 flex items-center ">1.<span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo1.png')]"></span> તમે હજી સુધી પ્રશ્નની મુલાકાત લીધી નથી.</li>
                    <li className="mb-7 flex items-center ">2.<span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo2.png')]"></span> તમે પ્રશ્નનો જવાબ આપ્યો નથી.</li>
                    <li className="mb-7 flex items-center ">3. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo3.png')]"></span>  તમે પ્રશ્નનો જવાબ આપ્યો છે.</li>
                    <li className="mb-7 flex items-center ">4. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo4.png')]"></span> તમે પ્રશ્નનો જવાબ આપ્યો નથી, પરંતુ સમીક્ષા માટે પ્રશ્ન ચિહ્નિત કર્યો છે.</li>
                    <li className="mb-7 flex items-center ">5. <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/Logo5.png')]"></span> મૂલ્યાંકન માટે પ્રશ્ન (ઓ) "જવાબ આપ્યો અને ચિહ્નિત થયેલ છે" માટે મૂલ્યાંકન કરવામાં આવશે.</li>
                </ol>

                  <div>
                <p className="mb-7 flex items-center "> 
પ્રશ્ન પર સમીક્ષાની સ્થિતિ માટે ચિહ્નિત થયેલું ફક્ત એ સૂચવે છે કે તમે ફરીથી તે પ્રશ્નને જોવા માંગો છો.</p>
                </div>
               
            
            <li>4. પ્રશ્ન પૅલેટને વિસ્તૃત જોવા માટે પ્રશ્ન પૅલેટની ડાબી બાજુએ જે "&gt;" તીર દેખાય છે તેના પર ક્લિક કરી શકો છો, જેનાથી પ્રશ્ન વિન્ડો વિસ્તૃત થાય છે. પ્રશ્ન પેલેટને ફરી જોવા માટે, તમે "&lt;" પર ક્લિક કરી શકો છો જે પ્રશ્ન વિંડોની જમણી બાજુ પર દેખાય છે.</li>

            <li>5. સમગ્ર પરીક્ષા દરમિયાન ભાષા બદલવા માટે તમે તમારી સ્ક્રીનની ઉપર જમણા ખૂણે તમારી "પ્રોફાઇલ" Image પર ક્લિક કરી શકો છો. પ્રોફાઇલ Image ને ક્લિક કરવા પર તમને પ્રશ્ન સામગ્રીને ઇચ્છિત ભાષામાં બદલવા માટે ડ્રોપ-ડાઉન મળશે.</li>

            <li className="mb-7 flex items-center ">6. તમે <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/down.png')]"></span>  ઉપર ક્લિક કરી શકો છો જે પ્રશ્નની નીચે લઈ જાય છે અને  <span className="mr-2 ml-2 w-[40px]  h-[40px]  bg-no-repeat  bg-cover bg-[url('https://www.nta.ac.in/img/QuizIcons/up.png')]"></span>  જે સ્ક્રોલિંગ વગર, પ્રશ્નની ટોચ પર લઈ જાય છે.</li>
        </ol>
    </div>



<div>
<div>
<div className="underline text-2xl font-bold text-black">પ્રશ્ન પર જવુ:</div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
<li>7. કોઈ પ્રશ્નનો જવાબ આપવા માટે, નીચે પ્રમાણે કરો:</li>
     

    <ol className="ml-10 ">
        <li className=" flex items-center ">
            a.ક્રમાંકિત પ્રશ્ન પર સીધા જ જવા માટે, તમારી સ્ક્રીનની જમણી બાજુએ આપેલ પેલેટના પ્રશ્ન નંબર પર પર ક્લિક કરો. નોંધ કરો કે આ વિકલ્પનો ઉપયોગ તમારા વર્તમાન પ્રશ્નનો જવાબ સાચવતો નથી.
         </li>

        <li className=" flex items-center ">b. વર્તમાન પ્રશ્નનો જવાબ સાચવવા માટે &nbsp;
    <strong className=" text-[#555] ">
      Save &amp; Next
    </strong> &nbsp;
    ઉપર ક્લિક કરો અને પછી આગળના પ્રશ્ન પર જાઓ.
    </li>
    <li className=" flex items-center ">c. વર્તમાન પ્રશ્નનો તમારો જવાબ બચાવવા માટે &nbsp;
    <strong className=" text-[#555] ">
      Mark for Review &amp; Next
    </strong>&nbsp;
    ઉપર ક્લિક કરો, તેની સમીક્ષા માટે ચિહ્નિત કરો, અને પછી આગલા પ્રશ્ન પર જાઓ.
    </li>
        
    </ol>
</ol>
</div>


<div>
<div>
<div className="underline text-2xl font-bold text-black"> પ્રશ્નનો જવાબ આપવો: </div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
<li>8. વૈકલ્પિક પ્રશ્નના જવાબની કાર્યવાહી:</li>
     

    <ol className="ml-10 ">
        <li className=" flex items-center ">
            a. તમરો જવાબ આપવા માટે, વિકલ્પો પૈકી કોઇ એક બટન પર ક્લિક કરો.

         </li>

        <li className=" flex items-center ">b. તમારા પસંદ કરેલા જવાબને નાપસંદ કરવા માટે, પસંદ કરેલ વિકલ્પના બટન પર ફરીથી ક્લિક કરો અથવા &nbsp;<strong className=" text-[#555] "> Clear Response &nbsp; </strong> બટન પર ક્લિક કરો.

    </li>
        <li className=" flex items-center ">
            c. તમારા પસંદ કરેલા જવાબને બદલવા માટે, બીજા વિકલ્પના બટન પર ક્લિક કરો.

         </li>

        <li className=" flex items-center ">d. તમારો જવાબ બચાવવા માટે, તમારે &nbsp; <strong className=" text-[#555] ">  Save & Next </strong> &nbsp;  બટન પર ક્લિક કરવું પડશે.

    </li>
        <li className=" flex items-center ">e. બટન પર ક્લિક કરવું પડશે. &nbsp;  <strong className=" text-[#555] "> Mark for Review & Next button </strong> &nbsp; &lt;બટન પર ક્લિક કરો.

    </li>
        
    </ol>
    <li>9. તમારા અગાઉથી આપવામાં આવેલા પ્રશ્નનોના જવાબ બદલવા માટે, સૌપ્રથમ જેતે પ્રશ્ન પસંદ કરો અને પછી તે પ્રકારના પ્રશ્નનો જવાબ આપવા માટેની પ્રક્રિયાને અનુસરો.</li>
    
</ol>
</div>



<div>
<div>
<div className="underline text-2xl font-bold text-black">વિભાગો દ્વારા આગળ જવુ: </div>
</div>

<ol className="ml-10 mt-3 text-[18px]  mr-10">
<li>10. આ પ્રશ્નપત્રોમાં વિભાગો સ્ક્રીનની ટોચની પટ્ટી પર દર્શાવવામાં આવે છે. એક વિભાગમાં પ્રશ્નો વિભાગ નામ પર ક્લિક કરીને જોઈ શકાય છે. તમે હાલમાં જોઈ રહ્યાં છો તે વિભાગ હાઇલાઇટ થયેલ છે.</li>
     

    
    <li>11. એક વિભાગ માટે છેલ્લા પ્રશ્ન પર બટન  <strong className=" text-[#555] "> Save & Next </strong>   પર ક્લિક કરો પછી , તમને આપોઆપ આગામી વિભાગના પ્રથમ પ્રશ્ન પર લઈ જવામાં આવશે.</li>
    <li>12. પરીક્ષા દરમ્યાન નક્કી કરેલ સમય દરમ્યાન તમારી સગવડ પ્રમાણે વિભાગો અને પ્રશ્નો વચ્ચે કોઈ ફેરબદલ કરી શકો છો.</li>
    <li>13. પ્રશ્ન પૅલેટની ઉપરના પ્રત્યેક વિભાગમાં દેખાતી નોંધના ભાગ રૂપે ઉમેદવાર અનુરૂપ વિભાગનો સારાંશ જોઈ શકે છે</li>
    
    
</ol>
</div>

<div className="  border-t border-b text-[18px] mt-4 mb-4 pt-6 pb-6 text-[#a94442]">
કૃપા કરીને નોંધો કે બધા પ્રશ્નો તમારી ડિફોલ્ટ ભાષામાં દેખાશે. આ ભાષાને પછીથી કોઈ ચોક્કસ પ્રશ્ન માટે બદલી શકાય છે.
</div>

<div className="border-b text-[18px] mb-6">
<div className="mb-8 mt-4">
<input type="checkbox" defaultChecked={check} onClick={()=> setCheck(!check)} className="mr-2"/> 
મેં સૂચનાઓ વાંચી છે અને સમજી છે. મને ફાળવેલ તમામ કમ્પ્યુટર હાર્ડવેર યોગ્ય કામ કરવાની સ્થિતિમાં છે હું જાહેર કરું છું કે હું મારી સાથે પરીક્ષા હોલમાં મોબાઇલ ફોન, બ્લુટુથ ડિવાઇસ વગેરે જેવા કોઈ પ્રતિબંધિત સાધન/ સમગ્રી ચાલુ નથી રાખી, પહેરી નથી, લાવ્યો નથી. હું સંમત છું કે સૂચનાઓનું પાલન ન કરવાના કિસ્સામાં, હું આ ટેસ્ટ અને / અથવા શિસ્તભંગની કાર્યવાહીમાંથી બાકાત થઈ શકું છું, જેમાં ભવિષ્યની ટેસ્ટ / પરીક્ષાઓ પર પ્રતિબંધ શામેલ હોઈ શકે છે.
</div>
</div>
<div className="flex items-center  justify-center mb-16">
<button onClick={handleClick}  className="bg-[#5cb85c] border-[#4cae4c] w-[30%] text-base font-bold text-white h-[38px]">PROCEED</button>
</div>

</div> );
}
 
export default Reading_Gujrati;