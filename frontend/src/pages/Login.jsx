import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            {/* Background Blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

            {/* Card */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-10">

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

                    <p className="text-slate-500 mt-1 text-sm text-center">
                        Register and manage events effortlessly.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
                    >
                        Sign In
                    </button>

                </form>

                <p className="mt-6 text-center text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium hover:text-indigo-700"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}