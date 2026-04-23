import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/EditUser.css";

function EditUser() {
  const { id } = useParams();
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
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setForm(res.data);
    } catch {
      setError("Failed to load user");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.put(`/users/${id}`, form);
      alert("User updated successfully");
      navigate("/users");
    } catch {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <h2>Loading user...</h2>;

  return (
    <div className="container">

      <h1>Edit User</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
        <input name="lastName" value={form.lastName} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="phone" value={form.phone} onChange={handleChange} />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

    </div>
  );
}

export default EditUser;