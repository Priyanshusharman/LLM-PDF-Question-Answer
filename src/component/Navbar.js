import React, { useState, useEffect, useRef } from "react";
import "../css/nav.css";

const Navbar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  let filename = null
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!selectedFile) {
      return; // Do nothing if no file is selected
    }

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
      setUploadMessage('Failed to upload file');
      console.error('Error uploading file:', error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger click event of file input
  };

  useEffect(() => {
    if (selectedFile) {
      handleSubmit(); // Trigger submit when file changes
    }
  }, [selectedFile]);

  return (
    <nav className="planat">
      <div className="icon-name-lcon">
        <div className="icon">
          <div className="circular-background">
            <div className="inner-white-circle">
              <div className="inner-green-circle">
                <span className="text">AI</span>
              </div>
            </div>
          </div>
        </div>
        <div className="icon-name">
          <div className="logo-container">
            <h1 className="logo">planet </h1>
            <p className="logo-subtext">
              formerly <span className="lightgreen">DPhi</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="uploadfolder">
        <div className="pdfname">
        <b> {fileName && <p><i class="fa-regular fa-file"></i> {fileName}</p>}</b>
      </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button className="uploadpdf" onClick={handleUploadClick}>
            <i className="fa-solid fa-circle-plus"></i> Upload PDF
          </button>
        </form>
      </div>
      {/* {uploadMessage && <p>{uploadMessage}</p>} */}
    </nav>
  );
};

export default Navbar;
