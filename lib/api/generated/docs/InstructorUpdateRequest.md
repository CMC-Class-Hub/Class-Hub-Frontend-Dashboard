
# InstructorUpdateRequest

강사 정보 수정 요청

## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`phoneNumber` | string
`password` | string

## Example

```typescript
import type { InstructorUpdateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": 홍길동,
  "email": instructor@example.com,
  "phoneNumber": 010-1234-5678,
  "password": newpassword123,
} satisfies InstructorUpdateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InstructorUpdateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


