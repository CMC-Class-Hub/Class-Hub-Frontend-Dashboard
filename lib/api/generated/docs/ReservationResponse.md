
# ReservationResponse

예약 응답

## Properties

Name | Type
------------ | -------------
`reservationId` | number
`studentId` | number
`applicantName` | string
`phoneNumber` | string
`appliedAt` | Date
`reservationStatus` | string
`sentD3Notification` | boolean
`sentD1Notification` | boolean

## Example

```typescript
import type { ReservationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "reservationId": 1,
  "studentId": 1,
  "applicantName": 홍길동,
  "phoneNumber": 010-1234-5678,
  "appliedAt": 2024-01-15T10:30:00,
  "reservationStatus": CONFIRMED,
  "sentD3Notification": false,
  "sentD1Notification": false,
} satisfies ReservationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReservationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


