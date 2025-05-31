import React, { useState } from 'react';

const ButtonRepo = ({ text, onClick, disabled, icon, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
<button
  onClick={onClick}
  disabled={disabled}
  className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out h-full md:w-[30%] w-[80%] flex flex-col items-center font-bold md:text-xl text-sm ${
    isHovered ? 'bg-gray-700' : ''
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {icon && (
    <img src={icon} alt="Icon" className="w-auto md:h-12 h-8  mb-1 object-contain filter invert" />
  )}
  <span>{text}</span>
</button>

  );
}
export default ButtonRepo;
