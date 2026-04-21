import { useState } from "react";
import { assignTask, updateTaskStatus } from "../services/api";

function Tasks() {
  const [task, setTask] = useState({});
  const [empId, setEmpId] = useState("");

  const [update, setUpdate] = useState({});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Assign Task */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3>Assign Task</h3>

        <input placeholder="Employee ID" onChange={e => setEmpId(e.target.value)} className="border p-2 m-1"/>
        <input placeholder="Task ID" onChange={e => setTask({...task, taskId:e.target.value})} className="border p-2 m-1"/>
        <input placeholder="Description" onChange={e => setTask({...task, description:e.target.value})} className="border p-2 m-1"/>

        <button onClick={() => assignTask(empId, task)}
          className="bg-green-500 text-white px-3 py-1">
          Assign
        </button>
      </div>

      {/* Update Task */}
      <div className="bg-white p-4 rounded shadow">
        <h3>Update Status</h3>

        <input placeholder="Emp ID" onChange={e => setUpdate({...update, empId:e.target.value})} className="border p-2 m-1"/>
        <input placeholder="Task ID" onChange={e => setUpdate({...update, taskId:e.target.value})} className="border p-2 m-1"/>
        <input placeholder="Status" onChange={e => setUpdate({...update, status:e.target.value})} className="border p-2 m-1"/>

        <button onClick={() => updateTaskStatus(update.empId, update.taskId, update.status)}
          className="bg-yellow-500 text-white px-3 py-1">
          Update
        </button>
      </div>
    </div>
  );
}

export default Tasks;