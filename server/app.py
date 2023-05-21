from bson import ObjectId
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os;
from dotenv import load_dotenv
load_dotenv();


app = Flask(__name__)
CORS(app, origins='*')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)
print(mongo)


@app.route("/api/todos", methods=["POST"])
def create_todo():
    task_name = request.json.get("name")
    task_description = request.json.get("description")
    deadline = request.json.get('deadline')
    # print(task_description, task_name)
    if task_name and task_description:
        todo_id = mongo.db.todos.insert_one({
            "name": task_name,
            "description": task_description,
            "deadline": deadline,
            "isCompleted": False
        }).inserted_id
        return jsonify({"message": "Todo created successfully", "todo_id": str(todo_id)}), 200
    else:
        return jsonify({"error": "Missing 'task_name' or 'task_description' field in the request"}), 400


@app.route("/api/todos/<todo_id>", methods=["PUT"])
def edit_todo(todo_id):
    task_name = request.json.get("name")
    task_description = request.json.get("description")
    deadline = request.json.get('deadline')
    isCompleted = request.json.get('isCompleted')
    if task_name and task_description:
        result = mongo.db.todos.update_one(
            {"_id": ObjectId(todo_id)},
            {"$set": {"name": task_name, "description": task_description,
                      "deadline": deadline, "isCompleted": isCompleted}}
        )
        if result.matched_count > 0:
            return jsonify({"message": "Todo updated successfully"}), 200
        else:
            return jsonify({"error": "Todo not found"}), 404
    else:
        return jsonify({"error": "Missing 'task_name' or 'task_description' field in the request"}), 400


@app.route("/api/todos/<todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    result = mongo.db.todos.delete_one({"_id": ObjectId(todo_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Todo deleted successfully"}), 200
    else:
        return jsonify({"error": "Todo not found"}), 404


@app.route("/api/todos", methods=["GET"])
def list_todos():
    todos = mongo.db.todos.find(
        {}, {})
    todo_list = []
    for todo in todos:
        todo["_id"] = str(todo["_id"])
        todo_list.append(todo)
    return jsonify(todo_list), 200


if __name__ == "__main__":
    app.run()
