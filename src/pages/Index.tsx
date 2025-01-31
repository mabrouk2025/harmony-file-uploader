import { UploadZone } from '@/components/UploadZone';
import { FileHistory } from '@/components/FileHistory';
import { FilePreview } from '@/components/FilePreview';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">File Upload & Processing</h1>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <h2 className="text-lg font-semibold mb-4">History</h2>
            <FileHistory />
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
            <UploadZone />
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <FilePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;