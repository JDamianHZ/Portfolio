import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../Routes/AuthContext"; // Ajusta ruta

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // <-- Accede a login()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`${API_URL}/login`, {
        email: email,
        password: password
      });

      console.log("Respuesta backend:", response.data);

      if (response.data.status === "Success") {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id_user;

        console.log("Usuario logueado correctamente", token, userId);

        login(token); // <-- Usa el contexto para guardar el token

        localStorage.setItem('userId', userId);

        navigate("/user");
        alert("Usuario logueado correctamente");

      } else {
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="mb-1 text-sm font-medium">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="rounded-md p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="usuario@ejemplo.com"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              className="rounded-md p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 font-semibold mt-2 transition-colors"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
