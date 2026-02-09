"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { uploadMultipleImages, validateFile } from '@/lib/api/real/s3-upload';

interface ImageUploadProps {
    values?: string[];      // S3 URL 배열
    onChange: (urls: string[]) => void;
    disabled?: boolean;
    maxImages?: number;
    maxSizeMB?: number;
}

export function ImageUpload({ 
    values = [], 
    onChange, 
    disabled,
    maxImages = 5,
    maxSizeMB = 5
}: ImageUploadProps) {
    const [imageUrls, setImageUrls] = useState<string[]>(values);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // values prop이 변경될 때 state 업데이트
    useEffect(() => {
        setImageUrls(values);
    }, [values]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        
        
        if (!files || files.length === 0) {
            return;
        }

        // 최대 이미지 개수 체크
        if (imageUrls.length + files.length > maxImages) {
            const remaining = maxImages - imageUrls.length;
            toast.error(`최대 ${maxImages}개까지 업로드 가능합니다.`, {
                description: `현재 ${imageUrls.length}개, ${remaining}개 더 추가 가능`
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        setUploading(true);
        setUploadProgress('파일 검증 중...');

        try {
            const fileArray = Array.from(files);

            // 파일 검증
            const validationResults = fileArray.map(file => validateFile(file, maxSizeMB));
            const invalidFiles = validationResults.filter(r => !r.valid);

            if (invalidFiles.length > 0) {
                invalidFiles.forEach(result => {
                    toast.error(result.error);
                });
                
                // 유효한 파일만 필터링
                const validFiles = fileArray.filter((_, index) => validationResults[index].valid);
                
                if (validFiles.length === 0) {
                    return;
                }
                
            }

            const validFiles = fileArray.filter((_, index) => validationResults[index].valid);
            
            // S3에 업로드
            setUploadProgress(`S3에 업로드 중... (0/${validFiles.length})`);
            const results = await uploadMultipleImages(validFiles);
            
            // URL만 추출
            const newUrls = results.map(r => r.url);
            const updatedUrls = [...imageUrls, ...newUrls];
            
            setImageUrls(updatedUrls);
            onChange(updatedUrls);

            toast.success(`${newUrls.length}개 이미지가 업로드되었습니다.`);
        } catch (error) {
            toast.error('이미지 업로드에 실패했습니다.', {
                description: error instanceof Error ? error.message : '알 수 없는 오류'
            });
        } finally {
            setUploading(false);
            setUploadProgress('');
            
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = (index: number, url: string) => {
        
        const updatedUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedUrls);
        onChange(updatedUrls);
        
        toast.success('이미지가 제거되었습니다.');
    };

    const handleUploadClick = () => {
        if (disabled || uploading) {
            return;
        }
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 업로드 진행 상태 */}
            {uploading && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-blue-700">{uploadProgress}</span>
                </div>
            )}

            {/* 이미지 개수 표시 */}
            {imageUrls.length > 0 && (
                <div className="text-sm text-gray-600">
                    {imageUrls.length} / {maxImages}개 이미지
                </div>
            )}

            {/* 이미지 그리드 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageUrls.map((url, index) => (
                    <div 
                        key={index} 
                        className="relative h-40 rounded-lg overflow-hidden border border-gray-200 group"
                    >
                        <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                            }}
                        />
                        
                        {!disabled && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-6 w-6 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(index, url);
                                    }}
                                    disabled={uploading}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        
                        {/* 이미지 번호 */}
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                        </div>
                    </div>
                ))}

                {/* 업로드 버튼 */}
                {!disabled && imageUrls.length < maxImages && (
                    <div
                        className={cn(
                            "relative flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors cursor-pointer",
                            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                        )}
                        onClick={handleUploadClick}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
                                <p className="text-xs text-gray-500 font-medium">업로드 중...</p>
                            </>
                        ) : (
                            <>
                                <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                                <p className="text-xs text-gray-500 font-medium">이미지 추가</p>
                                <p className="text-xs text-gray-400 mt-1">최대 {maxSizeMB}MB</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* 파일 입력 */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={disabled || uploading}
            />

            {/* 안내 메시지 */}
            {imageUrls.length === 0 && !uploading && (
                <p className="text-xs text-gray-500 text-center">
                    JPG, PNG, GIF, WebP 파일을 업로드할 수 있습니다
                </p>
            )}
        </div>
    );
}