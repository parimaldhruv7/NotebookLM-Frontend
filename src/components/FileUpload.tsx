import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { uploadPDF } from '../config/api';

interface FileUploadProps {
  onFileUpload: (documentInfo: any) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
  setError: (error: string | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  isUploading, 
  setIsUploading, 
  setError 
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setIsUploading(true);
      setError(null);

      try {
        const documentInfo = await uploadPDF(file);
        onFileUpload(documentInfo);
      } catch (error) {
        console.error('Upload failed:', error);
        setError(error instanceof Error ? error.message : 'Failed to upload PDF');
      } finally {
        setIsUploading(false);
      }
    }
  }, [onFileUpload, setIsUploading, setError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isUploading
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NotebookLM Clone</h1>
          <p className="text-lg text-gray-600">
            Upload a PDF document and start asking questions about its content
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            {isUploading ? (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-lg font-medium text-gray-700">Processing your PDF...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {isDragActive ? (
                    <FileText className="w-8 h-8 text-blue-600" />
                  ) : (
                    <Upload className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {isDragActive ? 'Drop your PDF here' : 'Upload your PDF document'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Drag and drop or click to select a PDF file (max 50MB)
                  </p>
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Choose File
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Supported format: PDF • Maximum size: 50MB</p>
        </div>
      </div>
    </div>
  );
};