
# OnedayClassDetailResponse

원데이클래스 상세 응답

## Properties

Name | Type
------------ | -------------
`id` | number
`classCode` | string
`title` | string
`imageUrls` | Array&lt;string&gt;
`description` | string
`location` | string
`locationDescription` | string
`material` | string
`parkingInfo` | string
`guidelines` | string
`policy` | string
`linkShareStatus` | string
`sessions` | [Array&lt;SessionResponse&gt;](SessionResponse.md)

## Example

```typescript
import type { OnedayClassDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "classCode": ABC123,
  "title": 도자기 만들기 원데이클래스,
  "imageUrls": null,
  "description": 초보자도 쉽게 배울 수 있는 도자기 수업입니다.,
  "location": 서울시 강남구 테헤란로 123,
  "locationDescription": 2층 공방,
  "material": 편한 복장,
  "parkingInfo": 건물 내 주차 가능,
  "guidelines": 수업 시작 10분 전까지 도착해주세요.,
  "policy": 수업 3일 전까지 전액 환불 가능,
  "linkShareStatus": ACTIVE,
  "sessions": null,
} satisfies OnedayClassDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OnedayClassDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


