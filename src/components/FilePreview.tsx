import React from 'react';
import { Info, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  file?: {
    name: string;
    thumbnail: string;
    extractedData?: {
      dimensions?: string;
      size?: string;
      format?: string;
      text?: string;
      metadata?: Record<string, any>;
    };
  };
  onClose: () => void;
}

export const FilePreview = ({ file, onClose }: FilePreviewProps) => {
  if (!file) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{file.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="bg-card aspect-square rounded-lg flex items-center justify-center">
        <img
          src={file.thumbnail}
          alt="Preview"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Image Information</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dimensions</span>
            <span>{file.extractedData?.dimensions || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Size</span>
            <span>{file.extractedData?.size || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format</span>
            <span>{file.extractedData?.format || 'N/A'}</span>
          </div>
          {file.extractedData?.text && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Extracted Text</h4>
              <p className="text-sm text-muted-foreground">{file.extractedData.text}</p>
            </div>
          )}
          {file.extractedData?.metadata && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Additional Metadata</h4>
              {Object.entries(file.extractedData.metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key}</span>
                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};