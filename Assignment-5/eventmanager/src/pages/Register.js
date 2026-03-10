import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    class: "",
    department: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
  };

  return (
    <div>
      <h2>Event Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="roll"
          placeholder="Roll Number"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          required
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;