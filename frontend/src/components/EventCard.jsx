import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">

            <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

            <div className="p-6">

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {event.title}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                    {event.description}
                </p>

                <div className="space-y-2 mb-5">

                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        📅 {event.date}
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        📍 {event.location}
                    </div>

                </div>

                <Link
                    to={`/events/${event.id}`}
                    className="block text-center w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
                >
                    View Details
                </Link>

            </div>
        </div>
    );
}