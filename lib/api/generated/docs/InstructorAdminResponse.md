
# InstructorAdminResponse


## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`createdAt` | Date
`onedayClassCount` | number
`sessionCount` | number
`reservationCount` | number

## Example

```typescript
import type { InstructorAdminResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "email": null,
  "createdAt": null,
  "onedayClassCount": null,
  "sessionCount": null,
  "reservationCount": null,
} satisfies InstructorAdminResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InstructorAdminResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


