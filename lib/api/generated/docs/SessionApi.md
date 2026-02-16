# SessionApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSession**](SessionApi.md#createsession) | **POST** /api/sessions | 세션 생성 |
| [**deleteSession**](SessionApi.md#deletesession) | **DELETE** /api/sessions/{sessionId} | 세션 삭제 |
| [**getSession**](SessionApi.md#getsession) | **GET** /api/sessions/{sessionId} | 세션 조회 |
| [**getSessionApplications**](SessionApi.md#getsessionapplications) | **GET** /api/sessions/{sessionId}/applications | 세션 신청 목록 조회 |
| [**updateSession**](SessionApi.md#updatesession) | **PUT** /api/sessions/{sessionId} | 세션 수정 |
| [**updateSessionStatus**](SessionApi.md#updatesessionstatus) | **PATCH** /api/sessions/{sessionId}/status | 세션 상태 변경 |



## createSession

> SessionResponse createSession(sessionCreateRequest)

세션 생성

새로운 세션을 생성합니다

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { CreateSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionApi(config);

  const body = {
    // SessionCreateRequest
    sessionCreateRequest: ...,
  } satisfies CreateSessionRequest;

  try {
    const data = await api.createSession(body);
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
| **sessionCreateRequest** | [SessionCreateRequest](SessionCreateRequest.md) |  | |

### Return type

[**SessionResponse**](SessionResponse.md)

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


## deleteSession

> deleteSession(sessionId)

세션 삭제

세션을 삭제합니다

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { DeleteSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionApi(config);

  const body = {
    // number | 세션 ID
    sessionId: 789,
  } satisfies DeleteSessionRequest;

  try {
    const data = await api.deleteSession(body);
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
| **sessionId** | `number` | 세션 ID | [Defaults to `undefined`] |

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


## getSession

> SessionResponse getSession(sessionId)

세션 조회

특정 세션의 상세 정보를 조회합니다

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { GetSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionApi(config);

  const body = {
    // number | 세션 ID
    sessionId: 789,
  } satisfies GetSessionRequest;

  try {
    const data = await api.getSession(body);
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
| **sessionId** | `number` | 세션 ID | [Defaults to `undefined`] |

### Return type

[**SessionResponse**](SessionResponse.md)

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


## getSessionApplications

> Array&lt;ReservationResponse&gt; getSessionApplications(sessionId)

세션 신청 목록 조회

특정 세션의 예약 신청 목록을 조회합니다

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { GetSessionApplicationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionApi(config);

  const body = {
    // number | 세션 ID
    sessionId: 789,
  } satisfies GetSessionApplicationsRequest;

  try {
    const data = await api.getSessionApplications(body);
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
| **sessionId** | `number` | 세션 ID | [Defaults to `undefined`] |

### Return type

[**Array&lt;ReservationResponse&gt;**](ReservationResponse.md)

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


## updateSession

> SessionResponse updateSession(sessionId, sessionUpdateRequest)

세션 수정

세션 정보를 수정합니다

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { UpdateSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionApi(config);

  const body = {
    // number | 세션 ID
    sessionId: 789,
    // SessionUpdateRequest
    sessionUpdateRequest: ...,
  } satisfies UpdateSessionRequest;

  try {
    const data = await api.updateSession(body);
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
| **sessionId** | `number` | 세션 ID | [Defaults to `undefined`] |
| **sessionUpdateRequest** | [SessionUpdateRequest](SessionUpdateRequest.md) |  | |

### Return type

[**SessionResponse**](SessionResponse.md)

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


## updateSessionStatus

> SessionResponse updateSessionStatus(sessionId, status)

세션 상태 변경

세션의 상태를 변경합니다

### Example

```ts
import {
  Configuration,
  SessionApi,
} from '';
import type { UpdateSessionStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionApi(config);

  const body = {
    // number | 세션 ID
    sessionId: 789,
    // string | 변경할 상태
    status: status_example,
  } satisfies UpdateSessionStatusRequest;

  try {
    const data = await api.updateSessionStatus(body);
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
| **sessionId** | `number` | 세션 ID | [Defaults to `undefined`] |
| **status** | `string` | 변경할 상태 | [Defaults to `undefined`] |

### Return type

[**SessionResponse**](SessionResponse.md)

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

