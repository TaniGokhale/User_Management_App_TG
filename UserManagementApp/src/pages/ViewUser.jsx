import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ViewUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    } catch {
      setError("Failed to load user");
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>User Details</h1>

      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>

      <button onClick={() => navigate("/users")}>Back</button>
    </div>
  );
}

export default ViewUser;