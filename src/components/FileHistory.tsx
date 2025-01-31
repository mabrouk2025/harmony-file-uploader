import React from 'react';
import { Calendar, Image } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryItem {
  id: number;
  date: Date;
  files: {
    name: string;
    thumbnail: string;
  }[];
}

const mockHistory: HistoryItem[] = [
  {
    id: 1,
    date: new Date(),
    files: [
      { name: 'image1.jpg', thumbnail: '/placeholder.svg' },
      { name: 'image2.jpg', thumbnail: '/placeholder.svg' },
    ],
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000),
    files: [
      { name: 'image3.jpg', thumbnail: '/placeholder.svg' },
    ],
  },
];

export const FileHistory = () => {
  return (
    <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
      <div className="space-y-6">
        {mockHistory.map((batch) => (
          <div key={batch.id} className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{batch.date.toLocaleDateString()}</span>
            </div>
            
            <div className="grid gap-2">
              {batch.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                    <Image className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium truncate">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};