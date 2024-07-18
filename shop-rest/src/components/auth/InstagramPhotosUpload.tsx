import React from 'react';

interface InstagramConnectProps {
  onConnect: () => void;
}

const InstagramConnect: React.FC<InstagramConnectProps> = ({ onConnect }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <p className="text-gray-700 font-semibold text-lg text-center mb-2">
        Or connect to Instagram
      </p>
      <button
        onClick={onConnect}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none hover:bg-blue-700"
      >
        Connect to Instagram
      </button>
    </div>
  );
};

export default InstagramConnect;
