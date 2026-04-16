#!/bin/bash
# Bash script to compile all Java files for BookStore Application
# For Linux/Mac users

echo "========================================"
echo "BookStore Application - Compilation Script"
echo "========================================"
echo ""

# Check if we're in the correct directory
if [ ! -f "DBConnection.java" ]; then
    echo "Error: Please run this script from the WEB-INF/classes directory"
    echo "Expected path: /path/to/tomcat/webapps/BookStoreApp/WEB-INF/classes"
    exit 1
fi

# Set paths
TOMCAT_HOME="/opt/tomcat"  # Change this to your Tomcat installation path
CLASSPATH="${TOMCAT_HOME}/lib/*"

echo "Compiling Java files..."
echo "Classpath: $CLASSPATH"
echo ""

# Compile all Java files
javac -cp "$CLASSPATH" *.java

if [ $? -eq 0 ]; then
    echo ""
    echo "Compilation SUCCESSFUL!"
    echo "All .class files have been generated."
    echo ""
    echo "Next steps:"
    echo "1. Restart Apache Tomcat"
    echo "2. Open http://localhost:8080/BookStoreApp/"
else
    echo ""
    echo "Compilation FAILED!"
    echo "Please check the error messages above."
    exit 1
fi
