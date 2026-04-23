import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AddUser.css";

function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (form.firstName.trim().length < 3)
      return "First name must be at least 3 characters";
      if (!form.lastName.trim())
      return "Last name is required";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email))
      return "Invalid email";

    if (form.phone.length !== 10)
      return "Phone must be 10 digits";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await API.post("/users/add", form);
      alert("User added successfully");
      navigate("/users");
    } catch {
      setError("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1>Add User</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
       <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
       <input name="phone" placeholder="Phone" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>

    </div>
  );
}

export default AddUser;