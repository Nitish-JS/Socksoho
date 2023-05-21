import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import EditTask from "../popups/editTask";

const Card = ({ task, deleteItem, updateTask }) => {
  const [modal, setModal] = useState(false);
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
    deleteItem(task._id);
  };

  const handleUpdate = (obj) => {
    updateTask(task._id, obj);
  };

  const handleComplete = () => {
    const updatedTask = { ...task, isCompleted: true };
    updateTask(task._id, updatedTask);
  };

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const deadlineDate = new Date(task.deadline);
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDaysLeft(daysDifference);
  }, [task.deadline]);

  return (
    <div className={`card-wrapper mr-5 ${task.isCompleted ? "completed" : ""}`}>
      <div
        className="card-top"
        style={{ backgroundColor: randomColor.primaryColor }}
      ></div>
      <div className="task-holder">
        <span
          className="card-header"
          style={{
            backgroundColor: randomColor.secondaryColor,
            borderRadius: "10px",
          }}
        >
          {task.name}
        </span>
        <p className="mt-3">{task.description}</p>
        <div
          style={{
            position: "absolute",
            left: "10px",
            bottom: "20px",
            color: task.completed
              ? "green"
              : daysLeft < 0
              ? "red"
              : daysLeft <= 3
              ? "orange"
              : "green",
          }}
        >
          {task.isCompleted ? (
            <span className="task-completed" style={{color:"green"}}>Task completed</span>
          ) : (
            daysLeft !== null && (
              <span className="days-left">
                {daysLeft < 0
                  ? Math.abs(daysLeft) +
                    (Math.abs(daysLeft) <= 1 ? " day" : " days") +
                    " past the deadline."
                  : daysLeft + (daysLeft <= 1 ? " day" : " days") + " left."}
              </span>
            )
          )}
        </div>
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          {!task.isCompleted ? (
            <>
              <FaEdit
                style={{
                  color: randomColor.primaryColor,
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => setModal(true)}
              />
              <FaTrash
                style={{ color: randomColor.primaryColor, cursor: "pointer" }}
                onClick={handleDelete}
              />
              <FaCheck
                style={{
                  color: randomColor.primaryColor,
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={handleComplete}
              />
            </>
          ) : (
            <FaTrash
              style={{ color: randomColor.primaryColor, cursor: "pointer" }}
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={handleUpdate}
        task={task}
      />
    </div>
  );
};

export default Card;
