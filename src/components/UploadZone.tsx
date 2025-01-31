import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, Loader } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FileWithProgress extends File {
  progress?: number;
  parsingProgress?: number;
  status: 'uploading' | 'parsing' | 'complete' | 'error';
}

export const UploadZone = () => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      progress: 0,
      parsingProgress: 0,
      status: 'uploading' as const
    }));
    
    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      const uploadInterval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f === file) {
            const progress = (f.progress || 0) + 10;
            if (progress >= 100) {
              clearInterval(uploadInterval);
              // Start parsing after upload complete
              f.status = 'parsing';
              simulateParsing(file);
            }
            return { ...f, progress };
          }
          return f;
        }));
      }, 200);
    });
  }, []);

  const simulateParsing = (file: FileWithProgress) => {
    const parsingInterval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f === file) {
          const parsingProgress = (f.parsingProgress || 0) + 20;
          if (parsingProgress >= 100) {
            clearInterval(parsingInterval);
            return { ...f, parsingProgress, status: 'complete' as const };
          }
          return { ...f, parsingProgress };
        }
        return f;
      }));
    }, 300);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "dropzone",
          isDragActive && "dropzone-active"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-primary" />
          <div className="text-center">
            <p className="text-lg font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-muted-foreground">
              Support for image files
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="file-item bg-card p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {file.status === 'parsing' && (
                  <Loader className="w-4 h-4 animate-spin" />
                )}
              </div>
              {file.status === 'uploading' && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Uploading...</p>
                  <Progress value={file.progress} className="progress-animation" />
                </div>
              )}
              {file.status === 'parsing' && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Parsing...</p>
                  <Progress value={file.parsingProgress} className="progress-animation" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};