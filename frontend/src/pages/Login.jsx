import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            {/* Background Blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

            {/* Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={logo}
                        alt="Eventus"
                        className="w-56 object-contain"
                    />

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                        Eventus
                    </h1>

                    <p className="text-slate-500 mt-2 text-center">
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