
# UpdateMemberRequest

회원 수정 요청

## Properties

Name | Type
------------ | -------------
`name` | string
`phone` | string

## Example

```typescript
import type { UpdateMemberRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": 홍길동,
  "phone": 010-1234-5678,
} satisfies UpdateMemberRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateMemberRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


