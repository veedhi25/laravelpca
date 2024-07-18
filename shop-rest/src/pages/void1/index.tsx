import React, { useState , useRef } from 'react';

function NumericKeypad({inputValue , setInputValue , inputRef }) {


  
  // const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (value) => {
    // Handle numeric key presses and update the input value
    if(value == '.')
    {
      if(inputValue.includes(value))
      {
        return ;
      }
    }

    if(value == '-')
    {
      if(inputValue.length > 0)
      {
        return ;
      }
    }

   


    setInputValue((prevValue) => prevValue + value);
  };

  const handleDelete = () => {
    // Handle delete/backspace key press and remove the last character
    if(inputValue.length == 1)
    {
      setInputValue("Clear All")
    }
    else{
    setInputValue((prevValue) => prevValue.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    // Handle submission of the numeric input value (you can implement your logic here)
    alert(`Submitted value: ${inputValue}`);
  };

  const handleLeftArrow = () => {
    // const input = document.getElementById('inputField');
    // const currentPosition = input.selectionStart;
    // const newValue = inputValue.substring(0, currentPosition) + inputValue.substring(currentPosition + 1);
    // setInputValue(newValue);
    // input.setSelectionRange(currentPosition + 1, currentPosition + 1);
    // Handle left arrow button click (you can implement your logic here)
  };

  const handleRightArrow = () => {
    // Handle right arrow button click (you can implement your logic here)
  };

  return (
    <div className="">
     
      <div className="bg-gray-100 ">
          
          <div>
          <button className='border border-1 border-black rounded-lg pl-3 pr-3 pb-1 pt-1 font-bold mt-2' onClick={handleDelete}>BackSpace</button>
          </div>

        <div className="key-row">
          
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('1')}>1</button>
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('2')}>2</button>
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('3')}>3</button>
        </div>
        <div className="key-row">
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('4')}>4</button>
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('5')}>5</button>
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('6')}>6</button>
        </div>
        <div className="key-row">
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('7')}>7</button>
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('8')}>8</button>
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('9')}>9</button>
        </div>
        <div className="key-row">
          <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('0')}>0</button>
          <button className='border border-1 border-black rounded-lg pl-2.5 pr-2.5 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('.')}>.</button>
          <button className='border border-1 border-black rounded-lg pl-2.5 pr-2.5 ml-2 pt-1 pb-1 font-bold mt-2' onClick={() => handleKeyPress('-')}>-</button>
        </div>
        <div className="key-row">
        <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-4 pt-1 pb-1 font-bold mt-2' onClick={handleLeftArrow}>&larr;</button> {/* Left arrow button */}
        <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-1 pt-1 pb-1 font-bold mt-2' onClick={handleRightArrow}>&rarr;</button> {/* Right arrow button */}
        </div>
        <div className="key-row">
          
        <button className='border border-1 border-black rounded-lg pl-2 pr-2 ml-2 pt-1 pb-1 font-bold mt-2' onClick={()=>setInputValue('Clear All')}>Clear All</button>
        </div>
      </div>
    </div>
  );
}

export default NumericKeypad;