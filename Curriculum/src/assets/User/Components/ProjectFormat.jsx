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
          <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-lg ">
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

      {/* Cuadro de descripción con tamaño fijo y texto truncado */}
      <span
        className="text-sm font-normal text-center max-w-full h-36 overflow-hidden text-ellipsis bg-gray-700"
        style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
      >
        {description}
      </span>

      {technologies.length > 0 && (
        <div className="mt-2 flex flex-col w-full items-center">
          <h4 className="text-blue-500 mb-1">Technologies:</h4>
          <ul className="flex flex-wrap gap-2 justify-center list-none p-0 m-0">
            {technologies.slice(0, 3).map((tech, i) => (
              <li key={i} className="flex items-center rounded px-2 py-1">
                <img src={tech.icon} alt={tech.name} className="w-20 h-auto mr-2" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectFormat;
