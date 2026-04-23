import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/UserList.css"

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const filteredUsers = users
    .filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((user) =>
      role ? user.role?.toLowerCase() === role.toLowerCase() : true
    );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
  <div className="container">

    <div className="header">
      <h1>User List</h1>
      <button onClick={() => navigate("/users/add")}>
        Add User
      </button>
    </div>

    <div className="filters">
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>

    {filteredUsers.map((user) => (
      <div key={user.id} className="card">

        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>

        <div className="actions">
          <button className="view" onClick={() => navigate(`/users/${user.id}`)}>
            View
          </button>

          <button className="edit" onClick={() => navigate(`/users/edit/${user.id}`)}>
            Edit
          </button>

          <button className="delete" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>

      </div>
    ))}

  </div>
);
}

export default UserList;