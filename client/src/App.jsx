import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3000/upload", formData)
      .then((res) => {
        const { id, url } = res.data;
        const encodedUrl = encodeURI(`http://localhost:3000${url}`);
        setUploadedUrl(encodedUrl);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-4">
            Upload a File
          </h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={upload}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          >
            Upload
          </button>
        </div>
        {uploadedUrl && (
          <div className="mt-6">
            <p className="text-green-600 text-center">
              File uploaded successfully! Here is the URL:
            </p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-500 underline hover:text-blue-600 mt-2"
            >
              Show your file
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
