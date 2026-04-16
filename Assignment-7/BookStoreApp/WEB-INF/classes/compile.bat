@echo off
REM Batch script to compile all Java files for BookStore Application
REM For XAMPP users

echo ========================================
echo BookStore Application - Compilation Script
echo ========================================
echo.

REM Check if we're in the correct directory
if not exist "DBConnection.java" (
    echo Error: Please run this script from the WEB-INF\classes directory
    echo Expected path: c:\xampp\tomcat\webapps\BookStoreApp\WEB-INF\classes
    pause
    exit /b 1
)

REM Set paths
set TOMCAT_HOME=C:\xampp\tomcat
set CLASSPATH=%TOMCAT_HOME%\lib\*

echo Compiling Java files...
echo Classpath: %CLASSPATH%
echo.

REM Compile all Java files
javac -cp "%CLASSPATH%" *.java

if errorlevel 1 (
    echo.
    echo Compilation FAILED!
    echo Please check the error messages above.
    pause
    exit /b 1
) else (
    echo.
    echo Compilation SUCCESSFUL!
    echo All .class files have been generated.
    echo.
    echo Next steps:
    echo 1. Restart Apache Tomcat
    echo 2. Open http://localhost:8080/BookStoreApp/
    pause
    exit /b 0
)
