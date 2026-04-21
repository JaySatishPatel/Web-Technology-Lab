import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", department: "", email: "" });

  const load = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    await addEmployee(form);
    setForm({ id: "", name: "", department: "", email: "" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      {/* Add Form */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input placeholder="ID" onChange={e => setForm({...form, id:e.target.value})} className="border p-2 m-1"/>
        <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} className="border p-2 m-1"/>
        <input placeholder="Department" onChange={e => setForm({...form, department:e.target.value})} className="border p-2 m-1"/>
        <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} className="border p-2 m-1"/>

        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2">
          Add Employee
        </button>
      </div>

      {/* List */}
      {employees.map(emp => (
        <div key={emp.id} className="bg-white p-3 rounded shadow mb-2">
          <p><b>{emp.name}</b> ({emp.department})</p>
          <p>{emp.email}</p>

          <button onClick={() => { deleteEmployee(emp.id); load(); }}
            className="bg-red-500 text-white px-3 py-1 mt-2">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Employees;