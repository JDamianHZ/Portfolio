import React from 'react';

const TechnologiesModal = ({ icon, name }) => {
  return (
    <div className="flex items-start m-1">
      <img src={icon} className="w-[30%] h-auto mr-1 object-contain" alt={name} />
    </div>
  );
};

export default TechnologiesModal;
