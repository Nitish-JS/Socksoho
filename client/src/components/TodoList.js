import React, { useEffect, useState } from "react";
import CreateTask from "../popups/createTask";
import Card from "./Card";
import axios from "axios";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://socksoho.onrender.com/api/todos"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSave = async (values) => {
    try {
      const response = await axios.post(
        "https://socksoho.onrender.com/api/todos",
        values
      );
      const newData = [...data, response.data];
      setData(newData);
      setModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://socksoho.onrender.com/api/todos/${id}`);
      const newData = data.filter((item) => item._id !== id);
      setData(newData);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (id, updatedValues) => {
    try {
      await axios.put(
        `https://socksoho.onrender.com/api/todos/${id}`,
        updatedValues
      );
      const newData = data.map((item) => {
        if (item._id === id) {
          return { ...item, ...updatedValues };
        }
        return item;
      });
      setData(newData);
      fetchData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const toggle = () => {
    setModal(!modal);
  };
  const uncompletedTasks = data.filter((item) => !item.isCompleted);
  const completedTasks = data.filter((item) => item.isCompleted);

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <>
      <div className="header text-center">
        <h3 className="mb-3">My Tasks</h3>
        <button className="btn btn-primary mb-3" onClick={() => setModal(true)}>
          Add task
        </button>
        <button className="btn btn-secondary ml-2" onClick={handleSort}>
          Sort ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
      </div>

      <div className="task-container">
        {/* Uncompleted Tasks */}
        {uncompletedTasks.length > 0 && (
          <>
            <h4 className="task-category">Uncompleted Tasks</h4>
            <div className="task-list">
              {uncompletedTasks.map((item) => (
                <Card
                  key={item._id}
                  task={item}
                  deleteItem={handleDelete}
                  updateTask={handleUpdate}
                />
              ))}
            </div>
          </>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <>
            <h4 className="task-category">Completed Tasks</h4>
            <div className="task-list">
              {completedTasks.map((item) => (
                <Card
                  key={item._id}
                  task={item}
                  deleteItem={handleDelete}
                  updateTask={handleUpdate}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CreateTask toggle={toggle} modal={modal} saveTask={handleSave} />
    </>
  );
};

export default TodoList;
