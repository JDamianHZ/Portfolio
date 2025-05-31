import React from 'react';
import TextButton from "../User/Components/TextButton";
import { useNavigate } from "react-router-dom";


function Header() {

  const navigate = useNavigate();

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== "/panel") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between justify-center px-6 py-4 bg-gray-900 text-white ">
      
      
      <h1 className="text-lg font-bold text-indigo-400">Damian's Portfolio</h1>

      
      <div className="flex gap-x-6">
        <TextButton text="Home" onClick={() => navigate("/")} />
        <TextButton text="About" onClick={(e) => handleScrollTo(e, "about-section")} />
        <TextButton text="Portfolio"onClick={(e) => handleScrollTo(e, "portfolio-section")} />
        <TextButton text="Contact" onClick={(e) => handleScrollTo(e, "contact-section")} />
      </div>

    </div>
  );
}

export default Header;
