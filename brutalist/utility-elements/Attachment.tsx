import React from 'react';

interface AttachmentProps {
  fileName: string;
  fileSize?: string;
  fileType?: string;
  downloadUrl?: string;
  previewUrl?: string;
  isImage?: boolean;
  thumbnailUrl?: string;
  onRemove?: () => void;
  className?: string;
}

export const Attachment: React.FC<AttachmentProps> = ({
  fileName,
  fileSize,
  fileType,
  downloadUrl = '#',
  previewUrl,
  isImage = false,
  thumbnailUrl,
  onRemove,
  className = '',
}) => {
  // Extract file extension for icon display
  const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
  
  return (
    <div className={`border-2 border-black bg-white ${className}`}>
      <div className="flex items-start p-3">
        {/* File thumbnail or icon */}
        <div className="mr-3 flex-shrink-0">
          {isImage && thumbnailUrl ? (
            <div className="w-12 h-12 border border-black overflow-hidden">
              <img 
                src={thumbnailUrl} 
                alt={fileName} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 border-2 border-black bg-gray-100 flex items-center justify-center font-mono text-xs">
              {fileExtension}
            </div>
          )}
        </div>
        
        {/* File info */}
        <div className="flex-grow">
          <p className="font-mono font-bold truncate">{fileName}</p>
          {(fileSize || fileType) && (
            <p className="text-sm text-gray-600 font-sans">
              {fileType && <span>{fileType}</span>}
              {fileType && fileSize && <span> · </span>}
              {fileSize && <span>{fileSize}</span>}
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex ml-4 space-x-2">
          {previewUrl && (
            <a 
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-block px-2 py-1 border border-black font-mono text-xs hover:bg-gray-100"
            >
              VIEW
            </a>
          )}
          
          <a 
            href={downloadUrl}
            download
            className="inline-block px-2 py-1 border border-black font-mono text-xs hover:bg-gray-100"
          >
            SAVE
          </a>
          
          {onRemove && (
            <button 
              onClick={onRemove}
              className="inline-block px-2 py-1 border border-black font-mono text-xs hover:bg-gray-100"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const AttachmentList: React.FC<{
  attachments: Array<AttachmentProps>;
  className?: string;
}> = ({ attachments, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {attachments.map((attachment, index) => (
        <Attachment key={index} {...attachment} />
      ))}
    </div>
  );
};

export const Attachments: React.FC = () => {
  const sampleAttachments = [
    {
      fileName: "project_brief.pdf",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadUrl: "#",
      previewUrl: "#"
    },
    {
      fileName: "design_mockup.jpg",
      fileSize: "1.8 MB",
      fileType: "Image",
      downloadUrl: "#",
      previewUrl: "#",
      isImage: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      fileName: "budget_2023.xlsx",
      fileSize: "845 KB",
      fileType: "Spreadsheet",
      downloadUrl: "#"
    },
    {
      fileName: "presentation.pptx",
      fileSize: "4.2 MB",
      fileType: "Presentation",
      downloadUrl: "#",
      previewUrl: "#"
    }
  ];
  
  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Attachments</h2>
      <p className="mb-6 font-sans">
        File attachments with brutalist styling, emphasizing functionality and clear structure.
      </p>
      
      <div className="mb-8">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Standard Attachment List</h3>
        <AttachmentList attachments={sampleAttachments} />
      </div>
      
      <div>
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Single Attachment</h3>
        <Attachment 
          fileName="important_document.zip"
          fileSize="12.8 MB"
          fileType="Archive"
          downloadUrl="#"
          onRemove={() => alert('Remove clicked')}
        />
      </div>
    </div>
  );
}; 