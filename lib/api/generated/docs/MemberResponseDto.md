
# MemberResponseDto

회원 응답

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`phone` | string
`createdAt` | Date

## Example

```typescript
import type { MemberResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "name": 홍길동,
  "phone": 010-1234-5678,
  "createdAt": 2024-01-15T10:30:00,
} satisfies MemberResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MemberResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


