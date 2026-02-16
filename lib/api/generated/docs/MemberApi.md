# MemberApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**create**](MemberApi.md#create) | **POST** /api/members | 회원 생성 |
| [**getAll**](MemberApi.md#getall) | **GET** /api/members | 전체 회원 조회 |
| [**getById**](MemberApi.md#getbyid) | **GET** /api/members/{id} | 회원 상세 조회 |
| [**update**](MemberApi.md#update) | **PATCH** /api/members/{id} | 회원 정보 수정 |



## create

> MemberResponseDto create(createMemberRequest)

회원 생성

새로운 회원을 생성합니다

### Example

```ts
import {
  Configuration,
  MemberApi,
} from '';
import type { CreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemberApi(config);

  const body = {
    // CreateMemberRequest
    createMemberRequest: ...,
  } satisfies CreateRequest;

  try {
    const data = await api.create(body);
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
| **createMemberRequest** | [CreateMemberRequest](CreateMemberRequest.md) |  | |

### Return type

[**MemberResponseDto**](MemberResponseDto.md)

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


## getAll

> Array&lt;MemberResponseDto&gt; getAll()

전체 회원 조회

모든 회원 목록을 조회합니다

### Example

```ts
import {
  Configuration,
  MemberApi,
} from '';
import type { GetAllRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemberApi(config);

  try {
    const data = await api.getAll();
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

[**Array&lt;MemberResponseDto&gt;**](MemberResponseDto.md)

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


## getById

> MemberResponseDto getById(id)

회원 상세 조회

특정 회원의 상세 정보를 조회합니다

### Example

```ts
import {
  Configuration,
  MemberApi,
} from '';
import type { GetByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemberApi(config);

  const body = {
    // number | 회원 ID
    id: 789,
  } satisfies GetByIdRequest;

  try {
    const data = await api.getById(body);
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
| **id** | `number` | 회원 ID | [Defaults to `undefined`] |

### Return type

[**MemberResponseDto**](MemberResponseDto.md)

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


## update

> MemberResponseDto update(id, updateMemberRequest)

회원 정보 수정

회원 정보를 수정합니다

### Example

```ts
import {
  Configuration,
  MemberApi,
} from '';
import type { UpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemberApi(config);

  const body = {
    // number | 회원 ID
    id: 789,
    // UpdateMemberRequest
    updateMemberRequest: ...,
  } satisfies UpdateRequest;

  try {
    const data = await api.update(body);
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
| **id** | `number` | 회원 ID | [Defaults to `undefined`] |
| **updateMemberRequest** | [UpdateMemberRequest](UpdateMemberRequest.md) |  | |

### Return type

[**MemberResponseDto**](MemberResponseDto.md)

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

