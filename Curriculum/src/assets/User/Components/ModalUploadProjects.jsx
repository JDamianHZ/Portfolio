import ImageUploader from "./ImageUploader";
import AutoResizeTextarea from './AutoResizeTextarea';
import Button from './ButtonNeon';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';


const API_URL = import.meta.env.VITE_API_URL;


const ModalUploadProjects = ({ isOpen, onClose, children, onUploadSuccess }) => {

    const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario del localStorage


  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [previews, setPreviews] = React.useState([]);         // Previews de imágenes
  const [selectedFiles, setSelectedFiles] = React.useState([]); // Archivos seleccionados

    const [Technology, setTechnology] = useState([]);
    const [SelectTech, setSelectTech] = useState([]); // Estado para almacenar el modelo seleccionado

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setPreviews([]);
      setSelectedFiles([]);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previewsArray = files.map(file => URL.createObjectURL(file));
      setPreviews(previewsArray);
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Por favor selecciona al menos un archivo.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file); // Nombre del campo que espera tu backend
    });
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);

      // Agregar cada tecnología seleccionada
  SelectTech.forEach(id => {
        formData.append('selectedTechnologies[]', id);
    });

    try {
      const response = await Axios.post(`${API_URL}/uploadProject`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }

      alert('Imágenes subidas con éxito');
      setPreviews([]);
      setSelectedFiles([]);
      setTitle('');
      setDescription('');
      onClose();
    } catch (err) {
      console.error('Error al subir las imágenes:', err);
      alert('Error al subir las imágenes');
    }
  };




    useEffect(() => {
        getTechnology();
    }, []); 


        const getTechnology = () => {
            Axios.get(`${API_URL}/technologies`).then((response)=>{
                setTechnology(response.data);
            });
        }


        const handleTech = (event) => {
              // Obtener todas las opciones seleccionadas
            const selectedOptions = Array.from(event.target.selectedOptions).map(
                (option) => option.value
            );
            setSelectTech(selectedOptions);
        };

    if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 ">
      <div className="relative z-50 pointer-events-auto bg-gray-800 text-white rounded-xl p-6 w-[65%] h-[80%] overflow-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        {children}

        <div className="flex flex-col items-center justify-center">
          <div className="w-[50%] border-2 border-dashed border-gray-500 rounded-xl p-6 text-center text-gray-300">
            <div className='flex items-center justify-center mt-4 mb-4 w-auto h-[50%]'>
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  name="images"
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <div className="text-sm">
                  <strong>Haz clic para subir imágenes</strong> o arrástralas aquí.
                </div>
              </label>
            </div>
          </div>

          <div className='mt-5 bg-gray-700 rounded-2xl shadow-lg w-full p-4 text-center'>
            <div className="text-white font-semibold mb-2">Preview</div>
            {previews.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {previews.map((src, index) => (
                  <img key={index} src={src} alt={`Preview ${index}`} className="max-w-[150px] max-h-[150px] rounded" />
                ))}
              </div>
            ) : (
              <div className="text-gray-400 italic">No hay imágenes seleccionadas</div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-left mt-6">TITLE</h2>
        <AutoResizeTextarea placeholder="Add name here..." className="w-full mt-4" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <h2 className="text-xl font-bold mb-4 text-left">Description</h2>
        <AutoResizeTextarea placeholder="Add description here..." className="w-full mt-4" value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <h2 className="text-xl font-bold mb-4 text-left">Description</h2>
        <div className='mt-5 mb-8 bg-gray-700 rounded-2xl shadow-lg w-full p-4 text-center'>
                {Technology.map((tech) => {
                    const idStr = tech.id_technologies.toString();
                    return (
                    <label key={idStr} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border-2 border-gray-400 group-hover:border-blue-500 flex items-center justify-center transition-all duration-200">
                        <input
                            type="checkbox"
                            value={idStr}
                            checked={SelectTech.includes(idStr)}
                            onChange={(e) => {
                            const id = e.target.value;
                            setSelectTech((prev) =>
                                e.target.checked
                                ? [...prev, id]
                                : prev.filter((item) => item !== id)
                            );
                            }}
                            className="hidden peer"
                        />
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded opacity-0 peer-checked:opacity-100 transition-opacity duration-150"></div>
                        </div>
                        <span className="text-white group-hover:text-blue-300 transition-colors">{tech.name}</span>
                    </label>
                    );
                })}
        </div>

        <Button text="Add" onClick={handleUpload} />
      </div>
    </div>
  );
};

export default ModalUploadProjects;
