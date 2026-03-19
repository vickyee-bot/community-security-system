import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-darkBg">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/90 p-10 rounded-2xl shadow-xl w-96 border border-neonGreen/50 backdrop-blur-sm"
      >
        <h2 className="text-3xl text-neonGreen font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-neonGreen bg-darkBg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-neonGreen bg-darkBg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-submit hover:bg-gradient-submit rounded-lg text-black font-bold transition-all"
        >
          Login
        </button>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-neonGreen hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}
