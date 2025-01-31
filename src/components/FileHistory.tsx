import React, { useState } from 'react';
import { Calendar, Image, Trash2, Eye, CheckSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

interface HistoryItem {
  id: number;
  date: Date;
  files: {
    name: string;
    thumbnail: string;
    selected?: boolean;
    extractedData?: {
      dimensions?: string;
      size?: string;
      format?: string;
    };
  }[];
}

interface FileHistoryProps {
  onPreview: (file: any) => void;
  onProcessSelected: (files: any[]) => void;
}

export const FileHistory = ({ onPreview, onProcessSelected }: FileHistoryProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 1,
      date: new Date(),
      files: [
        { 
          name: 'image1.jpg', 
          thumbnail: '/placeholder.svg',
          extractedData: {
            dimensions: '1920x1080',
            size: '2.5MB',
            format: 'JPEG'
          }
        },
        { 
          name: 'image2.jpg', 
          thumbnail: '/placeholder.svg',
          extractedData: {
            dimensions: '800x600',
            size: '1.2MB',
            format: 'JPEG'
          }
        },
      ],
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000),
      files: [
        { 
          name: 'image3.jpg', 
          thumbnail: '/placeholder.svg',
          extractedData: {
            dimensions: '1280x720',
            size: '1.8MB',
            format: 'PNG'
          }
        },
      ],
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setHistory(history.map(batch => ({
      ...batch,
      files: batch.files.map(file => ({ ...file, selected: !selectAll }))
    })));
  };

  const toggleFileSelect = (batchId: number, fileIndex: number) => {
    setHistory(history.map(batch => {
      if (batch.id === batchId) {
        const newFiles = [...batch.files];
        newFiles[fileIndex] = { ...newFiles[fileIndex], selected: !newFiles[fileIndex].selected };
        return { ...batch, files: newFiles };
      }
      return batch;
    }));
  };

  const handleDelete = (batchId: number, fileIndex: number) => {
    setHistory(history.map(batch => {
      if (batch.id === batchId) {
        const newFiles = batch.files.filter((_, index) => index !== fileIndex);
        return { ...batch, files: newFiles };
      }
      return batch;
    }));
  };

  const getSelectedFiles = () => {
    return history.flatMap(batch => 
      batch.files.filter(file => file.selected)
    );
  };

  React.useEffect(() => {
    const selectedFiles = getSelectedFiles();
    onProcessSelected(selectedFiles);
  }, [history]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox 
          checked={selectAll}
          onCheckedChange={toggleSelectAll}
          id="select-all"
        />
        <label htmlFor="select-all" className="text-sm">Select All</label>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
        <div className="space-y-6">
          {history.map((batch) => (
            <div key={batch.id} className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{batch.date.toLocaleDateString()}</span>
                <Checkbox />
              </div>
              
              <div className="grid gap-2">
                {batch.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent"
                  >
                    <Checkbox 
                      checked={file.selected}
                      onCheckedChange={() => toggleFileSelect(batch.id, index)}
                    />
                    <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                      <Image className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium truncate flex-1">
                      {file.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-accent rounded-full"
                        onClick={() => onPreview(file)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-accent rounded-full"
                        onClick={() => handleDelete(batch.id, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};