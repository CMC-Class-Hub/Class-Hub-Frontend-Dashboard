# InstructorApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMyClasses1**](InstructorApi.md#getmyclasses1) | **GET** /api/instructors/{instructorId}/classes | 강사의 클래스 목록 조회 |
| [**updateInstructor**](InstructorApi.md#updateinstructor) | **PUT** /api/instructors/{instructorId} | 강사 정보 수정 |
| [**withdraw**](InstructorApi.md#withdraw) | **DELETE** /api/instructors/{instructorId} | 강사 탈퇴 |



## getMyClasses1

> Array&lt;OnedayClassDetailResponse&gt; getMyClasses1(instructorId)

강사의 클래스 목록 조회

특정 강사의 모든 클래스를 상세 정보와 함께 조회합니다

### Example

```ts
import {
  Configuration,
  InstructorApi,
} from '';
import type { GetMyClasses1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InstructorApi(config);

  const body = {
    // number | 강사 ID
    instructorId: 789,
  } satisfies GetMyClasses1Request;

  try {
    const data = await api.getMyClasses1(body);
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
| **instructorId** | `number` | 강사 ID | [Defaults to `undefined`] |

### Return type

[**Array&lt;OnedayClassDetailResponse&gt;**](OnedayClassDetailResponse.md)

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


## updateInstructor

> updateInstructor(instructorId, instructorUpdateRequest)

강사 정보 수정

강사 정보를 수정합니다

### Example

```ts
import {
  Configuration,
  InstructorApi,
} from '';
import type { UpdateInstructorRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InstructorApi(config);

  const body = {
    // number | 강사 ID
    instructorId: 789,
    // InstructorUpdateRequest
    instructorUpdateRequest: ...,
  } satisfies UpdateInstructorRequest;

  try {
    const data = await api.updateInstructor(body);
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
| **instructorId** | `number` | 강사 ID | [Defaults to `undefined`] |
| **instructorUpdateRequest** | [InstructorUpdateRequest](InstructorUpdateRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## withdraw

> withdraw(instructorId)

강사 탈퇴

강사 정보를 삭제(탈퇴) 처리하고 관련 클래스들도 모두 삭제합니다

### Example

```ts
import {
  Configuration,
  InstructorApi,
} from '';
import type { WithdrawRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InstructorApi(config);

  const body = {
    // number | 강사 ID
    instructorId: 789,
  } satisfies WithdrawRequest;

  try {
    const data = await api.withdraw(body);
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
| **instructorId** | `number` | 강사 ID | [Defaults to `undefined`] |

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

