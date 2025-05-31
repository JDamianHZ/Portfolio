import React, { useRef, useEffect } from 'react';

const AutoResizeTextarea = ({ value, onChange, width }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (onChange) {
      onChange(e); // Propaga el evento onChange al padre
    }
  };

  // Ajusta la altura si el valor cambia desde fuera
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleInput}
      rows="1"
      style={{ width }}
      className="rounded-md p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100%] resize-none overflow-hidden"
      placeholder="Escribe aquí..."
    />
  );
};

export default AutoResizeTextarea;
