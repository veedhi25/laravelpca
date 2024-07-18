import React from "react";

const CheckmarkIcon = () => {
  return (
    <span className="checkmark-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path fill="#4CAF50" d="M19 3H5C3.9 3 3.01 3.9 3.01 5L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9.01 16.59L4.7 12.28c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l2.89 2.89 6.38-6.38c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.79 7.79c-.39.39-1.02.39-1.41 0z" />
      </svg>
      <style jsx>{`
        .checkmark-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
        }

        .checkmark-icon svg path:nth-of-type(2) {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: checkmark 0.5s ease-in-out forwards;
        }

        @keyframes checkmark {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </span>
  );
};

export default CheckmarkIcon;
