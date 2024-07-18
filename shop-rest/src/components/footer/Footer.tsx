
import Link from 'next/link'
import { useModalAction } from "@components/ui/modal/modal.context";


const Footer = () => {

	const { openModal } = useModalAction();

  function handleJoin() {
    return openModal("LOGIN_VIEW");
  }

	return (

		<>
		{/* <img src='/pink-footer.jpg' className =' relative bg-fixed z-10 w-full object-cover' /> */}
		<div style ={{
            // backgroundImage: `url(${'/pink-footer.jpg'})`,
			// backgroundRepeat: 'no-repeat',
			// backgroundSize: '1900px 900px',
			// height: '900px',
			// objectFit: 'fill',
		}} className=' bg-pink-footer border-b-8 border-r-0 border-l-0  sm:border-16 border-gold border-t-0 sm:border-t-0 bg-cover   bg-no-repeat footer-wrapper 
		        text-10px py-2 p-4 md:pt-10
	           rounded-sm text-white mx-0 md:mx-10  mb-16 lg:mb-0 lg:px-20 justify-evenly mt-16'>
			  

			  <div className='footer-top-section 
                              grid  grid-cols-1  space-y-10 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4
							  space-x-6 text-left mb-8 p-4   border-gray-700 justify-evenly'>


			  	<div className='footer-section-links ml-6 lg:ml-0 space-y-4 mt- text-left'>


			  		<h5 className='footer-links-title mt-10 font-bold text-lg tracking-widest'> About  </h5>

					  <div className=' tracking-widest space-y-4'>

							<Link href='/about-us'><h5 className='phone-number cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline text-primary font-normal -mt-'> About Acharyakulam</h5></Link>
							<Link href='/careers'><h5 className='phone-number cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline text-primary font-normal -mt-'> Careers</h5></Link>
							<Link href='/terms'><h5 className='phone-number cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline text-primary font-normal -mt-'> Terms of Service</h5></Link>

							<Link href='/return-policy'><h5 className=' cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline phone-number text-primary font-normal -mt-'> Refunds/Cancellations</h5></Link> 
							<Link href='/privacy'><h5 className=' cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline phone-number text-primary font-normal -mt-'>Privacy Policy</h5></Link> 
							<Link href='/contact'><h5 className=' cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline phone-number text-primary font-normal -mt-'>Contact Us</h5></Link> 

					 </div>
			  		
			  	</div>

			  			  

				  <div className='footer-section-links  space-y-4 text-left'>

						<h5 className = 'footer-links-title font-bold tracking-widest  text-lg' > More </h5>

						<div className='space-y-0 tracking-widest'> 
						<a className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light mt-' href='/home#all-categories'><h5 className='light-text mt-4 font-light'>Categories</h5></a>
						<a className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light mt-' href='/home#featured-shops'><h5 className='light-text mt-4 font-light'> Local Shops</h5></a>
						<a className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light mt-' href='/home#ecommerce-store'><h5 className='light-text mt-4 font-light'> E-Stores</h5></a>	
						<a className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light mt-' href='/home#offer-of-the-day'><h5  className='light-text mt-4 font-light'> Offer of the Day</h5></a>
						<a className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light' href='/home#featured-products'><h5  className='light-text mt-4 font-light'> Featured Products</h5></a>
						<a className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light' href='/buylowcal-monthly-leaderboard-magazines'><h5  className='light-text mt-4 font-light'> Acharyakulam Magazines</h5></a>
						</div> 
			  	 </div>

				  <div className='footer-section-links  space-y-4 text-left'>
						<h5 className='footer-links-title font-bold text-lg tracking-widest '>Registrations</h5>

						<div className=' space-y-4 tracking-widest '>
							<Link href='https://admin.retailunnati.com/register'>
								<h5 className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light'>
									Register as Vendor </h5>
							</Link>
							<h5 onClick={handleJoin} className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light'>
								Register as Customer 
							</h5>
						</div>		  		
			  	  </div>

					<div className='footer-section-links  space-y-4 text-left'>
						<h5 className='footer-links-title font-bold text-lg tracking-widest '>Games</h5>

						<div className=' space-y-4 tracking-widest '>
							<Link href='https: //retailunnati.com/valentine-quiz'>
								<h5 className='light-text cursor-pointer text-sm md:text-md lg:text-md xl:text-xl hover:underline font-light'>
									Valentine Quiz </h5>
							</Link>
							
						</div>		  		
			  	  </div>



					<div className='flex flex-col  space-y-4'>
						<h5 id='heading' className='font-bold w-full text-lg  tracking-widest'> Follow Us</h5>
						<div className='grid grid-cols-4 xs++:grid-cols-4 md:grid-cols-2 lg:flex -ml-3 md:ml-0  justify-between w-60 place-items-center items-center  lg:gap-0 md:w-56 cursor-pointer text-3xl lg:text-xl'>
							
							<a target="_blank" href='https://www.facebook.com/buylowcal/'><div className='relative z-10 w-9 h-9 sm:w-16 sm:h-16 bg- rounded-full'> <img src='/fb-white.png' className='absolute object-contain z-100 h-10 w-10 hover:bg-blue-600 rounded-full   cursor-pointer text-xl hover:underline'/></div></a> 
							
							<a target="_blank" href='https://www.instagram.com/buylowcal/?hl=en'><div className='relative z-10 w-9 h-9 sm:w-16 sm:h-16 bg- rounded-full'> <img src='/insta-white.png' className='absolute object-contain z-100 h-10 w-10 hover:bg-red-500 rounded-full  text-red-500 cursor-pointer text-xl hover:underline'/></div></a>

							<a target="_blank" href='https://in.linkedin.com/company/buylowcal'><div className='relative z-10 w-9 h-9 sm:w-16 sm:h-16 bg- rounded-full'> <img src='/linked-in.png' className='absolute object-contain z-100 h-10 w-10 hover:bg-blue-600  rounded-full  cursor-pointer hover:underline'/></div></a>			

							<a target="_blank" href='https://www.youtube.com/channel/UCs0jYR_99h5GKs0cvRZSg-A'><div className='relative z-10 w-9 h-9 sm:w-16 sm:h-16 bg- rounded-full'> <img src='/youtube-white.png' className='absolute object-contain z-100 h-10 w-10 hover:bg-red-600 rounded-full  cursor-pointer hover:underline '/></div></a>		

						</div>
					</div>


			  </div>
			  
			  <div className='footer-bottom-section text-center md:text-right w-full  mb-4 sm:mb-6 p-2 px-4 -mt-6'>
			  	 
				    <h5 id='heading' className='font-md text-sm sm:text-xl text-white'> 
					 © 4221 RetailUnnati.com All Rights Reserved
				    </h5>
 
			  </div>

		</div>
		</>
	)
}

export default Footer
