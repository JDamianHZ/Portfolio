import React from 'react';

const FormatSkill = ({ imageSrc, name }) => {
  return (
    <>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={name || "Skill image"}
          className="w-auto md:h-50 h-25 mb-1 object-contain rounded-lg drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        />
      )}
    </>
  );
};

export default FormatSkill;
