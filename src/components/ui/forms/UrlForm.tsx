import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface URLDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

export function UrlForm({ isOpen, onClose, onSave }: URLDialogProps) {
  const [url, setUrl] = useState('');

  const handleSave = () => {
    if (url.trim()) {
      onSave(url); 
    }
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">URL</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="url"
            placeholder="Enter Link Here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="col-span-3 border-gray-300"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
