import NavbarImg from "@components/jee_mains/NavbarImg";
import Footer from "@components/jee_mains/footer";
import Navbar from "@components/jee_mains/navbar";
import { Login_Card_Detail } from "@components/login_page/login-card-details";
import Login_Form from "@components/login_page/login_form";
import { useExamQuery } from "@data/exams/use-exam.query";
import { useExamsQuery } from "@data/exams/use-exams.query";
import NavbarImg1 from "@components/jee_mains/NavbarImg1";
import { useState } from 'react';
import Register_Form from "./registeration_form";
 
const Student_Login_Form = () => {

    // const {data} = useExamsQuery();
    // const {data:exam} = useExamQuery(14);
    // console.log('exams', exam);
    const [toggle , setToggle] = useState(true)

    return ( 

    <>
        <Navbar />
        <NavbarImg1 />
        {toggle && <Login_Form setToggle={setToggle} />}
        {!toggle && <Register_Form  setToggle={setToggle} />}
        
        <Footer/>
    </> 

    );
}
 

export default Student_Login_Form;