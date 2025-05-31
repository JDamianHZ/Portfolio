const TextButton = ({ text, onClick, color = 'text-withe', hoverColor = 'hover:text-blue-800  font-bold ' }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} ${hoverColor}  transition duration-200 border-b-2 pb-1 `}
    >
      {text}
    </button>
  );
};

export default TextButton;
