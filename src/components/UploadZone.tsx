import { useCallback, useState, useRef } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onImageSelect: (file: File, preview: string) => void;
  imagePreview: string | null;
  onClear: () => void;
  isAnalyzing: boolean;
}

const UploadZone = ({ onImageSelect, imagePreview, onClear, isAnalyzing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onImageSelect(file, url);
    },
    [onImageSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!imagePreview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12 transition-all duration-200 md:p-16 ${
              isDragging
                ? "border-primary bg-accent scale-[0.99]"
                : "border-border bg-secondary/50 hover:border-primary/50 hover:bg-accent/50"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Upload className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-foreground">
                Drop your food image here
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse · JPG, PNG, WebP
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative overflow-hidden rounded-lg shadow-card"
          >
            <img
              src={imagePreview}
              alt="Food preview"
              className="w-full max-h-80 object-cover rounded-lg"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-foreground/5 rounded-lg">
                <div className="absolute left-0 right-0 h-0.5 bg-primary animate-scan-line" />
              </div>
            )}
            {!isAnalyzing && (
              <button
                onClick={onClear}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/60 text-background transition-colors hover:bg-foreground/80"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadZone;
