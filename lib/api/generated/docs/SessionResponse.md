
# SessionResponse

세션 응답

## Properties

Name | Type
------------ | -------------
`id` | number
`date` | Date
`startTime` | [LocalTime](LocalTime.md)
`endTime` | [LocalTime](LocalTime.md)
`currentNum` | number
`capacity` | number
`price` | number
`status` | string

## Example

```typescript
import type { SessionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "date": 2024-01-15,
  "startTime": null,
  "endTime": null,
  "currentNum": 5,
  "capacity": 10,
  "price": 50000,
  "status": OPEN,
} satisfies SessionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SessionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


