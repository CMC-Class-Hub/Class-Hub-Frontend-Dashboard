/**
 * S3 이미지 업로드 유틸리티
 * Presigned URL을 사용하여 S3에 직접 업로드
 */

import { API_URL } from '../api-config';

export interface UploadResult {
    url: string;
    fileName: string;
}

/**
 * 단일 이미지를 S3에 업로드
 */
export async function uploadImageToS3(file: File): Promise<UploadResult> {
    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📤 S3 Upload Started');
        console.log('   File:', file.name);
        console.log('   Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('   Type:', file.type);

        // 1. 백엔드에서 Presigned URL 요청
        console.log('⏳ Step 1: Requesting presigned URL...');
        console.log('   Request Payload:',  { fileName: file.name, fileType: file.type });
        const presignedResponse = await fetch(`${API_URL}/api/upload/presigned-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
            }),
        });

        if (!presignedResponse.ok) {
            const errorText = await presignedResponse.text();
            console.error('❌ Presigned URL request failed:', errorText);
            throw new Error(`Presigned URL 생성 실패: ${presignedResponse.status}`);
        }

        const { uploadUrl, fileUrl, fileName } = await presignedResponse.json();
        console.log('✅ Step 1: Presigned URL received');
        console.log('   Upload URL:', uploadUrl.substring(0, 100) + '...');
        console.log('   File URL:', fileUrl);

        // 2. S3에 직접 업로드
        console.log('⏳ Step 2: Uploading to S3...');
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!uploadResponse.ok) {
            console.error('❌ S3 upload failed:', uploadResponse.status);
            throw new Error(`S3 업로드 실패: ${uploadResponse.status}`);
        }

        console.log('✅ Step 2: Upload to S3 successful');
        console.log('✅ Upload Complete!');
        console.log('   Final URL:', fileUrl);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        return {
            url: fileUrl,
            fileName: fileName,
        };

    } catch (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ Upload Failed');
        console.error('   Error:', error);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        throw error;
    }
}

/**
 * 여러 이미지를 동시에 S3에 업로드
 */
export async function uploadMultipleImages(files: File[]): Promise<UploadResult[]> {
    console.log(`📦 Starting batch upload: ${files.length} files`);
    
    try {
        const uploadPromises = files.map((file, index) => {
            console.log(`   [${index + 1}/${files.length}] Queued: ${file.name}`);
            return uploadImageToS3(file);
        });

        const results = await Promise.all(uploadPromises);
        
        console.log(`✅ Batch upload complete: ${results.length} files uploaded`);
        return results;

    } catch (error) {
        console.error('❌ Batch upload failed:', error);
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