/**
 * S3 이미지 업로드 유틸리티
 * Presigned URL을 사용하여 S3에 직접 업로드
 */

import { fetchClient } from '../fetch-client';

export interface UploadResult {
    url: string;
    fileName: string;
}

/**
 * 단일 이미지를 S3에 업로드
 */
export async function uploadImageToS3(file: File): Promise<UploadResult> {
    try {
       
        // 1. 백엔드에서 Presigned URL 요청
        const presignedResponse = await fetchClient('/api/upload/presigned-url', {
            method: 'POST',
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
            }),
        });

        if (!presignedResponse.ok) {
            const errorText = await presignedResponse.text();
            throw new Error(`Presigned URL 생성 실패: ${presignedResponse.status}`);
        }

        const { uploadUrl, fileUrl, fileName } = await presignedResponse.json();
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!uploadResponse.ok) {
            throw new Error(`S3 업로드 실패: ${uploadResponse.status}`);
        }
       
        return {
            url: fileUrl,
            fileName: fileName,
        };

    } catch (error) {
        throw error;
    }
}

/**
 * 여러 이미지를 동시에 S3에 업로드
 */
export async function uploadMultipleImages(files: File[]): Promise<UploadResult[]> {

    try {
        const uploadPromises = files.map((file, index) => {
            return uploadImageToS3(file);
        });

        const results = await Promise.all(uploadPromises);

        return results;

    } catch (error) {
        throw error;
    }
}

/**
 * 파일 크기 검증
 */
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
}

/**
 * 파일 타입 검증
 */
export function validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
}

/**
 * 파일 검증 (크기 + 타입)
 */
export function validateFile(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
    if (!validateFileType(file)) {
        return {
            valid: false,
            error: `${file.name}: 허용되지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP만 가능)`,
        };
    }

    if (!validateFileSize(file, maxSizeMB)) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        return {
            valid: false,
            error: `${file.name}: 파일이 너무 큽니다. (${sizeMB}MB, 최대 ${maxSizeMB}MB)`,
        };
    }

    return { valid: true };
}