# Course Management API

A RESTful API built with Express.js and MongoDB (using Mongoose ODM) for managing courses. The API supports both in-memory storage (for testing without MongoDB) and MongoDB persistence.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Express Router for organized route handling
- ✅ Mongoose ODM for MongoDB integration
- ✅ Automatic fallback to in-memory storage if MongoDB is unavailable
- ✅ Input validation and error handling
- ✅ Sample data included for testing

## Project Structure

```
lab8/
├── server.js              # Main Express server
├── routes/
│   └── courseRouter.js    # Course routes (CRUD operations)
├── models/
│   └── Course.js          # Mongoose Course schema/model
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (optional - API works with in-memory storage if MongoDB is not available)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/coursesdb
   PORT=3000
   ```

3. **Start MongoDB (if using local MongoDB):**
   ```bash
   # On Windows (if MongoDB is installed as a service, it should start automatically)
   # Or use MongoDB Atlas (cloud) - no local installation needed
   ```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

Base URL: `http://localhost:3000/api/courses`

### 1. GET /api/courses
Get all courses.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1",
      "title": "Introduction to JavaScript",
      "instructor": "John Doe",
      "duration": 40,
      "price": 49.99,
      "description": "Learn the fundamentals of JavaScript programming"
    }
  ],
  "storage": "in-memory"
}
```

### 2. GET /api/courses/:id
Get a specific course by ID.

**Example:** `GET /api/courses/1`

### 3. POST /api/courses
Create a new course.

**Request Body:**
```json
{
  "title": "Node.js Fundamentals",
  "instructor": "Alice Johnson",
  "duration": 50,
  "price": 59.99,
  "description": "Learn Node.js from scratch"
}
```

**Required fields:** `title`, `instructor`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "3",
    "title": "Node.js Fundamentals",
    "instructor": "Alice Johnson",
    "duration": 50,
    "price": 59.99,
    "description": "Learn Node.js from scratch"
  },
  "storage": "in-memory"
}
```

### 4. PUT /api/courses/:id
Update a course (full update - all fields required).

**Example:** `PUT /api/courses/1`

**Request Body:**
```json
{
  "title": "Updated Course Title",
  "instructor": "Updated Instructor",
  "duration": 60,
  "price": 69.99,
  "description": "Updated description"
}
```

### 5. PATCH /api/courses/:id
Update a course (partial update - only include fields to update).

**Example:** `PATCH /api/courses/1`

**Request Body:**
```json
{
  "price": 79.99
}
```

### 6. DELETE /api/courses/:id
Delete a course by ID.

**Example:** `DELETE /api/courses/1`

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Course deleted successfully",
  "storage": "in-memory"
}
```

## Testing the API

### Using cURL

**Get all courses:**
```bash
curl http://localhost:3000/api/courses
```

**Get specific course:**
```bash
curl http://localhost:3000/api/courses/1
```

**Create a new course:**
```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Python Basics\",\"instructor\":\"Bob Smith\",\"duration\":30,\"price\":39.99,\"description\":\"Learn Python programming\"}"
```

**Update a course (PUT):**
```bash
curl -X PUT http://localhost:3000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Updated Title\",\"instructor\":\"New Instructor\",\"duration\":45,\"price\":49.99,\"description\":\"Updated description\"}"
```

**Update a course (PATCH):**
```bash
curl -X PATCH http://localhost:3000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d "{\"price\":59.99}"
```

**Delete a course:**
```bash
curl -X DELETE http://localhost:3000/api/courses/1
```

### Using Postman or Thunder Client

1. Import the endpoints listed above
2. Set the base URL to `http://localhost:3000/api/courses`
3. For POST, PUT, and PATCH requests, set the `Content-Type` header to `application/json`
4. Include the JSON body in the request

### Using PowerShell (Windows)

**Get all courses:**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/courses -Method Get
```

**Create a new course:**
```powershell
$body = @{
    title = "PowerShell Scripting"
    instructor = "John Doe"
    duration = 25
    price = 29.99
    description = "Learn PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/courses -Method Post -Body $body -ContentType "application/json"
```

## Storage Modes

The API automatically detects whether MongoDB is available:

- **MongoDB Mode**: When MongoDB is connected, all data is persisted to the database
- **In-Memory Mode**: When MongoDB is not available, data is stored in memory (lost on server restart)

The response includes a `storage` field indicating which mode is active.

## Sample Data

The API comes with 2 sample courses pre-loaded when using in-memory storage:
1. Introduction to JavaScript
2. Advanced React Development

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Server Error

Error responses include:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variable management
- **Node.js** - Runtime environment

## License

ISC

