import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PDFViewer } from './components/PDFViewer';
import { ChatInterface } from './components/ChatInterface';

interface DocumentInfo {
  documentId: string;
  filename: string;
  numPages: number;
  fileUrl: string;
}

function App() {
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (documentInfo: DocumentInfo) => {
    setDocumentInfo(documentInfo);
    setCurrentPage(1);
  };

  const handleCitationClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!documentInfo) {
    return (
      <div>
        <FileUpload 
          onFileUpload={handleFileUpload} 
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setError={setError}
        />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">NotebookLM Clone</h1>
            <p className="text-sm text-gray-600">{documentInfo.filename}</p>
          </div>
          <button
            onClick={() => {
              setDocumentInfo(null);
              setCurrentPage(1);
              setError(null);
            }}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Upload New Document
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* PDF Viewer */}
        <div className="w-1/2 border-r border-gray-200">
          <PDFViewer
            fileUrl={documentInfo.fileUrl}
            currentPage={currentPage}
            totalPages={documentInfo.numPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Chat Interface */}
        <div className="w-1/2">
          <ChatInterface
            documentId={documentInfo.documentId}
            onCitationClick={handleCitationClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;