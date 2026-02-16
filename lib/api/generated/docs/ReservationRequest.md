
# ReservationRequest

예약 요청

## Properties

Name | Type
------------ | -------------
`sessionId` | number
`applicantName` | string
`phoneNumber` | string

## Example

```typescript
import type { ReservationRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "sessionId": 1,
  "applicantName": 홍길동,
  "phoneNumber": 010-1234-5678,
} satisfies ReservationRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReservationRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


