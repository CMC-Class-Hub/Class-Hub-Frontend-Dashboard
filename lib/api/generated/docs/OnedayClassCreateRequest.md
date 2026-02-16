
# OnedayClassCreateRequest

원데이클래스 생성 요청

## Properties

Name | Type
------------ | -------------
`name` | string
`images` | Array&lt;string&gt;
`description` | string
`location` | string
`locationDetails` | string
`preparation` | string
`instructions` | string
`cancellationPolicy` | string
`parkingInfo` | string

## Example

```typescript
import type { OnedayClassCreateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": 도자기 만들기 원데이클래스,
  "images": [https://example.com/image1.jpg],
  "description": 초보자도 쉽게 배울 수 있는 도자기 수업입니다.,
  "location": 서울시 강남구 테헤란로 123,
  "locationDetails": 2층 공방,
  "preparation": 편한 복장,
  "instructions": 수업 시작 10분 전까지 도착해주세요.,
  "cancellationPolicy": 수업 3일 전까지 전액 환불 가능,
  "parkingInfo": 건물 내 주차 가능 (2시간 무료),
} satisfies OnedayClassCreateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OnedayClassCreateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


