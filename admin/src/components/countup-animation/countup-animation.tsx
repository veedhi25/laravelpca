import CountUp from 'react-countup';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { useState } from 'react';



export default function CountUpAnimation() {

      
    const [countUp, setCountUp] = useState(false);

    function onVisibilityChange(isVisible:boolean) {
       isVisible ? setCountUp(true) : setCountUp(false) 
    }


    return (

       <>
       <div className=' bg-black z-100 relative space-y-8 lg:space-y-20 flex flex-col h-screen  sm:h-96 md:h-96 lg:h-96 mt-1 lg:mt-10 lg:rounded-lg  lg:py-0 shadow-xl lg:mx-10 text-white '>

           <img src='/banner8.jpeg' className='absolute z-10 opacity-20 h-full pt-0 w-full object-cover lg:object-fill'/>

            <div className='flex lg:items-center space-y-2 lg:space-y-2 px-9 lg:px-4  items-center flex-col'>  
                <h1 className=' text-2xl sm:text-2xl font-semibold lg:text-3xl '> Be a Part of Revolution, </h1>
                <h1 className=' text-2xl sm:text-2xl font-semibold lg:text-3xl '> Discover best of everything around you </h1>
            </div>

    <div className = ' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 space-y-10 sm:space-y-10 lg:space-y-0 place-items-center items-center  justify-around ' >

       <div className='flex flex-col  items-center'>

            <h1 className='text-2xl lg:text-4xl font-md'>

                    <ReactVisibilitySensor 
                        scrollCheck={true}
                        onChange={onVisibilityChange}
                        delayedCall  >
                            <span className='flex text-2xl md:text-3xl lg:text-4xl lg:items-center'>   
                                <CountUp start={0} end={countUp ? 5000 : 500} duration={1} >
                                    
                                </CountUp> + 
                            </span>
                    </ReactVisibilitySensor>

            </h1>
            <p className='text-2xl lg:tracking-widest'> Vendors </p>

        </div>

       <div className='flex flex-col  items-center'>

            <h1 className='text-2xl lg:text-4xl font-md'>
                    <ReactVisibilitySensor 
                        scrollCheck={true}
                        onChange={onVisibilityChange}
                        delayedCall  >
                        <span className='flex text-2xl md:text-3xl lg:text-4xl lg:items-center'>   
                            <CountUp start={0} end={countUp ? 100000 : 1000} duration={1} >
                                
                            </CountUp> + 
                        </span>
                    </ReactVisibilitySensor>
            </h1>

            <p className='text-2xl lg:tracking-widest'> Customers </p>
            
        </div>

        <div className='flex flex-col  items-center'>

            <h1 className='text-2xl lg:text-4xl font-md'>

                <ReactVisibilitySensor 
                            scrollCheck={true}
                            onChange={onVisibilityChange}
                            delayedCall  >
                            <span className='flex text-3xl md:text-3xl lg:text-4xl lg:items-center'>   
                                <CountUp start={0} end={countUp ? 12500000 : 12500} duration={1} >
                                    
                                </CountUp> + 
                            </span>
                </ReactVisibilitySensor>

            </h1>

            <p className='text-2xl lg:tracking-widest' > Savings </p>
            
        </div>

        <div className='flex flex-col  items-center'>

            <h1 className='text-2xl lg:text-4xl font-md'>

                 
                    <ReactVisibilitySensor 
                        scrollCheck = {true}
                        onChange = {onVisibilityChange}
                        delayedCall >
                        
                        <span className='flex text-3xl md:text-3xl lg:text-4xl lg:items-center'>   
                            <CountUp start={0} end={countUp ? 25000000 : 25000} duration={1} >
                                
                            </CountUp> + 
                        </span>
                    </ReactVisibilitySensor>
            
            </h1>

            <p className='text-2xl lg:tracking-widest'> Earnings </p>
            
        </div>

    </div>


  </div>
       </>
    )
}
