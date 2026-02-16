
# LoginResponse

로그인 응답

## Properties

Name | Type
------------ | -------------
`userId` | number
`name` | string
`phoneNumber` | string
`role` | string

## Example

```typescript
import type { LoginResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": 1,
  "name": 홍길동,
  "phoneNumber": 010-1234-5678,
  "role": USER,
} satisfies LoginResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LoginResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


