# MessageTemplateApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getTemplate**](MessageTemplateApi.md#gettemplate) | **GET** /api/messages/templates/{title} | 템플릿 상세 조회 |
| [**getTemplates**](MessageTemplateApi.md#gettemplates) | **GET** /api/messages/templates | 템플릿 목록 조회 |



## getTemplate

> MessageTemplateResponse getTemplate(title)

템플릿 상세 조회

특정 템플릿의 상세 정보를 조회합니다

### Example

```ts
import {
  Configuration,
  MessageTemplateApi,
} from '';
import type { GetTemplateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MessageTemplateApi(config);

  const body = {
    // string | 템플릿 타이틀
    title: title_example,
  } satisfies GetTemplateRequest;

  try {
    const data = await api.getTemplate(body);
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
| **title** | `string` | 템플릿 타이틀 | [Defaults to `undefined`] |

### Return type

[**MessageTemplateResponse**](MessageTemplateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTemplates

> Array&lt;MessageTemplateMetadata&gt; getTemplates()

템플릿 목록 조회

전체 메시지 템플릿 목록을 조회합니다

### Example

```ts
import {
  Configuration,
  MessageTemplateApi,
} from '';
import type { GetTemplatesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MessageTemplateApi(config);

  try {
    const data = await api.getTemplates();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;MessageTemplateMetadata&gt;**](MessageTemplateMetadata.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

