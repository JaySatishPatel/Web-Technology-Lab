# Employee Management System

A comprehensive web-based employee management system built with HTML, CSS, JavaScript, and PHP with MySQL database integration.

## Features

✅ **Add Employees** - Create new employee records with validation
✅ **View Employees** - Display all employees in a searchable table
✅ **Update Employees** - Edit employee information
✅ **Delete Employees** - Remove employee records with confirmation
✅ **Search Functionality** - Real-time search by name, email, or department
✅ **Form Validation** - Client-side and server-side validation
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Professional UI** - Modern and user-friendly interface

## System Requirements

- **Server:** XAMPP (Apache, PHP 7.4+)
- **Database:** MySQL 5.7+
- **Browser:** Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Set Up the Database

#### Option A: Using phpMyAdmin (Recommended)

1. Start XAMPP and ensure Apache and MySQL are running
2. Open your browser and navigate to `http://localhost/phpmyadmin`
3. Click on "Import" tab
4. Choose the `database.sql` file from the EmployeeManagementSystem folder
5. Click "Go" to import the database

#### Option B: Using MySQL Command Line

1. Open XAMPP Control Panel and start MySQL
2. Open Command Prompt/Terminal
3. Navigate to MySQL bin directory or use the MySQL command directly:
   ```bash
   mysql -u root -p < "C:\xampp\htdocs\EmployeeManagementSystem\database.sql"
   ```
4. Press Enter (leave password blank if not set)

#### Option C: Manual Setup in phpMyAdmin

1. Open phpMyAdmin
2. Click "New" to create a new database
3. Enter database name: `employee_management`
4. Click "Create"
5. Select the database
6. Open the "SQL" tab
7. Copy and paste the content of `database.sql`
8. Click "Go"

### 2. Access the Application

1. Start Apache and MySQL from XAMPP Control Panel
2. Open your browser
3. Navigate to: `http://localhost/EmployeeManagementSystem/`
4. The system is ready to use!

## Project Structure

```
EmployeeManagementSystem/
├── index.php           # Main page - View all employees
├── add.php            # Add new employee form and processing
├── update.php         # Update employee form and processing
├── delete.php         # Delete employee confirmation and processing
├── db_connect.php     # Database connection configuration
├── style.css          # Styling and responsive design
├── script.js          # Form validation and client-side logic
├── database.sql       # Database schema and sample data
└── README.md          # This file
```

## File Descriptions

### index.php
- Displays all employee records in a table format
- Includes search functionality to filter employees
- Provides links to edit and delete employees
- Shows appropriate message if no employees exist

### add.php
- Form to add a new employee
- Validates all required fields
- Checks for duplicate emails
- Inserts data into the database
- Redirects to index.php on success

### update.php
- Fetches existing employee data
- Pre-fills form with current information
- Allows modification of all employee fields
- Validates input data
- Updates database on submit
- Redirects to index.php on success

### delete.php
- Shows employee details for confirmation
- Requires confirmation before deletion
- Prevents accidental data loss
- Deletes record from database
- Redirects to index.php on success

### db_connect.php
- Establishes connection to MySQL database
- Uses mysqli for secure database operations
- Sets UTF-8 character encoding

### style.css
- Professional gradient background
- Responsive table and form layouts
- Hover effects and smooth transitions
- Mobile-friendly design
- Color-coded buttons and alerts

### script.js
- Email validation
- Phone number validation
- Form field validation
- Real-time search functionality
- Delete confirmation dialogs
- Error message display

## Database Schema

### employees Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key - Auto increment |
| first_name | VARCHAR(50) | Employee's first name |
| last_name | VARCHAR(50) | Employee's last name |
| email | VARCHAR(100) | Employee's email (unique) |
| phone | VARCHAR(20) | Employee's phone number |
| department | VARCHAR(50) | Department name |
| salary | DECIMAL(10,2) | Annual salary |
| hire_date | DATE | Employee's hire date |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Usage Guide

### Adding an Employee

1. Click "Add New Employee" button on the home page
2. Fill in all required fields:
   - First Name (minimum 2 characters)
   - Last Name (minimum 2 characters)
   - Email (valid email format)
   - Phone (10-15 digits)
   - Department (select from dropdown)
   - Salary (positive number)
   - Hire Date (calendar date)
