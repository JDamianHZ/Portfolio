import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ uploadUrl, userId, onUploadSuccess }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', userId);

      try {
        const response = await axios.post(uploadUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (onUploadSuccess) {
          onUploadSuccess(response.data);
        }

        console.log('Imagen subida:', response.data);
      } catch (err) {
        console.error('Error al subir la imagen:', err);
      }
    }
  };

  return (
    <div className="w-[50%] border-2 border-dashed border-gray-500 rounded-xl p-6 text-center text-gray-300">
      <label className="cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <div className="text-sm">
          <strong>Haz clic para subir una imagen</strong> o arrástrala aquí.
        </div>
      </label>
      {preview && (
        <img src={preview} alt="Preview" className="mt-4 mx-auto max-h-60 rounded-lg shadow-lg" />
      )}
    </div>
  );
};

export default ImageUploader;
