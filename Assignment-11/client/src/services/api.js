const BASE_URL = "http://localhost:8080/api";

export const getEmployees = () => fetch(`${BASE_URL}/employees`).then(res => res.json());

export const addEmployee = (data) =>
  fetch(`${BASE_URL}/employee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteEmployee = (id) =>
  fetch(`${BASE_URL}/employee/${id}`, { method: "DELETE" });

export const assignTask = (empId, task) =>
  fetch(`${BASE_URL}/employee/${empId}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

export const updateTaskStatus = (empId, taskId, status) =>
  fetch(`${BASE_URL}/employee/${empId}/task/${taskId}?status=${status}`, {
    method: "PUT",
  });
  