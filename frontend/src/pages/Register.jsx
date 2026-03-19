import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-darkBg">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1C1F2B] p-10 rounded-xl shadow-xl w-96 border border-neonGreen"
      >
        <h2 className="text-3xl text-neonGreen font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-neonGreen bg-darkBg text-white focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-neonGreen bg-darkBg text-white focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-neonGreen bg-darkBg text-white focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-submit hover:bg-gradient-submit rounded-lg text-black font-bold transition-all"
        >
          Register
        </button>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-neonGreen hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
