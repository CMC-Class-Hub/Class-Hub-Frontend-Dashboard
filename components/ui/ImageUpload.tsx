"use client";

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    values?: string[];
    onChange: (values: string[]) => void;
    disabled?: boolean;
}

export function ImageUpload({ values = [], onChange, disabled }: ImageUploadProps) {
    const [previews, setPreviews] = useState<string[]>(values);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreviews(values);
    }, [values]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages: string[] = [];
            let processedCount = 0;

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    newImages.push(base64String);
                    processedCount++;

                    if (processedCount === files.length) {
                        const updatedImages = [...previews, ...newImages];
                        setPreviews(updatedImages);
                        onChange(updatedImages);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
        // 입력을 초기화하여 동일한 파일 다시 선택 가능하게 함
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemove = (index: number) => {
        const updatedImages = previews.filter((_, i) => i !== index);
        setPreviews(updatedImages);
        onChange(updatedImages);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                    <div key={index} className="relative h-40 rounded-lg overflow-hidden border border-gray-200 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                        {!disabled && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-6 w-6 rounded-full"
                                    onClick={() => handleRemove(index)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {!disabled && (
                    <div
                        className={cn(
                            "relative flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 cursor-pointer",
                            disabled && "opacity-50 cursor-not-allowed hover:bg-gray-50"
                        )}
                        onClick={handleUploadClick}
                    >
                        <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium">Click to upload</p>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled}
            />
        </div>
    );
}
