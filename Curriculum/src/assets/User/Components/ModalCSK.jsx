import React, { useEffect } from 'react';
import ImageUploader from "./ImageUploader";
import AutoResizeTextarea from './AutoResizeTextarea';
import Button from './ButtonNeon';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ModalCSK = ({ isOpen, onClose, children, uploadUrl, userId, onUploadSuccess }) => {
  const [name, setname] = React.useState("");
  const [preview, setPreview] = React.useState(null);  // <-- Estado para preview
  const [selectedFile, setSelectedFile] = React.useState(null); // <-- Para guardar el archivo

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setPreview(null);      // Limpiar preview al cerrar modal
      setSelectedFile(null); // Limpiar archivo seleccionado
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Cuando se selecciona archivo
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);  // Guardamos el archivo para subirlo luego
    }
  };

  // Subir imagen con botón Add
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo primero.");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('userId', userId);

    if (name && name.trim() !== '') {
      formData.append('name', name);
    }

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }

      console.log('Imagen subida:', response.data);
      alert('Imagen subida con éxito');
      // Limpiar después de subir
      setPreview(null);
      setSelectedFile(null);
      setname('');
      onClose();
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      alert('Error al subir la imagen');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
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
                  className="hidden" 
                  onChange={handleFileChange}  // <-- Aquí asignamos el onChange
                />
                <div className="text-sm">
                  <strong>Haz clic para subir una imagen</strong> o arrástrala aquí.
                </div>
              </label>
            </div>
            {/* Mostrar preview si existe */}
            {preview && (
              <img src={preview} alt="Preview" className="max-w-full max-h-48 mx-auto rounded" />
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-left">Name</h2>
        <AutoResizeTextarea placeholder="Add name here..." className="w-full mt-4" value={name} onChange={(e) => setname(e.target.value)} />
        <Button text="Add" onClick={handleUpload} />
      </div>
    </div>
  );
};

export default ModalCSK;
