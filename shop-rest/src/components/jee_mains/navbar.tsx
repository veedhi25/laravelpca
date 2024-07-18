import Link from "next/link"
const Navbar = () => {
    return ( <div >
        
       <Link href="/"><div className="bg-[#286090] text-white text-base pr-20 h-7 pt-0.5 flex flex-row-reverse items-center">Home</div></Link>

    </div> );
}
 
export default Navbar;