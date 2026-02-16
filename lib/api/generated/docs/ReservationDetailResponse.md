
# ReservationDetailResponse

예약 상세 응답

## Properties

Name | Type
------------ | -------------
`reservationId` | number
`classTitle` | string
`classImageUrl` | string
`classLocation` | string
`classCode` | string
`date` | Date
`startTime` | [LocalTime](LocalTime.md)
`endTime` | [LocalTime](LocalTime.md)
`applicantName` | string
`phoneNumber` | string
`capacity` | number
`currentNum` | number
`sessionStatus` | string
`reservationStatus` | string

## Example

```typescript
import type { ReservationDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "reservationId": 1,
  "classTitle": 도자기 만들기 원데이클래스,
  "classImageUrl": https://example.com/image.jpg,
  "classLocation": 서울시 강남구 테헤란로 123,
  "classCode": ABC123,
  "date": 2024-01-15,
  "startTime": null,
  "endTime": null,
  "applicantName": 홍길동,
  "phoneNumber": 010-1234-5678,
  "capacity": 10,
  "currentNum": 5,
  "sessionStatus": OPEN,
  "reservationStatus": CONFIRMED,
} satisfies ReservationDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReservationDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


