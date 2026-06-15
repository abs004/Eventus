import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    const formatDate = (dateStr) => {
        if (!dateStr) return dateStr;
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-200 flex flex-col group">

            {/* Gradient accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 shrink-0" />

            <div className="p-5 flex flex-col flex-1">

                <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {event.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {event.description}
                </p>

                <div className="space-y-1.5 mb-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                    <Link
                        to={`/events/${event.id}`}
                        className="h-8 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-200/60"
                    >
                        View Details
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}