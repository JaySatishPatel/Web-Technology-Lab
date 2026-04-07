<?php
include 'db_connect.php';

// Get all employees
$sql = "SELECT * FROM employees ORDER BY id DESC";
$result = $conn->query($sql);
$employees = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🏢 Employee Management System</h1>
            <p>Manage your employee records efficiently</p>
        </header>

        <div class="btn-container">
            <a href="add.php" class="btn btn-success">+ Add New Employee</a>
        </div>

        <div class="table-container">
            <?php if (count($employees) > 0): ?>
                <div class="search-container">
                    <input type="text" id="searchInput" placeholder="Search employees by name, email, or department...">
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Hire Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($employees as $employee): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($employee['id']); ?></td>
                                <td><?php echo htmlspecialchars($employee['first_name']); ?></td>
                                <td><?php echo htmlspecialchars($employee['last_name']); ?></td>
                                <td><?php echo htmlspecialchars($employee['email']); ?></td>
                                <td><?php echo htmlspecialchars($employee['phone']); ?></td>
                                <td><?php echo htmlspecialchars($employee['department']); ?></td>
                                <td>$<?php echo number_format($employee['salary'], 2); ?></td>
                                <td><?php echo date('M d, Y', strtotime($employee['hire_date'])); ?></td>
                                <td>
                                    <a href="update.php?id=<?php echo $employee['id']; ?>" class="btn btn-edit btn-small">Edit</a>
                                    <a href="delete.php?id=<?php echo $employee['id']; ?>" class="btn btn-danger btn-small" onclick="return confirmDelete('<?php echo htmlspecialchars($employee['first_name'] . ' ' . $employee['last_name']); ?>');">Delete</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <div class="alert alert-info">
                    <p>No employees found. <a href="add.php" style="color: inherit; text-decoration: underline;">Add the first employee</a></p>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
