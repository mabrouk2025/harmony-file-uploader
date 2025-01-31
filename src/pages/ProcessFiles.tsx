import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FileData {
  name: string;
  thumbnail: string;
  selected?: boolean;
  extractedData?: {
    dimensions?: string;
    size?: string;
    format?: string;
  };
}

const ProcessFiles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedFiles = location.state?.selectedFiles || [];

  const handleDownloadCSV = () => {
    const headers = ['File Name', 'Dimensions', 'Size', 'Format'];
    const csvData = selectedFiles.map((file: FileData) => [
      file.name,
      file.extractedData?.dimensions || 'N/A',
      file.extractedData?.size || 'N/A',
      file.extractedData?.format || 'N/A',
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row: string[]) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'processed_files.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Process Files</h1>
        </div>
        <Button onClick={handleDownloadCSV}>
          <Download className="mr-2" />
          Download CSV
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Format</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedFiles.map((file: FileData, index: number) => (
              <TableRow key={index}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.extractedData?.dimensions || 'N/A'}</TableCell>
                <TableCell>{file.extractedData?.size || 'N/A'}</TableCell>
                <TableCell>{file.extractedData?.format || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProcessFiles;