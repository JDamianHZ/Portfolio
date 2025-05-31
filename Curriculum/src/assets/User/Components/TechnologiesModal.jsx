import React from 'react';

const TechnologiesModal = ({ icon, name }) => {
  return (
    <div className="flex items-start m-5">
      <img src={icon} className="w-15 h-auto mr-4 object-contain filter invert" alt={name} />
      <h4 className="mt-6">{name}</h4>
    </div>
  );
};

export default TechnologiesModal;
