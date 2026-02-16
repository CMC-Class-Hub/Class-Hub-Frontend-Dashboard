# ReservationApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelReservation**](ReservationApi.md#cancelreservation) | **DELETE** /api/reservations/{reservationCode} | 예약 취소 |
| [**getClassByCode**](ReservationApi.md#getclassbycode) | **GET** /api/reservations/code/{classCode} | 클래스 코드로 클래스 정보 조회 |
| [**getClassSessions**](ReservationApi.md#getclasssessions) | **GET** /api/reservations/{classId}/sessions | 클래스의 세션 목록 조회 |
| [**getReservationDetail**](ReservationApi.md#getreservationdetail) | **GET** /api/reservations/{reservationCode} | 예약 상세 조회 |
| [**getReservations**](ReservationApi.md#getreservations) | **GET** /api/reservations/session/{sessionId} | 세션별 예약 목록 조회 |
| [**getReservationsByClassCode**](ReservationApi.md#getreservationsbyclasscode) | **GET** /api/reservations/code/{classCode}/reservations | 클래스 코드로 예약 조회 |
| [**reserve**](ReservationApi.md#reserve) | **POST** /api/reservations | 예약 생성 |
| [**searchReservations**](ReservationApi.md#searchreservations) | **GET** /api/reservations/search | 내 예약 검색 |



## cancelReservation

> cancelReservation(reservationCode)

예약 취소

예약 코드로 예약을 취소합니다

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { CancelReservationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // string | 예약 코드
    reservationCode: reservationCode_example,
  } satisfies CancelReservationRequest;

  try {
    const data = await api.cancelReservation(body);
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
| **reservationCode** | `string` | 예약 코드 | [Defaults to `undefined`] |

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


## getClassByCode

> OnedayClassResponse getClassByCode(classCode)

클래스 코드로 클래스 정보 조회

클래스 코드로 클래스 정보를 조회합니다 (공개용)

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { GetClassByCodeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // string | 클래스 코드
    classCode: classCode_example,
  } satisfies GetClassByCodeRequest;

  try {
    const data = await api.getClassByCode(body);
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
| **classCode** | `string` | 클래스 코드 | [Defaults to `undefined`] |

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


## getClassSessions

> Array&lt;SessionResponse&gt; getClassSessions(classId)

클래스의 세션 목록 조회

클래스 ID로 세션 목록을 조회합니다 (공개용, 지난 날짜 제외)

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { GetClassSessionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // number | 클래스 ID
    classId: 789,
  } satisfies GetClassSessionsRequest;

  try {
    const data = await api.getClassSessions(body);
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


## getReservationDetail

> ReservationDetailResponse getReservationDetail(reservationCode)

예약 상세 조회

예약 코드로 상세 정보를 조회합니다

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { GetReservationDetailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // string | 예약 코드
    reservationCode: reservationCode_example,
  } satisfies GetReservationDetailRequest;

  try {
    const data = await api.getReservationDetail(body);
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
| **reservationCode** | `string` | 예약 코드 | [Defaults to `undefined`] |

### Return type

[**ReservationDetailResponse**](ReservationDetailResponse.md)

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


## getReservations

> Array&lt;ReservationResponse&gt; getReservations(sessionId)

세션별 예약 목록 조회

특정 세션의 예약 목록을 조회합니다

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { GetReservationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // number | 세션 ID
    sessionId: 789,
  } satisfies GetReservationsRequest;

  try {
    const data = await api.getReservations(body);
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


## getReservationsByClassCode

> Array&lt;ReservationDetailResponse&gt; getReservationsByClassCode(classCode)

클래스 코드로 예약 조회

클래스 코드로 해당 클래스의 모든 예약을 조회합니다

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { GetReservationsByClassCodeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // string | 클래스 코드
    classCode: classCode_example,
  } satisfies GetReservationsByClassCodeRequest;

  try {
    const data = await api.getReservationsByClassCode(body);
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
| **classCode** | `string` | 클래스 코드 | [Defaults to `undefined`] |

### Return type

[**Array&lt;ReservationDetailResponse&gt;**](ReservationDetailResponse.md)

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


## reserve

> string reserve(onedayClassId, reservationRequest)

예약 생성

원데이클래스 예약을 생성합니다

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { ReserveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // number | 클래스 ID
    onedayClassId: 789,
    // ReservationRequest
    reservationRequest: ...,
  } satisfies ReserveRequest;

  try {
    const data = await api.reserve(body);
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
| **onedayClassId** | `number` | 클래스 ID | [Defaults to `undefined`] |
| **reservationRequest** | [ReservationRequest](ReservationRequest.md) |  | |

### Return type

**string**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 예약 성공 |  -  |
| **400** | 잘못된 요청 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchReservations

> Array&lt;ReservationDetailResponse&gt; searchReservations(name, phone)

내 예약 검색

이름과 전화번호로 본인의 예약을 검색합니다

### Example

```ts
import {
  Configuration,
  ReservationApi,
} from '';
import type { SearchReservationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReservationApi(config);

  const body = {
    // string | 예약자 이름
    name: name_example,
    // string | 전화번호
    phone: phone_example,
  } satisfies SearchReservationsRequest;

  try {
    const data = await api.searchReservations(body);
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
| **name** | `string` | 예약자 이름 | [Defaults to `undefined`] |
| **phone** | `string` | 전화번호 | [Defaults to `undefined`] |

### Return type

[**Array&lt;ReservationDetailResponse&gt;**](ReservationDetailResponse.md)

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

