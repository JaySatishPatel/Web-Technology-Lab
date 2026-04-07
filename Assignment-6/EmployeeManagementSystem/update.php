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
    // Get form data
    $firstName = trim($_POST['firstName'] ?? '');
    $lastName = trim($_POST['lastName'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $department = trim($_POST['department'] ?? '');
    $salary = trim($_POST['salary'] ?? '');
    $hireDate = trim($_POST['hireDate'] ?? '');

    // Validate inputs
    if (empty($firstName)) {
        $errors[] = "First name is required";
    }
    if (empty($lastName)) {
        $errors[] = "Last name is required";
    }
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    if (empty($phone)) {
        $errors[] = "Phone number is required";
    }
    if (empty($department)) {
        $errors[] = "Department is required";
    }
    if (empty($salary)) {
        $errors[] = "Salary is required";
    } elseif (!is_numeric($salary) || $salary < 0) {
        $errors[] = "Invalid salary amount";
    }
    if (empty($hireDate)) {
        $errors[] = "Hire date is required";
    }

    // Check if email already exists (excluding current employee)
    if (empty($errors) && $email !== $employee['email']) {
        $checkEmail = "SELECT id FROM employees WHERE email = ? AND id != ?";
        $stmt = $conn->prepare($checkEmail);
        $stmt->bind_param("si", $email, $employee_id);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            $errors[] = "Email already exists in the system";
        }
        $stmt->close();
    }

    // Update data if no errors
    if (empty($errors)) {
        $sql = "UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone = ?, department = ?, salary = ?, hire_date = ? WHERE id = ?";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("sssssdsi", $firstName, $lastName, $email, $phone, $department, $salary, $hireDate, $employee_id);
        
        if ($stmt->execute()) {
            $success = true;
            $employee = [
                'id' => $employee_id,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'phone' => $phone,
                'department' => $department,
                'salary' => $salary,
                'hire_date' => $hireDate
            ];
        } else {
            $errors[] = "Error updating employee: " . $stmt->error;
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
    <title>Update Employee - Employee Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>✏️ Update Employee</h1>
            <p>Modify employee information</p>
        </header>

        <div class="form-container">
            <?php if ($success): ?>
                <div class="success">
                    ✓ Employee updated successfully! Redirecting to employee list...
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

            <?php if (!empty($employee)): ?>
                <form id="employeeForm" method="POST" onsubmit="return validateForm();">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" value="<?php echo htmlspecialchars($employee['first_name'] ?? ''); ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="lastName">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" value="<?php echo htmlspecialchars($employee['last_name'] ?? ''); ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($employee['email'] ?? ''); ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" value="<?php echo htmlspecialchars($employee['phone'] ?? ''); ?>" placeholder="e.g., +1-234-567-8900" required>
                    </div>

                    <div class="form-group">
                        <label for="department">Department *</label>
                        <select id="department" name="department" required>
                            <option value="">Select Department</option>
                            <option value="Human Resources" <?php echo ($employee['department'] === 'Human Resources') ? 'selected' : ''; ?>>Human Resources</option>
                            <option value="Finance" <?php echo ($employee['department'] === 'Finance') ? 'selected' : ''; ?>>Finance</option>
                            <option value="Engineering" <?php echo ($employee['department'] === 'Engineering') ? 'selected' : ''; ?>>Engineering</option>
                            <option value="Sales" <?php echo ($employee['department'] === 'Sales') ? 'selected' : ''; ?>>Sales</option>
                            <option value="Marketing" <?php echo ($employee['department'] === 'Marketing') ? 'selected' : ''; ?>>Marketing</option>
                            <option value="Operations" <?php echo ($employee['department'] === 'Operations') ? 'selected' : ''; ?>>Operations</option>
                            <option value="IT Support" <?php echo ($employee['department'] === 'IT Support') ? 'selected' : ''; ?>>IT Support</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="salary">Salary (Annual) *</label>
                        <input type="number" id="salary" name="salary" value="<?php echo htmlspecialchars($employee['salary'] ?? ''); ?>" step="0.01" min="0" placeholder="e.g., 50000" required>
                    </div>

                    <div class="form-group">
                        <label for="hireDate">Hire Date *</label>
                        <input type="date" id="hireDate" name="hireDate" value="<?php echo htmlspecialchars($employee['hire_date'] ?? ''); ?>" required>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-success">Update Employee</button>
                        <a href="index.php" class="btn">Cancel</a>
                    </div>
                </form>
            <?php endif; ?>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
