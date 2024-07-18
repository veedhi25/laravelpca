const AboutAllQuestion = ({course}) => {
    return ( <div className="bg-gray-100 w-full h-12 flex items-center">
       <span className="bg-[#38aae9] text-white pl-2 pr-2 rounded-sm ml-8 pt-1 pb-1 font-semibold">
          {course} 
           {/* icon <span></span> */}
       </span>
    </div> );
}
 
export default AboutAllQuestion;