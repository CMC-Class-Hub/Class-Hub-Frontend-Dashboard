
# LoginStatusResponse

로그인 상태 응답

## Properties

Name | Type
------------ | -------------
`username` | string
`loggedIn` | boolean

## Example

```typescript
import type { LoginStatusResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "username": instructor@example.com,
  "loggedIn": null,
} satisfies LoginStatusResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LoginStatusResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


