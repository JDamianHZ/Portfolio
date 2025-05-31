import React, { useEffect, useState } from 'react';
import ButtonIcon from"./ButtonRepo";
import ButtonRepo from './ButtonRepo';
import TechnologiesModal from './TechnologiesModal';
import GitHubRepo from"../../ImagesPanel/git.png";



const ModalProject = ({ isOpen, onClose, children, imageList, link,  title, description, icontech, nametech }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

      const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60">
            <div className="relative z-50 pointer-events-auto bg-gray-800 text-white rounded-xl p-6 w-[90%] h-[95%] overflow-auto shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg font-bold"
                >
                    ✕
                </button>
                {children}

                <h1 className="text-3xl font-bold mb-4 text-center ">{title}</h1>
                <div className='justify-center items-center  flex flex-col'>
                {imageList.length > 0 && (
                    <div className="relative w-full flex justify-center">
                    <img
                    src={imageList[currentIndex]}
                    alt={`Project ${currentIndex + 1}`}
                    className="max-h-[500px] w-auto object-contain"
                    />
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
                    <div className='w-[100%] mt-15 bg-gray-700 rounded-2xl shadow-lg'>
                        {description}
                    </div>
                </div>
                <h1 className="text-xl font-bold mt-5 mb-2 text-center ">Technologies</h1>
                <div className="w-full bg-gray-700 rounded-2xl shadow-lg flex flex-wrap items-center justify-center p-4">
                    <TechnologiesModal icon={GitHubRepo} name='GitHub' />
           
                </div>
                <div className='mt-5 justify-center items-center flex flex-col'>
                    <ButtonRepo text='Repositorie' icon={GitHubRepo} link={link}/>
                </div>


            </div>

        </div>
    );
};

export default ModalProject;
