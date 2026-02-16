
# SolapiWebhookRequest


## Properties

Name | Type
------------ | -------------
`messageId` | string
`groupId` | string
`statusCode` | string
`statusMessage` | string
`to` | string
`from` | string
`type` | string
`dateProcessed` | string
`dateReported` | string
`dateReceived` | string
`networkCode` | string

## Example

```typescript
import type { SolapiWebhookRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "messageId": null,
  "groupId": null,
  "statusCode": null,
  "statusMessage": null,
  "to": null,
  "from": null,
  "type": null,
  "dateProcessed": null,
  "dateReported": null,
  "dateReceived": null,
  "networkCode": null,
} satisfies SolapiWebhookRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SolapiWebhookRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


