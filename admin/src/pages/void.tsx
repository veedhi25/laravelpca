import React, { useState } from 'react';

const CenteredBox = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [placement, setPlacement] = useState(null);
  const [boxes, setBoxes] = useState([]);

  const handlePlusClick = () => {
    setShowSelect(true);
  };

  const handlePlacementSelect = (e) => {
    const selectedPlacement = e.target.value;
    setPlacement(selectedPlacement);
    setShowSelect(false);

    // Add a new box under the previous box
    setBoxes((prevBoxes) => [...prevBoxes, selectedPlacement]);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="relative">
        <div className="bg-gray-200 rounded-lg p-2 relative" onClick={handlePlusClick}>
          {/* Plus sign */}
          <div className="w-8 h-8 flex justify-center items-center text-gray-600 text-xl">
            +
          </div>
        </div>
        {showSelect && (
          <div className="absolute top-0 left-0 mt-8">
            <select
              className="p-2 border rounded"
              onChange={handlePlacementSelect}
              value={placement}
            >
              <option value="">Select placement</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        )}
        <div className="flex justify-center mt-4">
          {boxes.map((box, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-2 mx-2">
              {box === 'left' ? 'Left Box' : 'Right Box'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenteredBox;