3. Click "Add Employee" to save
4. You'll be redirected to the employee list on success

### Viewing Employees

1. The main page displays all employees in a table
2. Use the search box to filter by:
   - Employee name
   - Email address
   - Department
3. Search is performed in real-time as you type

### Updating an Employee

1. Click the "Edit" button next to an employee
2. Modify the information you want to change
3. Click "Update Employee" to save changes
4. You'll be redirected to the employee list

### Deleting an Employee

1. Click the "Delete" button next to an employee
2. Review the employee details shown
3. Click "Yes, Delete Employee" to confirm
4. The employee will be removed from the database
5. You'll be redirected to the employee list

## Validation Rules

### Client-Side Validation (JavaScript)

- **First Name:** Required, minimum 2 characters
- **Last Name:** Required, minimum 2 characters
- **Email:** Required, valid email format (xxx@xxx.xxx)
- **Phone:** Required, 10-15 digits
- **Department:** Required, must select from dropdown
- **Salary:** Required, must be a positive number
- **Hire Date:** Required, valid date format

### Server-Side Validation (PHP)

- All fields are required
- Email format validation
- Salary is numeric and non-negative
- Email uniqueness is checked (except during updates)
- Data is sanitized and escaped to prevent SQL injection

## Troubleshooting

### "Connection failed" error

**Problem:** Database connection error
**Solution:**
1. Verify MySQL is running in XAMPP Control Panel
2. Check if database name is "employee_management"
3. Confirm credentials in db_connect.php (username: root, password: blank)
4. Ensure database was created successfully

### "Table doesn't exist" error

**Problem:** employees table not found
**Solution:**
1. Import the database.sql file using phpMyAdmin
2. Verify the table exists in the database
3. Check database name spelling

### Page not loading

**Problem:** 404 error or blank page
**Solution:**
1. Verify XAMPP Apache is running
2. Check URL is correct: http://localhost/EmployeeManagementSystem/
3. Ensure PHP files are in the correct directory

### Search not working

**Problem:** Search functionality not responding
**Solution:**
1. Open browser DevTools (F12)
2. Check if JavaScript errors appear in Console
3. Verify script.js is linked in HTML

## Default Sample Data

The system comes with 5 sample employees:

1. **John Doe** - Engineering - $85,000
2. **Jane Smith** - Human Resources - $65,000
3. **Michael Johnson** - Finance - $75,000
4. **Sarah Williams** - Sales - $70,000
5. **Robert Brown** - Engineering - $88,000

These are added when you import database.sql. You can delete them and add your own.

## Available Departments

- Human Resources
- Finance
- Engineering
- Sales
- Marketing
- Operations
- IT Support

(You can add more by modifying the dropdown options in add.php and update.php)

## User Tips

1. **Search is case-insensitive** - Search for "john" or "JOHN" returns the same results
2. **Salary format** - Enter without currency symbol (e.g., 50000, not $50,000)
3. **Phone format** - Use format like +1-234-567-8900 or (123) 456-7890
4. **Email uniqueness** - Each employee must have a unique email address
5. **Hire date** - Can be a past or future date

## Security Features

✅ SQL Injection Prevention - Uses prepared statements
✅ XSS Prevention - HTML escaping with htmlspecialchars()
✅ Form Validation - Both client and server-side
✅ Unique Constraints - Email uniqueness enforced
✅ Confirmation Dialogs - Prevents accidental deletions
✅ Data Sanitization - All inputs are trimmed and validated

## Performance Optimization

✅ Database Indexes on: email, department, hire_date
✅ Prepared Statements - Improves query performance
✅ Efficient sorting - Newest employees appear first
✅ Responsive CSS - Minimizes rendering time
✅ Optimized JavaScript - No external dependencies

## Future Enhancements

Possible features to add:
- User authentication and login system
- Role-based access control (admin, manager, employee)
- Export data to CSV/Excel
- Generate PDF reports
- Advanced filtering and sorting
- Employee performance ratings
- Salary history tracking
- Bulk import from CSV
- Email notifications
- Dashboard with statistics

## Support & Feedback

For issues or suggestions, review the code and comments included in each file.

## License

This Employee Management System is open-source and free to use and modify.

---

**Version:** 1.0
**Last Updated:** 2026-03-17
**Author:** Employee Management System Team
