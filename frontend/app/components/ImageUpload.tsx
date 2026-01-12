import React, { useState, useCallback } from "react";
import { Upload, Camera, X, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface ImageUploadProps {
  onImageUpload: (file: File, preview: string) => void;
  uploadedImage: string | null;
  onClear: () => void;
}

export default function ImageUpload({
    onImageUpload,
    uploadedImage,
    onClear,
} : ImageUploadProps) {
    
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    onImageUpload(file, e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        }},
        [onImageUpload]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
            onImageUpload(file, e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }},
        [onImageUpload]
    );

    if (uploadedImage) {
        return (
            <div className="relative w-full max-w-md mx-auto animate-scale-in">
                <div className="relative rounded-2xl overflow-hidden shadow-medium">
                <img
                    src={uploadedImage}
                    alt="Uploaded ingredients"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/50 to-transparent" />
                <button
                    onClick={onClear}
                    className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-primary-foreground">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Image ready for analysis</span>
                </div>
                </div>
            </div>
        );
    }

    return (
        <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
                "relative w-full max-w-md mx-auto p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer",
                isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-secondary/50"
            )}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-4 text-center">
                <div
                    className={cn(
                        "p-4 rounded-full transition-all duration-300",
                        isDragging ? "bg-primary/20 scale-110" : "bg-secondary"
                    )}
                    >
                    {isDragging ? (
                        <Upload className="w-8 h-8 text-primary" />
                    ) : (
                        <Camera className="w-8 h-8 text-primary" />
                    )}
                </div>
                <div>
                    <p className="text-lg font-semibold text-foreground">
                        {isDragging ? "Drop your image here" : "Upload food photo"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Drag & drop or click to browse
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded-full bg-secondary">JPG</span>
                    <span className="px-2 py-1 rounded-full bg-secondary">PNG</span>
                    <span className="px-2 py-1 rounded-full bg-secondary">WEBP</span>
                </div>
            </div>
        </div>
    );
}

