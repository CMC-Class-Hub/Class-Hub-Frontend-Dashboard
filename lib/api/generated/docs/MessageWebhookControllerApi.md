# MessageWebhookControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**receiveWebhook**](MessageWebhookControllerApi.md#receivewebhook) | **POST** /api/messages/webhook |  |



## receiveWebhook

> receiveWebhook(solapiWebhookRequest)



### Example

```ts
import {
  Configuration,
  MessageWebhookControllerApi,
} from '';
import type { ReceiveWebhookRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MessageWebhookControllerApi(config);

  const body = {
    // Array<SolapiWebhookRequest>
    solapiWebhookRequest: ...,
  } satisfies ReceiveWebhookRequest;

  try {
    const data = await api.receiveWebhook(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **solapiWebhookRequest** | `Array<SolapiWebhookRequest>` |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

