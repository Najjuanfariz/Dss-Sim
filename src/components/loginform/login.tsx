"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
        USER LOGIN
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // ✅
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-2.5 right-3 text-sm text-gray-500"
          >
            {showPassword ? "😎" : "😀"}
          </button>
        </div>

        <div className="flex justify-between items-center text-sm">
          <a href="#" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-primary to-blue-500 text-black rounded-md font-semibold"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
