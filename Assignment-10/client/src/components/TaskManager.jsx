import { useState } from "react";

function TaskManager() {
  const [empId, setEmpId] = useState("");
  const [task, setTask] = useState({
    taskId: "",
    description: "",
    status: "",
    deadline: "",
  });

  const [updateData, setUpdateData] = useState({
    empId: "",
    taskId: "",
    status: "",
  });

  // 🔹 Assign Task
  const assignTask = async () => {
    await fetch(`http://localhost:8080/api/employee/${empId}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    alert("Task Assigned!");
  };

  // 🔹 Update Task Status
  const updateTaskStatus = async () => {
    await fetch(
      `http://localhost:8080/api/employee/${updateData.empId}/task/${updateData.taskId}?status=${updateData.status}`,
      {
        method: "PUT",
      }
    );

    alert("Task Status Updated!");
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Task Management</h2>

      {/* 🔹 Assign Task */}
      <div className="mb-6">
        <h3 className="font-semibold">Assign Task</h3>

        <input
          placeholder="Employee ID"
          onChange={(e) => setEmpId(e.target.value)}
          className="border p-2 m-1"
        />

        <input
          placeholder="Task ID"
          onChange={(e) => setTask({ ...task, taskId: e.target.value })}
          className="border p-2 m-1"
        />

        <input
          placeholder="Description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="border p-2 m-1"
        />

        <input
          placeholder="Status"
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="border p-2 m-1"
        />

        <input
          placeholder="Deadline"
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          className="border p-2 m-1"
        />

        <button
          onClick={assignTask}
          className="bg-green-500 text-white px-4 py-2 mt-2"
        >
          Assign Task
        </button>
      </div>

      {/* 🔹 Update Task Status */}
      <div>
        <h3 className="font-semibold">Update Task Status</h3>

        <input
          placeholder="Employee ID"
          onChange={(e) =>
            setUpdateData({ ...updateData, empId: e.target.value })
          }
          className="border p-2 m-1"
        />

        <input
          placeholder="Task ID"
          onChange={(e) =>
            setUpdateData({ ...updateData, taskId: e.target.value })
          }
          className="border p-2 m-1"
        />

        <input
          placeholder="New Status"
          onChange={(e) =>
            setUpdateData({ ...updateData, status: e.target.value })
          }
          className="border p-2 m-1"
        />

        <button
          onClick={updateTaskStatus}
          className="bg-yellow-500 text-white px-4 py-2 mt-2"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}

export default TaskManager;