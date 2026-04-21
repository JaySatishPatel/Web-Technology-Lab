import { useState } from "react";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    department: "",
    email: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:8080/api/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    alert("Employee Added!");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3">Add Employee</h2>

      <input name="id" placeholder="ID" onChange={handleChange} className="border p-2 m-1" />
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 m-1" />
      <input name="department" placeholder="Department" onChange={handleChange} className="border p-2 m-1" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 m-1" />

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Add
      </button>
    </div>
  );
}

export default AddEmployee;