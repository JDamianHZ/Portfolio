import { useState } from "react";
import Button from "./Button";

const FormatDeleteProject = ({ imageList = [], tittle, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col justify-center items-center m-2 w-[30%] bg-gray-600 rounded-lg shadow-lg p-4">
      <div className="relative w-full h-60  shadow-lg overflow-hidden flex justify-center items-center">
        {imageList.length > 0 && (
          <>
            <img
              src={imageList[currentIndex]}
              alt={`Project ${currentIndex + 1}`}
              className="h-full w-auto object-contain"
            />
            {/* Flecha izquierda */}
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
          </>
        )}
      </div>
      <div className="text-white font-bold text-lg mt-2">{tittle}</div>
      <Button
        text="Delete"
        className="mt-2 text-white font-bold py-2 px-4 rounded"
        onClick={onDelete}
      />
    </div>
  );
};

export default FormatDeleteProject;
