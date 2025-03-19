import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseExcelFile, getExcelHeaders } from "~/utils/excelUtils";

interface FileUploadProps {
  onFileLoaded: (data: any[], fileName: string) => void;
  accept?: string;
  maxSize?: number;
}

export default function FileUpload({ 
  onFileLoaded, 
  accept = ".xlsx,.xls,.csv", 
  maxSize = 10485760 // 10MB
}: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0]; // Take only the first file
    setIsLoading(true);
    setError(null);

    try {
      const data = await parseExcelFile(file);
      
      if (data.length === 0) {
        setError("The file appears to be empty. Please check the content and try again.");
        return;
      }
      
      onFileLoaded(data, file.name);
    } catch (err) {
      console.error("Error parsing file:", err);
      setError("Failed to parse the file. Please make sure it's a valid Excel or CSV file.");
    } finally {
      setIsLoading(false);
    }
  }, [onFileLoaded]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxSize,
    multiple: false
  });

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed p-8 rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <div className="text-center py-4">
            <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-600">Processing file...</p>
          </div>
        ) : isDragActive ? (
          <div className="text-center py-4">
            <svg className="h-12 w-12 text-primary-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-gray-600">Drop the file here...</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-gray-600">Drag and drop an Excel file here, or click to select a file</p>
            <p className="text-xs text-gray-500 mt-1">Supported formats: .xlsx, .xls, .csv (max {Math.round(maxSize / 1048576)}MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}