import { useState } from 'react';
import { UploadZone } from '@/components/UploadZone';
import { FileHistory } from '@/components/FileHistory';
import { FilePreview } from '@/components/FilePreview';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handlePreview = (file: any) => {
    setSelectedFile(file);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">File Upload & Processing</h1>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - History (2/3) */}
          <div className="col-span-8">
            <h2 className="text-lg font-semibold mb-4">History</h2>
            <FileHistory onPreview={handlePreview} />
          </div>

          {/* Right Side - Upload (1/3) */}
          <div className="col-span-4">
            <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
            <UploadZone />
          </div>
        </div>

        {/* Preview Overlay */}
        {selectedFile && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
            <div className="w-[800px] bg-card p-6 rounded-lg shadow-lg">
              <FilePreview file={selectedFile} onClose={handleClosePreview} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;