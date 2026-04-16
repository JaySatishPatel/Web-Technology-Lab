# BookStore CRUD Web Application - Setup Guide

## Project Overview
This is a servlet-based web application for managing a bookstore inventory with full CRUD (Create, Read, Update, Delete) operations.

## Database Setup
Before running the application, ensure your MySQL database is set up as follows:

```sql
-- Create Database
CREATE DATABASE bookstore;

-- Use Database
USE bookstore;

-- Create Table
CREATE TABLE ebookshop (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    book_title VARCHAR(100) NOT NULL,
    book_author VARCHAR(100) NOT NULL,
    book_price DOUBLE NOT NULL,
    quantity INT NOT NULL
);

-- Sample Data (Optional)
INSERT INTO ebookshop (book_title, book_author, book_price, quantity) VALUES
('Java Programming', 'Herbert Schildt', 45.99, 10),
('Python for Beginners', 'Mark Lutz', 35.50, 15),
('Web Development', 'Jon Duckett', 54.99, 8);
```

## Prerequisites
- Apache Tomcat 7.0 or higher
- Java Development Kit (JDK) 8 or higher
- MySQL Server
- MySQL JDBC Driver (mysql-connector-java)

## Installation Steps

### 1. Add MySQL JDBC Driver
- Download the MySQL JDBC Driver from: https://dev.mysql.com/downloads/connector/j/
- Extract the JAR file (mysql-connector-java-x.x.x.jar)
- Copy it to: `c:\xampp\tomcat\lib\` (for XAMPP) or `TOMCAT_HOME\lib\`

### 2. Update Database Connection
If your database credentials are different, edit `WEB-INF/classes/DBConnection.java`:

```java
private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/bookstore";
private static final String DATABASE_USER = "root";
private static final String DATABASE_PASSWORD = "";
```

### 3. Compile Java Files
Open command prompt and navigate to the application directory:

```bash
cd c:\xampp\tomcat\webapps\BookStoreApp\WEB-INF\classes

# Compile all Java files
javac -cp "path/to/mysql-connector-java.jar" *.java
```

For XAMPP users:
```bash
javac -cp "c:\xampp\tomcat\lib\mysql-connector-java.jar" *.java
```

### 4. Restart Tomcat
- Stop Tomcat service/server
- Start Tomcat service/server
- The application will be automatically deployed

## Project Structure
```
BookStoreApp/
├── index.html                    # Home page
├── addBook.html                  # Add book form
├── editBook.html                 # Edit book reference page
└── WEB-INF/
    ├── web.xml                   # Servlet configuration
    └── classes/
        ├── DBConnection.java     # Database connection class
        ├── Book.java             # Book model class
        ├── ViewBooksServlet.java # GET - List all books
        ├── AddBookServlet.java   # POST - Add new book
        ├── EditBookServlet.java  # GET - Display edit form
        ├── UpdateBookServlet.java# POST - Update book
        └── DeleteBookServlet.java# GET - Delete book
```

## Available Endpoints

| Operation | URL | Method | Description |
|-----------|-----|--------|-------------|
| View All | `http://localhost:8080/BookStoreApp/books` | GET | Lists all books with actions |
| Add Book | `http://localhost:8080/BookStoreApp/addBook.html` | GET | Display add form |
| Create | `http://localhost:8080/BookStoreApp/add` | POST | Create new book |
| Edit | `http://localhost:8080/BookStoreApp/edit?id=1` | GET | Display edit form for book |
| Update | `http://localhost:8080/BookStoreApp/update` | POST | Update book details |
| Delete | `http://localhost:8080/BookStoreApp/delete?id=1` | GET | Delete a book |
| Home | `http://localhost:8080/BookStoreApp/index.html` | GET | Home page |

## How to Use

1. **View All Books**: Click "View All Books" from the home page or navigate to `/books` endpoint
2. **Add Book**: Click "Add New Book", fill the form, and submit
3. **Edit Book**: Click the "Edit" button next to a book in the list
4. **Delete Book**: Click the "Delete" button next to a book (confirmation required)

## Troubleshooting

### "Class not found" or "JDBC Driver not found"
- Ensure MySQL JDBC JAR is in `TOMCAT_HOME/lib/` folder
- Restart Tomcat after placing the JAR

### "Connection refused" in Logs
- Verify MySQL server is running
- Check database credentials in DBConnection.java
- Ensure `bookstore` database exists

### "404 Not Found" Error
- Clear Tomcat work directory: `c:\xampp\tomcat\work\`
- Restart Tomcat
- Verify the URL pattern (case-sensitive)

### Compilation Errors
- Ensure JDK is installed and JAVA_HOME is set
- Verify MySQL JDBC JAR is in the classpath during compilation
- Check Java version compatibility

## File Descriptions

### DBConnection.java
Manages database connections using MySQL JDBC driver. Configure your database URL, username, and password here.

### Book.java
Model class representing a Book with getters and setters for all properties.

### ViewBooksServlet.java
Retrieves all books from the database and displays them in an HTML table with Edit and Delete action buttons.

### AddBookServlet.java
Handles POST requests to add new books. Validates input and inserts into the database.

### EditBookServlet.java
Retrieves a specific book's data and displays an edit form pre-filled with current values.

### UpdateBookServlet.java
Handles POST requests to update book information based on Book ID.

### DeleteBookServlet.java
Handles GET requests to delete a book by ID with confirmation.

## Security Notes
- This is a basic implementation for learning purposes
- In production, implement input validation and SQL injection prevention
- Add authentication and authorization for security
- Use prepared statements (already implemented) to prevent SQL injection

## Notes
- Book IDs are auto-generated by MySQL
- Prices support decimal values (e.g., 29.99)
- Quantity is stored as an integer
- All fields are required when adding/editing books
