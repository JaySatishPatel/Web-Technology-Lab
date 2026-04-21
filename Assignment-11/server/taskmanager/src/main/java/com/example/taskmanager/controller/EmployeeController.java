package com.example.taskmanager.controller;

import com.example.taskmanager.model.Employee;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private TaskService taskService;

    // ADD EMPLOYEE
    @PostMapping("/employee")
    public Employee addEmployee(@RequestBody Employee emp) {
        return taskService.addEmployee(emp);
    }

    // GET ALL EMPLOYEES
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return taskService.getAllEmployees();
    }

    // DELETE EMPLOYEE
    @DeleteMapping("/employee/{id}")
    public String deleteEmployee(@PathVariable int id) {
        return taskService.deleteEmployee(id);
    }

    // UPDATE EMPLOYEE
    @PutMapping("/employee/{id}")
    public Employee updateEmployee(@PathVariable int id, @RequestBody Employee emp) {
        return taskService.updateEmployee(id, emp);
    }

    // ASSIGN TASK
    @PostMapping("/employee/{id}/task")
    public String assignTask(@PathVariable int id, @RequestBody Task task) {
        return taskService.assignTask(id, task);
    }

    // UPDATE TASK STATUS
    @PutMapping("/employee/{empId}/task/{taskId}")
    public String updateTaskStatus(@PathVariable int empId,
                                   @PathVariable int taskId,
                                   @RequestParam String status) {
        return taskService.updateTaskStatus(empId, taskId, status);
    }
}