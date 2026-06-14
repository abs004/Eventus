import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <img
                    src={logo}
                    alt="Eventus"
                     className="w-56 object-contain"
                />
                <Link
                    to="/"
                    className="text-2xl font-bold text-indigo-600"
                >
                    Eventus
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-slate-700 hover:text-indigo-600"
                    >
                        Events
                    </Link>

                    <Link
                        to="/my-registrations"
                        className="text-slate-700 hover:text-indigo-600"
                    >
                        My Registrations
                    </Link>

                    <button
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
}