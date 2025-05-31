import React, { useEffect } from 'react';




const ModalCertificate = ({ isOpen, onClose, children, imageSrc }) => {
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

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
        <div className="relative z-50 pointer-events-auto bg-gray-800 text-white rounded-xl p-6 w-auto h-auto overflow-auto shadow-2xl">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg font-bold"
            >
                ✕
            </button>

            {children}

            {imageSrc && (
                <div className="flex justify-center items-center w-full my-4">
                    <img
                        src={imageSrc}
                        alt="Project"
                        className="w-[90%] h-auto object-contain rounded-lg"
                    />
                </div>
            )}
        </div>
    </div>
);

};

export default ModalCertificate;
