
# MessageTemplateMetadata

메시지 템플릿 메타데이터

## Properties

Name | Type
------------ | -------------
`title` | string
`description` | string

## Example

```typescript
import type { MessageTemplateMetadata } from ''

// TODO: Update the object below with actual values
const example = {
  "title": 예약 확인,
  "description": 예약 확인 메시지 템플릿입니다.,
} satisfies MessageTemplateMetadata

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MessageTemplateMetadata
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


