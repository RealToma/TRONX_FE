import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Replace this with your actual authentication logic
    if (username === "SolAdz" && password === "SolAdz0114") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/manage");
    } else {
      alert("Invalid credentials");
      localStorage.setItem("isAuthenticated", "false");
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-xl">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
