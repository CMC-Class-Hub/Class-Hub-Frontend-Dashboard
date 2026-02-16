# UploadApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**generatePresignedUrl**](UploadApi.md#generatepresignedurl) | **POST** /api/upload/presigned-url | Presigned URL 생성 |



## generatePresignedUrl

> PresignedUrlResponse generatePresignedUrl(presignedUrlRequest)

Presigned URL 생성

S3 업로드를 위한 Presigned URL을 생성합니다

### Example

```ts
import {
  Configuration,
  UploadApi,
} from '';
import type { GeneratePresignedUrlRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UploadApi(config);

  const body = {
    // PresignedUrlRequest
    presignedUrlRequest: ...,
  } satisfies GeneratePresignedUrlRequest;

  try {
    const data = await api.generatePresignedUrl(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **presignedUrlRequest** | [PresignedUrlRequest](PresignedUrlRequest.md) |  | |

### Return type

[**PresignedUrlResponse**](PresignedUrlResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | URL 생성 성공 |  -  |
| **400** | 허용되지 않는 파일 타입 |  -  |
| **500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

