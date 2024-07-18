import React from 'react'

export default function QuizResultModal({data}:any) {

  console.log('result',data?.data);

  let right = data?.data?.right_answers;

  return (

    <div className='h-screen w-screen lg:w-100 lg:h-100   border bg-white'>
      <div className="bg-white p-8 rounded-lg">

              <div className="flex items-center justify-center">
                {right == 5 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 border-2 p-2 border-green-500 rounded-full mt-60 lg:mt-20 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18.707 5.293a1 1 0 00-1.414-1.414L8 13.586 4.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l10-10z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mt-60 lg:mt-20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 012 0v6a1 1 0 11-2 0V6zm0 8a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                    </svg>
                )}
              </div>
              
              <h2 className="text-xl font-bold mt-4 text-center">{right == 5 ? 'Congratulations!' : 'Better Luck Next Time!'}</h2>
              <p className="text-gray-700 mt-4 text-center">{right == 5 ? <span className='text-green-500' >{'You got'+ ' ' +right + '/5 answers correct'}</span>   : <span className='text-red-500' >{'You got'+' '+ (5 - right) + '/5 answers correct'}</span> }</p>
              <p className="text-gray-700 mt-4 text-center">{right == 5 ? 'You are eligible for lucky draw.' : 'Thank you for participating.'}</p>
              <p className="text-gray-500 mt-4 text-sm text-center">{right == 5 ? 'We will update you when the winner is announced' : 'Stay tuned for more contests.'}</p>
      </div>
    </div>
  )
}
