import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadZone } from '@/components/UploadZone';
import { FileHistory } from '@/components/FileHistory';
import { FilePreview } from '@/components/FilePreview';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const navigate = useNavigate();

  const handlePreview = (file: any) => {
    setSelectedFile(file);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  const handleProcessSelected = (selectedFiles: any[]) => {
    navigate('/process', { state: { selectedFiles } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">File Upload & Processing</h1>
          <Button variant="default" onClick={() => handleProcessSelected([])}>
            Process Selected Files
          </Button>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-8">
            <h2 className="text-lg font-semibold mb-4">History</h2>
            <FileHistory onPreview={handlePreview} onProcessSelected={handleProcessSelected} />
          </div>

          {/* Main Content */}
          <div className="col-span-4">
            <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
            <UploadZone />
          </div>

          {/* Preview Overlay */}
          {selectedFile && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
              <div className="container mx-auto py-8">
                <div className="bg-card rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Preview</h2>
                  <FilePreview file={selectedFile} onClose={handleClosePreview} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;