
# SessionUpdateRequest

세션 수정 요청

## Properties

Name | Type
------------ | -------------
`date` | Date
`startTime` | [LocalTime](LocalTime.md)
`endTime` | [LocalTime](LocalTime.md)
`price` | number
`capacity` | number

## Example

```typescript
import type { SessionUpdateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "date": 2024-01-15,
  "startTime": null,
  "endTime": null,
  "price": 50000,
  "capacity": 10,
} satisfies SessionUpdateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SessionUpdateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


