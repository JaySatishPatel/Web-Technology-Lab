// Form validation
function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const department = document.getElementById('department').value.trim();
    const salary = document.getElementById('salary').value.trim();

    // Clear previous error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.remove());

    let isValid = true;

    // Validate first name
    if (firstName === '') {
        showError('firstName', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Validate last name
    if (lastName === '') {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    if (phone === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number (10-15 digits)');
        isValid = false;
    }

    // Validate department
    if (department === '' || department === 'Select Department') {
        showError('department', 'Please select a department');
        isValid = false;
    }

    // Validate salary
    if (salary === '') {
        showError('salary', 'Salary is required');
        isValid = false;
    } else if (isNaN(salary) || salary < 0) {
        showError('salary', 'Please enter a valid salary amount');
        isValid = false;
    }

    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (accepts digits, spaces, dashes, +)
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    element.parentNode.insertBefore(errorDiv, element);
}

// Delete confirmation
function confirmDelete(employeeName) {
    return confirm(`Are you sure you want to delete ${employeeName}? This action cannot be undone.`);
}

// Search functionality
function searchEmployee() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchValue) || searchValue === '') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Real-time search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', searchEmployee);
    }
});

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

// Clear form
function clearForm() {
    document.getElementById('employeeForm').reset();
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.remove());
}
