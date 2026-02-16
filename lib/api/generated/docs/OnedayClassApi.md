# OnedayClassApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createClass**](OnedayClassApi.md#createclass) | **POST** /api/classes | 클래스 생성 |
| [**deleteClass**](OnedayClassApi.md#deleteclass) | **DELETE** /api/classes/{classId} | 클래스 삭제 |
| [**getClass**](OnedayClassApi.md#getclass) | **GET** /api/classes/{classId} | 클래스 상세 조회 |
| [**getClassSessions1**](OnedayClassApi.md#getclasssessions1) | **GET** /api/classes/{classId}/sessions | 클래스의 세션 목록 조회 |
| [**getMyClasses**](OnedayClassApi.md#getmyclasses) | **GET** /api/classes | 내 클래스 목록 조회 |
| [**updateClass**](OnedayClassApi.md#updateclass) | **PUT** /api/classes/{classId} | 클래스 수정 |
| [**updateLinkShareStatus**](OnedayClassApi.md#updatelinksharestatus) | **PATCH** /api/classes/{classId}/link-share-status | 링크 공유 상태 변경 |



## createClass

> OnedayClassResponse createClass(onedayClassCreateRequest)

클래스 생성

새로운 원데이클래스를 생성합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { CreateClassRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  const body = {
    // OnedayClassCreateRequest
    onedayClassCreateRequest: ...,
  } satisfies CreateClassRequest;

  try {
    const data = await api.createClass(body);
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
| **onedayClassCreateRequest** | [OnedayClassCreateRequest](OnedayClassCreateRequest.md) |  | |

### Return type

[**OnedayClassResponse**](OnedayClassResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteClass

> deleteClass(classId)

클래스 삭제

클래스를 삭제합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { DeleteClassRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  const body = {
    // number | 클래스 ID
    classId: 789,
  } satisfies DeleteClassRequest;

  try {
    const data = await api.deleteClass(body);
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
| **classId** | `number` | 클래스 ID | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getClass

> OnedayClassResponse getClass(classId)

클래스 상세 조회

특정 클래스의 상세 정보를 조회합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { GetClassRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  const body = {
    // number | 클래스 ID
    classId: 789,
  } satisfies GetClassRequest;

  try {
    const data = await api.getClass(body);
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
| **classId** | `number` | 클래스 ID | [Defaults to `undefined`] |

### Return type

[**OnedayClassResponse**](OnedayClassResponse.md)

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


## getClassSessions1

> Array&lt;SessionResponse&gt; getClassSessions1(classId)

클래스의 세션 목록 조회

특정 클래스의 모든 세션을 조회합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { GetClassSessions1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  const body = {
    // number | 클래스 ID
    classId: 789,
  } satisfies GetClassSessions1Request;

  try {
    const data = await api.getClassSessions1(body);
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
| **classId** | `number` | 클래스 ID | [Defaults to `undefined`] |

### Return type

[**Array&lt;SessionResponse&gt;**](SessionResponse.md)

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


## getMyClasses

> Array&lt;OnedayClassResponse&gt; getMyClasses()

내 클래스 목록 조회

로그인한 강사의 모든 클래스를 조회합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { GetMyClassesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  try {
    const data = await api.getMyClasses();
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

[**Array&lt;OnedayClassResponse&gt;**](OnedayClassResponse.md)

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


## updateClass

> OnedayClassResponse updateClass(classId, onedayClassCreateRequest)

클래스 수정

클래스 정보를 수정합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { UpdateClassRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  const body = {
    // number | 클래스 ID
    classId: 789,
    // OnedayClassCreateRequest
    onedayClassCreateRequest: ...,
  } satisfies UpdateClassRequest;

  try {
    const data = await api.updateClass(body);
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
| **classId** | `number` | 클래스 ID | [Defaults to `undefined`] |
| **onedayClassCreateRequest** | [OnedayClassCreateRequest](OnedayClassCreateRequest.md) |  | |

### Return type

[**OnedayClassResponse**](OnedayClassResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateLinkShareStatus

> OnedayClassResponse updateLinkShareStatus(classId, linkShareStatusUpdateRequest)

링크 공유 상태 변경

클래스의 링크 공유 활성화/비활성화 상태를 변경합니다

### Example

```ts
import {
  Configuration,
  OnedayClassApi,
} from '';
import type { UpdateLinkShareStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnedayClassApi(config);

  const body = {
    // number | 클래스 ID
    classId: 789,
    // LinkShareStatusUpdateRequest
    linkShareStatusUpdateRequest: ...,
  } satisfies UpdateLinkShareStatusRequest;

  try {
    const data = await api.updateLinkShareStatus(body);
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
| **classId** | `number` | 클래스 ID | [Defaults to `undefined`] |
| **linkShareStatusUpdateRequest** | [LinkShareStatusUpdateRequest](LinkShareStatusUpdateRequest.md) |  | |

### Return type

[**OnedayClassResponse**](OnedayClassResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

