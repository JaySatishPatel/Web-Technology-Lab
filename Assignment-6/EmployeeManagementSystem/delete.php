<?php
include 'db_connect.php';

$errors = array();
$success = false;
$employee = array();

// Get employee ID from URL
$employee_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($employee_id === 0) {
    $errors[] = "Invalid employee ID";
} else {
    // Fetch employee data
    $sql = "SELECT * FROM employees WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $employee_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $errors[] = "Employee not found";
    } else {
        $employee = $result->fetch_assoc();
    }
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $employee_id !== 0) {
    // Confirm deletion
    $confirm = isset($_POST['confirm']) ? $_POST['confirm'] : '';
    
    if ($confirm === 'yes') {
        $sql = "DELETE FROM employees WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $employee_id);
        
        if ($stmt->execute()) {
            $success = true;
        } else {
            $errors[] = "Error deleting employee: " . $stmt->error;
        }
        $stmt->close();
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Employee - Employee Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🗑️ Delete Employee</h1>
            <p>Confirm employee deletion</p>
        </header>

        <div class="form-container">
            <?php if ($success): ?>
                <div class="success">
                    ✓ Employee deleted successfully! Redirecting to employee list...
                    <script>
                        setTimeout(function() {
                            window.location.href = 'index.php';
                        }, 2000);
                    </script>
                </div>
            <?php endif; ?>

            <?php if (!empty($errors)): ?>
                <?php foreach($errors as $error): ?>
                    <div class="error">✗ <?php echo htmlspecialchars($error); ?></div>
                <?php endforeach; ?>
            <?php endif; ?>

            <?php if (!empty($employee) && !$success): ?>
                <div class="alert alert-info">
                    <strong>⚠️ Warning!</strong> You are about to delete the following employee record. This action cannot be undone.
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p><strong>Name:</strong> <?php echo htmlspecialchars($employee['first_name'] . ' ' . $employee['last_name']); ?></p>
                    <p><strong>Email:</strong> <?php echo htmlspecialchars($employee['email']); ?></p>
                    <p><strong>Department:</strong> <?php echo htmlspecialchars($employee['department']); ?></p>
                    <p><strong>Hire Date:</strong> <?php echo date('M d, Y', strtotime($employee['hire_date'])); ?></p>
                </div>

                <form method="POST">
                    <div class="form-actions">
                        <button type="submit" name="confirm" value="yes" class="btn btn-danger">Yes, Delete Employee</button>
                        <a href="index.php" class="btn">Cancel</a>
                    </div>
                </form>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
