import { UploadApi } from './generated';
import { apiConfig } from './config/generated-client';

export interface UploadResult {
    url: string;
    fileName: string;
}

export class UploadImageApi {
    private uploadApi: UploadApi;

    constructor() {
        this.uploadApi = new UploadApi(apiConfig);
    }

    /**
     * 단일 이미지를 S3에 업로드
     */
    async uploadImage(file: File): Promise<UploadResult> {
        try {
            // 1. 백엔드에서 Presigned URL 요청
            const response = await this.uploadApi.generatePresignedUrl({
                presignedUrlRequest: {
                    fileName: file.name,
                    fileType: file.type,
                }
            });

            const { uploadUrl, fileUrl, fileName } = response;

            if (!uploadUrl || !fileUrl || !fileName) {
                throw new Error('Presigned URL 생성 응답이 올바르지 않습니다.');
            }

            // 2. S3로 직접 업로드 (PUT)
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
    async uploadMultipleImages(files: File[]): Promise<UploadResult[]> {
        try {
            const uploadPromises = files.map((file) => {
                return this.uploadImage(file);
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
