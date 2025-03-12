import React, { useState, useRef, useCallback, DragEvent } from 'react';

// File types interface
export interface FileType {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  previewUrl?: string;
  progress?: number;
  status?: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface FileUploaderProps {
  /**
   * Function called when files are selected
   */
  onFilesSelected?: (files: FileType[]) => void;
  /**
   * Function called when a file is removed
   */
  onFileRemoved?: (fileId: string) => void;
  /**
   * Function to upload file, should return a promise
   */
  uploadFile?: (file: FileType) => Promise<void>;
  /**
   * Allowed file types
   */
  acceptedFileTypes?: string[];
  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
  /**
   * Whether to allow drag and drop
   */
  allowDragDrop?: boolean;
  /**
   * Whether to show file previews
   */
  showPreviews?: boolean;
  /**
   * Whether to allow multiple files
   */
  multiple?: boolean;
  /**
   * Label for the uploader
   */
  label?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Variant of the uploader
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  onFileRemoved,
  uploadFile,
  acceptedFileTypes,
  maxFiles = Infinity,
  maxFileSize = Infinity,
  allowDragDrop = true,
  showPreviews = true,
  multiple = true,
  label = 'Upload Files',
  description = 'Drag and drop files here or click to browse',
  variant = 'default',
  className = '',
  disabled = false,
  error,
}) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };

  // Create a file object with unique ID
  const createFileObject = (file: File): FileType => {
    const id = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    let previewUrl;

    // Create preview URL for images
    if (file.type.startsWith('image/') && showPreviews) {
      previewUrl = URL.createObjectURL(file);
    }

    return {
      id,
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      previewUrl,
      progress: 0,
      status: 'idle',
    };
  };

  // Handle file selection
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return;

    // Convert FileList to array
    const fileArray = Array.from(selectedFiles);
    
    // Filter files based on constraints
    const filteredFiles = fileArray.filter(file => {
      // Check file type
      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const fileType = file.type;
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        
        const isAccepted = acceptedFileTypes.some(type => {
          return type === fileType || type === fileExtension || type === '*';
        });

        if (!isAccepted) return false;
      }

      // Check file size
      if (file.size > maxFileSize) return false;

      return true;
    });

    // Limit number of files
    const totalFiles = files.length + filteredFiles.length;
    const filesToAdd = filteredFiles.slice(0, maxFiles - files.length);

    if (filesToAdd.length > 0) {
      const newFiles = filesToAdd.map(createFileObject);
      const updatedFiles = [...files, ...newFiles];
      
      // Update state
      setFiles(updatedFiles);
      
      // Call callback
      onFilesSelected?.(newFiles);
      
      // Auto upload if uploadFile is provided
      if (uploadFile) {
        newFiles.forEach(file => {
          handleUploadFile(file);
        });
      }
    }
  };

  // Handle file upload
  const handleUploadFile = async (file: FileType) => {
    if (!uploadFile || file.status === 'uploading') return;
    
    try {
      // Update file status
      updateFileStatus(file.id, {
        status: 'uploading',
        progress: 0,
      });
      
      // Upload file
      await uploadFile(file);
      
      // Update file status on success
      updateFileStatus(file.id, {
        status: 'success',
        progress: 100,
      });
    } catch (error) {
      // Update file status on error
      updateFileStatus(file.id, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  };

  // Update file status
  const updateFileStatus = (fileId: string, update: Partial<FileType>) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId ? { ...file, ...update } : file
      )
    );
  };

  // Remove file
  const handleRemoveFile = (fileId: string) => {
    // Find file to remove
    const fileToRemove = files.find(file => file.id === fileId);
    
    // Update state
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    
    // Clean up preview URL
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    
    // Call callback
    onFileRemoved?.(fileId);
  };

  // Handle drag events
  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && allowDragDrop) setIsDragging(true);
  }, [disabled, allowDragDrop]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && allowDragDrop) setIsDragging(true);
  }, [disabled, allowDragDrop]);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!disabled && allowDragDrop) {
      const { files: droppedFiles } = e.dataTransfer;
      handleFileSelection(droppedFiles);
    }
  }, [disabled, allowDragDrop, handleFileSelection]);

  // Handle click to select files
  const handleBrowseClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get status indicator
  const getStatusIndicator = (file: FileType) => {
    switch (file.status) {
      case 'uploading':
        return (
          <div className="h-4 w-full bg-gray-200">
            <div 
              className="h-full bg-black"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        );
      case 'success':
        return <span className="text-green-600">✓</span>;
      case 'error':
        return <span className="text-red-600">✗</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block font-mono font-bold mb-2">{label}</label>
      )}
      
      {/* Uploader area */}
      <div
        className={`
          ${getVariantStyles()}
          p-4 transition-all
          ${isDragging ? 'bg-gray-100' : 'bg-white'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${error ? 'border-red-600' : ''}
        `}
        onClick={handleBrowseClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={acceptedFileTypes?.join(',')}
          onChange={(e) => handleFileSelection(e.target.files)}
          disabled={disabled}
        />
        
        {/* Upload icon and description */}
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-2 text-sm font-mono">{description}</p>
          
          {acceptedFileTypes && acceptedFileTypes.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              Accepted file types: {acceptedFileTypes.join(', ')}
            </p>
          )}
          
          {maxFileSize < Infinity && (
            <p className="mt-1 text-xs text-gray-500">
              Maximum file size: {formatFileSize(maxFileSize)}
            </p>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
      
      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-mono font-bold mb-2">Selected Files</h4>
          <ul className="space-y-2">
            {files.map(file => (
              <li 
                key={file.id} 
                className="border-2 border-black p-2 flex items-center"
              >
                {/* Preview */}
                {file.previewUrl && (
                  <div className="mr-3 w-12 h-12 flex-shrink-0">
                    <img 
                      src={file.previewUrl} 
                      alt={file.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* File info */}
                <div className="flex-grow min-w-0">
                  <p className="font-mono truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  
                  {/* Status indicator */}
                  <div className="mt-1">
                    {getStatusIndicator(file)}
                  </div>
                  
                  {/* Error message */}
                  {file.status === 'error' && file.error && (
                    <p className="text-xs text-red-600">{file.error}</p>
                  )}
                </div>
                
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.id);
                  }}
                  className="ml-2 p-1"
                  disabled={disabled}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ImageUploader component
interface ImageUploaderProps extends Omit<FileUploaderProps, 'acceptedFileTypes' | 'showPreviews'> {
  /**
   * Crop aspect ratio
   */
  cropAspectRatio?: number;
  /**
   * Allow image editing
   */
  allowEditing?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  return (
    <FileUploader
      {...props}
      acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
      showPreviews={true}
      label={props.label || 'Upload Images'}
      description={props.description || 'Drag and drop images here or click to browse'}
    />
  );
};

// Example implementation
export const FileUploaderExamples: React.FC = () => {
  // Mock upload function
  const mockUploadFile = async (file: FileType): Promise<void> => {
    // Simulate upload delay and progress updates
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        
        // Update progress
        const fileElement = document.querySelector(`[data-file-id="${file.id}"]`);
        if (fileElement) {
          const progressBar = fileElement.querySelector('.progress-bar') as HTMLElement;
          if (progressBar) {
            progressBar.style.width = `${progress}%`;
          }
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">File Uploader</h2>
      <p className="mb-8 font-sans">
        File upload components with brutalist styling.
      </p>
      
      <div className="space-y-12">
        {/* Basic File Uploader */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic File Uploader</h3>
          <FileUploader
            variant="bordered"
            maxFileSize={5 * 1024 * 1024} // 5MB
            acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
          />
        </div>
        
        {/* Image Uploader */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Image Uploader</h3>
          <ImageUploader 
            variant="bordered"
            maxFileSize={2 * 1024 * 1024} // 2MB
            maxFiles={5}
          />
        </div>
        
        {/* Uploader Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Uploader Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <FileUploader
                variant="default"
                description="Default variant"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <FileUploader
                variant="bordered"
                description="Bordered variant"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <FileUploader
                variant="cutout"
                description="Cutout variant"
              />
            </div>
          </div>
        </div>
        
        {/* States */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-mono font-bold mb-2">Disabled</h4>
              <FileUploader
                variant="bordered"
                disabled
                description="This uploader is disabled"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">With Error</h4>
              <FileUploader
                variant="bordered"
                error="There was an error with the upload"
                description="This uploader has an error"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 