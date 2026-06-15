import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { loginUser } from "../services/auth";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            const data = await loginUser({
                username: formData.username,
                password: formData.password,
            });

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("username", formData.username);

            navigate("/");

        } catch (err) {

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Unable to sign in. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-6">

            {/* Background Blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/40 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/40 rounded-full blur-3xl opacity-40"></div>

            {/* Card */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 p-10">

                {/* Logo + Brand */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={logo}
                        alt="Eventus logo"
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                            objectPosition: "center",
                            marginBottom: "-12px",
                        }}
                    />

                    <h1
                        className="text-2xl font-bold tracking-tight"
                        style={{
                            background: "linear-gradient(to right, #4f46e5, #9333ea)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Eventus
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm text-center">
                        Welcome to Eventus
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <p className="mt-6 text-center text-slate-500 dark:text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}