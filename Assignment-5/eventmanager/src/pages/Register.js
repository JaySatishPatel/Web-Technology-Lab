import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clubs from "../data/clubsData";
import Navbar from "../components/Navbar";

function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const event = clubs
    .flatMap((club) => club.events)
    .find((e) => e.id === parseInt(id));

  const [form, setForm] = useState({
    name: "",
    roll: "",
    class: "",
    department: "",
    email: "",
    phone: ""
  });

  const validateForm = () => {
    const errors = {};
    
    if (!form.name.trim()) {
      errors.name = "Name is required";
    }
    if (!form.roll.trim()) {
      errors.roll = "Roll number is required";
    }
    if (!form.class.trim()) {
      errors.class = "Class is required";
    }
    if (!form.department.trim()) {
      errors.department = "Department is required";
    }
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email is invalid";
    }
    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      errors.phone = "Phone number must be 10 digits";
    }

    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (!event) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.errorMessage}>Event not found</div>
        </div>
      </div>
    );
  }

  const club = clubs.find(c => c.events.some(e => e.id === parseInt(id)));

  if (isSubmitted) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✓</div>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering for <strong>{event.title}</strong></p>
            <p style={styles.successSubtext}>Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={{...styles.formHeader, backgroundColor: club.color}}>
            <h1>Event Registration</h1>
            <p>{event.title}</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formSection}>
              <h3>Personal Information</h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  style={{...styles.input, borderColor: formErrors.name ? '#e74c3c' : '#ddd'}}
                />
                {formErrors.name && <span style={styles.error}>{formErrors.name}</span>}
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Roll Number *</label>
                  <input
                    type="text"
                    name="roll"
                    placeholder="Enter your roll number"
                    value={form.roll}
                    onChange={handleChange}
                    style={{...styles.input, borderColor: formErrors.roll ? '#e74c3c' : '#ddd'}}
                  />
                  {formErrors.roll && <span style={styles.error}>{formErrors.roll}</span>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Class *</label>
                  <input
                    type="text"
                    name="class"
                    placeholder="e.g., 2nd Year"
                    value={form.class}
                    onChange={handleChange}
                    style={{...styles.input, borderColor: formErrors.class ? '#e74c3c' : '#ddd'}}
                  />
                  {formErrors.class && <span style={styles.error}>{formErrors.class}</span>}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Department *</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter your department"
                  value={form.department}
                  onChange={handleChange}
                  style={{...styles.input, borderColor: formErrors.department ? '#e74c3c' : '#ddd'}}
                />
                {formErrors.department && <span style={styles.error}>{formErrors.department}</span>}
              </div>
            </div>

            <div style={styles.formSection}>
              <h3>Contact Information</h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={{...styles.input, borderColor: formErrors.email ? '#e74c3c' : '#ddd'}}
                />
                {formErrors.email && <span style={styles.error}>{formErrors.email}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  style={{...styles.input, borderColor: formErrors.phone ? '#e74c3c' : '#ddd'}}
                />
                {formErrors.phone && <span style={styles.error}>{formErrors.phone}</span>}
              </div>
            </div>

            <div style={styles.eventSummary}>
              <h4>Event Summary</h4>
              <div style={styles.summaryRow}>
                <span>Event:</span>
                <strong>{event.title}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Date:</span>
                <strong>{event.date}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Time:</span>
                <strong>{event.time}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Location:</span>
                <strong>{event.location}</strong>
              </div>
            </div>

            <button type="submit" style={{...styles.submitBtn, backgroundColor: club.color}}>
              Complete Registration
            </button>

            <p style={styles.disclaimer}>
              ✓ By registering, you agree to receive updates about this event.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px"
  },
  formWrapper: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)"
  },
  formHeader: {
    padding: "30px",
    color: "white",
    textAlign: "center"
  },
  form: {
    padding: "30px"
  },
  formSection: {
    marginBottom: "30px"
  },
  formGroup: {
    marginBottom: "18px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
    fontSize: "0.95em"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "15px",
    fontFamily: "inherit",
    transition: "all 0.3s ease"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },
  error: {
    color: "#e74c3c",
    fontSize: "0.85em",
    marginTop: "4px",
    display: "block"
  },
  eventSummary: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "25px",
    borderLeft: "4px solid #667eea"
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    color: "#555"
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1em",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  disclaimer: {
    textAlign: "center",
    marginTop: "15px",
    color: "#999",
    fontSize: "0.85em"
  },
  successBox: {
    background: "white",
    padding: "60px 30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    marginTop: "60px"
  },
  successIcon: {
    fontSize: "4em",
    color: "#2ecc71",
    marginBottom: "20px"
  },
  successSubtext: {
    color: "#999",
    marginTop: "10px"
  },
  errorMessage: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "1.2em",
    color: "#e74c3c",
    marginTop: "40px"
  }
};

export default Register;