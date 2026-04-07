<?php
include 'db_connect.php';

$errors = array();
$success = false;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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

    // Check if email already exists
    if (empty($errors)) {
        $checkEmail = "SELECT id FROM employees WHERE email = ?";
        $stmt = $conn->prepare($checkEmail);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            $errors[] = "Email already exists in the system";
        }
        $stmt->close();
    }

    // Insert data if no errors
    if (empty($errors)) {
        $sql = "INSERT INTO employees (first_name, last_name, email, phone, department, salary, hire_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("sssssds", $firstName, $lastName, $email, $phone, $department, $salary, $hireDate);
        
        if ($stmt->execute()) {
            $success = true;
            // Clear form data
            $firstName = $lastName = $email = $phone = $department = $salary = $hireDate = '';
        } else {
            $errors[] = "Error adding employee: " . $stmt->error;
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
    <title>Add Employee - Employee Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>➕ Add New Employee</h1>
            <p>Enter employee information below</p>
        </header>

        <div class="form-container">
            <?php if ($success): ?>
                <div class="success">
                    ✓ Employee added successfully! Redirecting to employee list...
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

            <form id="employeeForm" method="POST" onsubmit="return validateForm();">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" value="<?php echo htmlspecialchars($firstName ?? ''); ?>" required>
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value="<?php echo htmlspecialchars($lastName ?? ''); ?>" required>
                </div>

                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email ?? ''); ?>" required>
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value="<?php echo htmlspecialchars($phone ?? ''); ?>" placeholder="e.g., +1-234-567-8900" required>
                </div>

                <div class="form-group">
                    <label for="department">Department *</label>
                    <select id="department" name="department" required>
                        <option value="">Select Department</option>
                        <option value="Human Resources" <?php echo ($department === 'Human Resources') ? 'selected' : ''; ?>>Human Resources</option>
                        <option value="Finance" <?php echo ($department === 'Finance') ? 'selected' : ''; ?>>Finance</option>
                        <option value="Engineering" <?php echo ($department === 'Engineering') ? 'selected' : ''; ?>>Engineering</option>
                        <option value="Sales" <?php echo ($department === 'Sales') ? 'selected' : ''; ?>>Sales</option>
                        <option value="Marketing" <?php echo ($department === 'Marketing') ? 'selected' : ''; ?>>Marketing</option>
                        <option value="Operations" <?php echo ($department === 'Operations') ? 'selected' : ''; ?>>Operations</option>
                        <option value="IT Support" <?php echo ($department === 'IT Support') ? 'selected' : ''; ?>>IT Support</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="salary">Salary (Annual) *</label>
                    <input type="number" id="salary" name="salary" value="<?php echo htmlspecialchars($salary ?? ''); ?>" step="0.01" min="0" placeholder="e.g., 50000" required>
                </div>

                <div class="form-group">
                    <label for="hireDate">Hire Date *</label>
                    <input type="date" id="hireDate" name="hireDate" value="<?php echo htmlspecialchars($hireDate ?? ''); ?>" required>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-success">Add Employee</button>
                    <a href="index.php" class="btn">Cancel</a>
                </div>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
