# Rest API Toko

Welcome to the documentation for the Store API. This API provides basic functionalities for managing products and orders in a simple online store. It is powered by Express.js for the server, Sequelize as the ORM, and PostgreSQL as the database.

## API Documentation

#### 1. Endpoint **User**

#### _Create New User_

| Parameter       | Type      | Description                                                     |
| :-------------- | :-------- | :-------------------------------------------------------------- |
| `userId`        | `string`  | **Mandatory**                                                   |
| `username`      | `string`  | **mandatory and unique** username must be at least 6 characters |
| `password`      | `string`  | **Mandatory** , Password must be at least 6 characters          |
| `passwordMatch` | `string`  | **Mandatory** , dont, match with password.                      |
| `email`         | `string`  | **mandatory and unique**, email format                          |
| `name`          | `string`  | **Mandatory**                                                   |
| `address`       | `string`  | **Mandatory**                                                   |
| `phone_number`  | `string`  | **mandatory and unique**                                        |
| `role_id`       | `integer` | **Mandatory**                                                   |

create a new user with JSON :

```json
{
  "username": "saban12345",
  "password": "saban123",
  "passwordMatch": "saban123",
  "email": "saban12345@gmail.com",
  "name": "saban",
  "address": "kota bima",
  "phone_number": "082247514553",
  "role_id": 1
}
```

### Request

```http
  POST /api/v1/users
```

### Response

> [!TIP] Success (200)

> [!CAUTION] Error(400)
