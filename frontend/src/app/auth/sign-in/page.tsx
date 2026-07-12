"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Send a POST request to the backend NestJS endpoint
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
        role,
      });
      
      const { access_token, user } = response.data;
      
      // Update global auth state
      login({
        id: user.id || 'mock-id',
        name: user.name || 'System User',
        role: user.role,
        token: access_token,
      });

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Sign-in error", err);
      let errorMessage = "Invalid credentials.\nAccount locked after 5 failed attempts.";
      if (err.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
          errorMessage = err.response.data.message.join("\n");
        } else if (typeof err.response.data.message === 'string') {
          errorMessage = err.response.data.message;
        }
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="flex w-full min-h-screen font-sans">
      {/* Left Panel */}
      <aside
        className="hidden lg:flex lg:w-[45%] bg-brand-gray flex-col justify-between p-12 lg:p-16 border-r border-gray-400"
        data-purpose="branding-sidebar"
      >
        <div>
          {/* Logo and Brand */}
          <div className="mb-16">
            <div className="w-12 h-12 bg-brand-gold logo-texture border-2 border-brand-orange rounded-sm mb-4"></div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">TransitOps</h1>
            <p className="text-gray-600 text-xl mt-1">Smart Transport Operations Platform</p>
          </div>
          {/* Role List */}
          <div className="mt-24">
            <h2 className="text-2xl text-gray-800 mb-4">One login, four roles:</h2>
            <ul className="space-y-3 text-xl text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-orange mr-3"></span>
                Fleet Manager
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-orange mr-3"></span>
                Dispatcher
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-orange mr-3"></span>
                Safety Officer
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-orange mr-3"></span>
                Financial Analyst
              </li>
            </ul>
          </div>
        </div>
        {/* Footer */}
        <div className="text-gray-500 text-sm tracking-widest uppercase">
          TRANSITOPS © 2026 • RBAC ENABLED
        </div>
      </aside>

      {/* Right Panel */}
      <main
        className="w-full lg:w-[55%] bg-brand-dark flex items-center justify-center relative p-8"
        data-purpose="login-area"
      >
        {/* Error State Tooltip */}
        {error && (
          <div
            className="hidden lg:block absolute top-32 right-8 w-56 p-4 border border-brand-red border-dashed rounded-lg text-brand-red"
            data-purpose="error-tooltip"
          >
            <p className="text-sm font-semibold mb-1">Error state</p>
            <p className="text-base flex items-start">
              <svg
                className="w-4 h-4 mr-2 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <span>
                {error.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
            </p>
          </div>
        )}

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl text-gray-100 font-bold mb-1">Sign in to your account</h2>
            <p className="text-gray-400 text-lg">Enter your credentials to continue</p>
          </div>

          {/* Sign In Form */}
          <form className="space-y-5" data-purpose="signin-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                className="block text-gray-400 text-sm uppercase tracking-wide mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full bg-transparent border border-gray-600 rounded-md py-2 px-3 text-gray-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-sans text-xl"
                id="email"
                name="email"
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-gray-400 text-sm uppercase tracking-wide mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full bg-transparent border border-gray-600 rounded-md py-2 px-3 text-gray-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-sans text-xl"
                id="password"
                name="password"
                required
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label
                className="block text-gray-400 text-sm uppercase tracking-wide mb-1"
                htmlFor="role"
              >
                Role (RBAC)
              </label>
              <select
                className="w-full bg-transparent border border-gray-600 rounded-md py-2 px-3 text-gray-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-sans text-xl appearance-none"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat, repeat",
                  backgroundPosition: "right .7em top 50%, 0 0",
                  backgroundSize: ".65em auto, 100%",
                }}
              >
                <option value="" disabled>Select the role</option>
                <option value="FLEET_MANAGER">Fleet Manager</option>
                <option value="DRIVER">Dispatcher</option>
                <option value="SAFETY_OFFICER">Safety Officer</option>
                <option value="FINANCIAL_ANALYST">Financial Analyst</option>
              </select>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-6 mb-6">
              <div className="flex items-center">
                <input
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-600 bg-transparent text-brand-orange focus:ring-brand-orange"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-gray-300 text-lg" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <div className="text-lg">
                <a className="text-brand-blue hover:text-blue-300" href="#">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-black bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange focus:ring-offset-brand-dark transition-colors"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-12 border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm mb-2">Access is scoped by role after login:</p>
            <ul className="text-gray-500 text-sm space-y-1">
              <li>• Fleet Manager → Fleet, Maintenance</li>
              <li>• Dispatcher → Dashboard, Trips</li>
              <li>• Safety Officer → Drivers, Compliance</li>
              <li>• Financial Analyst → Fuel &amp; Expenses, Analytics</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
