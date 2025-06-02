import React from 'react';

const TechnologiesModal = ({ icon, name }) => {
  return (
    <div className="flex justify-center items-center m-1 w-[30%]">
      <img src={icon} className="h-auto object-contain" alt={name} />
    </div>
  );
};

export default TechnologiesModal;
