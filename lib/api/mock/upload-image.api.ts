import { delay } from './storage';
import { UploadResult } from '../UploadImageApi';

export class UploadImageApiMock {
    /**
     * 단일 이미지를 S3에 업로드 (Mock)
     */
    async uploadImage(file: File): Promise<UploadResult> {
        await delay(1000); // 1초 지연 시뮬레이션

        // 가짜 URL 생성 (실제 파일은 업로드되지 않음)
        // 브라우저에서 볼 수 있는 로컬 Object URL 생성하여 반환하면 더 현실적일 수 있음
        const objectUrl = URL.createObjectURL(file);

        console.log(`[Mock] Uploaded image: ${file.name} -> ${objectUrl}`);

        return {
            url: objectUrl,
            fileName: file.name,
        };
    }

    /**
     * 여러 이미지를 동시에 S3에 업로드 (Mock)
     */
    async uploadMultipleImages(files: File[]): Promise<UploadResult[]> {
        await delay(1500); // 1.5초 지연

        const results = files.map(file => {
            const objectUrl = URL.createObjectURL(file);
            console.log(`[Mock] Uploaded image: ${file.name} -> ${objectUrl}`);
            return {
                url: objectUrl,
                fileName: file.name,
            };
        });

        return results;
    }

    /**
     * 파일 크기 검증
     */
    validateFileSize(file: File, maxSizeMB: number = 5): boolean {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxSizeBytes;
    }

    /**
     * 파일 타입 검증
     */
    validateFileType(file: File): boolean {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        return allowedTypes.includes(file.type);
    }

    /**
     * 파일 검증 (크기 + 타입)
     */
    validateFile(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
        if (!this.validateFileType(file)) {
            return {
                valid: false,
                error: `${file.name}: 허용되지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP만 가능)`,
            };
        }

        if (!this.validateFileSize(file, maxSizeMB)) {
            const sizeMB = (file.size / 1024 / 1024).toFixed(2);
            return {
                valid: false,
                error: `${file.name}: 파일이 너무 큽니다. (${sizeMB}MB, 최대 ${maxSizeMB}MB)`,
            };
        }

        return { valid: true };
    }
}

export const uploadImageApiMock = new UploadImageApiMock();
