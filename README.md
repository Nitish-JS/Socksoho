# Full Stack "To-Do List" Application
This is a Full Stack "To-Do List" application built using ReactJS for the frontend and Flask with MongoDB for the backend. The application allows users to create, edit, and delete to-do items, as well as list all existing to-do items.

## Deployment
The application is deployed as follows:

Frontend: https://socksoho-internship-task.vercel.app/

Backend: https://socksoho.onrender.com/

To access the application, simply visit the provided URLs. The frontend provides a user-friendly interface to interact with the to-do list, while the backend handles the API requests and data storage in MongoDB.

Feel free to explore the application, create new to-do items, edit existing ones, delete tasks, and sort the list by name.


## API Endpoints
The backend provides the following API endpoints for interacting with the to-do items:

### Create a new to-do item
POST /api/todos

Creates a new to-do item.

Request Body:
```
    {
      "name": "Task name",
      "description": "Task description",
      "deadline": "Task deadline"
    }
```
Response:
```
    {
      "message": "Todo created successfully",
      "todo_id": "todo_id"
    }
```
#### Edit a to-do item
PUT /api/todos/:todo_id

Edits an existing to-do item.

Request Body:
```
{
  "name": "New task name",
  "description": "New task description",
  "deadline": "New task deadline",
  "isCompleted": true/false}
```
    
Response:

```
{
  "message": "Todo updated successfully"
}
```
    
#### Delete a to-do item

DELETE /api/todos/:todo_id

Deletes an existing to-do item.

Response:
```
{
  "message": "Todo deleted successfully"
}
```
#### List all to-do items
GET /api/todos

Retrieves all existing to-do items.

Response:

```
[
  {
    "id": "todo_id",
    "name": "Task name",
    "description": "Task description",
    "deadline": "Task deadline",
    "isCompleted": true/false
  },
  ...
]
```





