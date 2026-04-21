import { useEffect, useState } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:8080/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:8080/api/employee/${id}`, {
      method: "DELETE",
    });
    fetchEmployees();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Employees</h2>

      {employees.map((emp) => (
        <div key={emp.id} className="border p-3 mb-2 rounded">
          <p><b>{emp.name}</b> ({emp.department})</p>
          <p>{emp.email}</p>

          <button
            onClick={() => deleteEmployee(emp.id)}
            className="bg-red-500 text-white px-2 py-1 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;