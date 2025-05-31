import React, { useState } from 'react';

const Button = ({ text, onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
        isHovered ? 'bg-blue-700' : 'bg-blue-500'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
}
export default Button;
