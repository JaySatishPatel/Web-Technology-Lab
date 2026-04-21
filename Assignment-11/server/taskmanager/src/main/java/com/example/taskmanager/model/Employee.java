package com.example.taskmanager.model;

import java.util.List;

public class Employee {

    private int id;
    private String name;
    private String department;
    private String email;

    // 🔹 Add this (for storing tasks)
    private List<Task> tasks;

    public Employee() {}

    public Employee(int id, String name, String department, String email) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.email = email;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // 🔹 Getter & Setter for tasks
    public List<Task> getTasks() { return tasks; }
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }
}