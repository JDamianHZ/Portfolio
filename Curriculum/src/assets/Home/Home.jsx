import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/panel");
    }, 2500); // Tiempo total de la animación (en milisegundos)

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white text-center">
      <motion.h1
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold"
      >
        WELCOME TO
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-5xl font-extrabold mt-4 text-indigo-400"
      >
        DAMIAN'S PORTFOLIO
      </motion.h1>
    </div>
  );
}

export default Home;
