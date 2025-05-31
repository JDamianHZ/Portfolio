import React, { useState } from 'react';

const CertificateFormat = ({ title, description, imageSrc, link, onClick, disabled, technologies}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out h-auto md:w-[30%] w-[80%] flex flex-col items-center font-bold md:text-xl text-sm ${
        isHovered ? 'bg-gray-700' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Certificate"
          className="w-auto md:h-50 h-25 mb-1 object-contain rounded-lg drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        />
      )}
      <span>{title}</span>
      

    </button>
  );
};

export default CertificateFormat;
