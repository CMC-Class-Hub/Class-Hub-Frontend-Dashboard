
# Backend API Specification (Frontend Requirements)

This document outlines the API response formats expected by the Frontend, based on the current TypeScript definitions (`lib/api/types.ts`). The backend MUST return JSON bodies matching these structures.

## Authentication (Global)

For all protected endpoints (Templates, Sessions, etc.), the request will include the JWT token in the header:

```http
Authorization: Bearer <your_jwt_access_token>
```

---

## 1. Class Templates (Classes)

**Base URL**: `/api/classes`

### DTO: `ClassTemplate`

The API should return objects with the following fields. Fields marked with `?` are optional (can be `null` or missing).

```json
{
  "id": "string",
  "instructorId": "string",
  "name": "string",
  "status": "ACTIVE" | "INACTIVE",   // Enum string
  
  "images": [ "url1", "url2" ],      // List of strings (Optional)
  
  "description": "string",           // Optional
  "location": "string",
  "locationDetails": "string",       // Optional
  "preparation": "string",           // Optional
  "instructions": "string",          // Optional
  "notes": "string",                 // Optional
  "parkingInfo": "string",           // Optional
  "guidelines": "string",            // Optional (New)
  "policy": "string",                // Optional (New)
  "classCode": "string",             // Optional (New)

  "price": 0,                        // Integer (Optional)
  "depositAmount": 0,                // Integer (Optional)
  
  "cancellationPolicy": "string",    // Optional
  "noShowPolicy": "string",          // Optional
  
  "createdAt": "2024-02-04T00:00:00" // Optional ISO string
}
```

### Endpoints

#### `GET /api/classes?instructorId={id}`

* **Response**: `List<ClassTemplate>` (JSON Array)

    ```json
    [
      { ...ClassTemplate struct... },
      { ...ClassTemplate struct... }
    ]
    ```

#### `GET /api/classes/{id}`

* **Response**: `ClassTemplate` (Single Object)

#### `POST /api/classes`

* **Request Body**: `CreateTemplateRequest` (matches Template struct mostly)
* **Response**: `ClassTemplate` (The created object)

#### `PUT /api/classes/{id}`

* **Request Body**: `UpdateTemplateRequest`
* **Response**: `ClassTemplate` (The updated object)

---

## 2. Class Sessions

**Base URL**: `/api/sessions` or `/api/classes/{templateId}/sessions`

### DTO: `ClassSession`

```json
{
  "id": "string",
  "templateId": "string",
  "instructorId": "string",
  "linkId": "string",                // Unique link identifier
  
  "date": "2024-02-04",              // string (YYYY-MM-DD or similar)
  "startTime": "14:00",              // string
  "endTime": "16:00",                // string
  
  "status": "RECRUITING" | "CLOSED" | "FULL", // Enum string
  
  "currentNum": 0,                   // Integer (Current enrollment)
  "capacity": 0,                     // Integer (Max capacity)
  
  "createdAt": "2024-02-04T00:00:00" // String
}
```

### Endpoints

#### `GET /api/classes/{templateId}/sessions`

* **Response**: `List<ClassSession>` (JSON Array)

#### `GET /api/sessions/{id}`

* **Response**: `ClassSession`

#### `POST /api/sessions`

* **Request Body**:

    ```json
    {
      "templateId": "...",
      "instructorId": "...",
      "date": "...",
      "startTime": "...",
      "endTime": "...",
      "capacity": 10
    }
    ```

* **Response**: `ClassSession`

#### `PUT /api/sessions/{id}`

* **Response**: `ClassSession`

---

## 3. Message Templates

**Base URL**: `/api/classes/{templateId}/message-templates`

### DTO: `MessageTemplate`

```json
{
  "id": "string",
  "templateId": "string",
  "type": "D-3" | "D-1" | "APPLY_CONFIRMED", // Enum
  "content": "string",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Endpoints

#### `GET /api/classes/{templateId}/message-templates`

* **Response**: `List<MessageTemplate>` (JSON Array)

#### `POST /api/message-templates`

* **Request Body**: `{ "templateId": "...", "type": "...", "content": "..." }`
* **Response**: `MessageTemplate`

---

## 4. Auth (Login)

**Base URL**: `/api/auth/login`

### Response `LoginResponse`

```json
{
  "userId": 1,          // number
  "accessToken": "..."  // string (JWT Token)
}
```
