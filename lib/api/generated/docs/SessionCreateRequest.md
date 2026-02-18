
# SessionCreateRequest

세션 생성 요청

## Properties

Name | Type
------------ | -------------
`templateId` | number
`date` | Date
`startTime` | string
`endTime` | string
`price` | number
`capacity` | number

## Example

```typescript
import type { SessionCreateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "templateId": 1,
  "date": 2024-01-15,
  "startTime": null,
  "endTime": null,
  "price": 50000,
  "capacity": 10,
} satisfies SessionCreateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SessionCreateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


