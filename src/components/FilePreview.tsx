import React from 'react';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const FilePreview = () => {
  return (
    <div className="space-y-4">
      <div className="bg-card aspect-square rounded-lg flex items-center justify-center">
        <img
          src="/placeholder.svg"
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
            <span>1920 x 1080</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Size</span>
            <span>2.4 MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format</span>
            <span>PNG</span>
          </div>
        </div>
      </Card>
    </div>
  );
};