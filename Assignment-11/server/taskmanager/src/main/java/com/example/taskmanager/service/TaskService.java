package com.example.taskmanager.service;

import com.example.taskmanager.model.Employee;
import com.example.taskmanager.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private List<Employee> employees = new ArrayList<>();

    // ADD EMPLOYEE
    public Employee addEmployee(Employee emp) {
        employees.add(emp);
        return emp;
    }

    // GET ALL EMPLOYEES
    public List<Employee> getAllEmployees() {
        return employees;
    }

    // DELETE EMPLOYEE
    public String deleteEmployee(int id) {
        employees.removeIf(e -> e.getId() == id);
        return "Employee Deleted";
    }

    // UPDATE EMPLOYEE
    public Employee updateEmployee(int id, Employee newEmp) {
        for (Employee e : employees) {
            if (e.getId() == id) {
                e.setName(newEmp.getName());
                e.setDepartment(newEmp.getDepartment());
                e.setEmail(newEmp.getEmail());
                return e;
            }
        }
        return null;
    }

    // ASSIGN TASK
    public String assignTask(int empId, Task task) {
        for (Employee e : employees) {
            if (e.getId() == empId) {
                if (e.getTasks() == null) {
                    e.setTasks(new ArrayList<>());
                }
                e.getTasks().add(task);
                return "Task Assigned";
            }
        }
        return "Employee Not Found";
    }

    // UPDATE TASK STATUS
    public String updateTaskStatus(int empId, int taskId, String status) {
        for (Employee e : employees) {
            if (e.getId() == empId && e.getTasks() != null) {
                for (Task t : e.getTasks()) {
                    if (t.getTaskId() == taskId) {
                        t.setStatus(status);
                        return "Task Updated";
                    }
                }
            }
        }
        return "Task Not Found";
    }
}