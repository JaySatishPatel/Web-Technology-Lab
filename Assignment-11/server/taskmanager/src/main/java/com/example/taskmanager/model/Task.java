package com.example.taskmanager.model;

public class Task {

    private int taskId;
    private String description;
    private String status;
    private String deadline;

    public Task() {}

    public Task(int taskId, String description, String status, String deadline) {
        this.taskId = taskId;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
    }

    public int getTaskId() { return taskId; }
    public void setTaskId(int taskId) { this.taskId = taskId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
}