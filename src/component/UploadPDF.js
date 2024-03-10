import React, { useState } from 'react';
import axios from 'axios';

const UploadPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
          method: 'POST',
          body: formData
      });
  
      if (!response.ok) {
          throw new Error('Failed to upload file');
      }
  
      const data = await response.json();
      setUploadMessage(data.message);
  } catch (error) {
      setUploadMessage('Failed to upload file 1234567890');
      console.error('Error uploading file:', error);
  }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default UploadPDF;
