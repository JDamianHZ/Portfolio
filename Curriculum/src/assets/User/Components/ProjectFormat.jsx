import React, { useState } from 'react';

const ProjectFormat = ({ title, description, imageList = [], link, onClick, disabled, technologies = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div
      onClick={onClick}
      className={`relative px-4 py-2 rounded-lg transition duration-300 ease-in-out h-auto md:w-[30%] w-[80%] flex flex-col items-center font-bold md:text-xl text-sm cursor-pointer ${
        isHovered ? 'bg-gray-700' : ''
      } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageList.length > 0 && (
        <div className="relative w-full flex justify-center">
          <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-900">
            <img
              src={imageList[currentIndex]}
              alt={`Project ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {imageList.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 text-2xl px-1 transition-colors duration-200"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 text-2xl px-1 transition-colors duration-200"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      <span>{title}</span>
      <span className="text-sm font-normal text-center">{description}</span>

      {technologies.length > 0 && (
        <div className="mt-2 flex flex-col self-start w-full">
          <h4 className="pl-2 text-blue-500">Technologies:</h4>
          <ul className="list-disc pl-6 text-sm font-normal">
            {technologies.map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectFormat;
