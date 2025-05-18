import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">🔐 Welcome Back</h2>

        {error && <div className="text-red-200 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-pink-600 font-semibold py-2 rounded-xl hover:bg-pink-100 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
