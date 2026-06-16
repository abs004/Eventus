import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/events";

function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="h-1.5 bg-gray-100 dark:bg-slate-700 animate-pulse" />
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded-full animate-pulse w-20" />
                <div className="h-5 bg-gray-100 dark:bg-slate-700 rounded animate-pulse w-4/5" />
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded animate-pulse w-3/5" />
                <div className="pt-2 space-y-2">
                    <div className="h-3.5 bg-gray-100 dark:bg-slate-700 rounded animate-pulse w-2/5" />
                    <div className="h-3.5 bg-gray-100 dark:bg-slate-700 rounded animate-pulse w-1/3" />
                </div>
                <div className="pt-4 flex items-center justify-end border-t border-gray-100 dark:border-slate-700">
                    <div className="h-8 w-28 bg-gray-100 dark:bg-slate-700 rounded-lg animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export default function Events() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (err) {
                setError("Failed to load events. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filtered = events.filter((event) => {
        const q = searchQuery.toLowerCase();

        if (error) {
            return (
                <div className="flex justify-center py-20">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                        {error}
                    </div>
                </div>
            );
        }

        return (
            !q ||
            event.title?.toLowerCase().includes(q) ||
            event.location?.toLowerCase().includes(q) ||
            event.description?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-900">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                {/* Hero */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800 rounded-full px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-4">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                        </svg>
                        {loading ? "Loading..." : `${events.length} events available`}
                    </div>
                    <h1 className="text-[2rem] sm:text-[2.4rem] font-semibold text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-3">
                        Discover Events<br />
                        <span className="text-indigo-600 dark:text-indigo-400">happening near you</span>
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                        Find and register for exciting events — conferences, workshops, meetups, and more.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-7 flex items-center gap-3">
                    <div className="relative flex-1 max-w-lg">
                        <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search events, locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition-all shadow-sm hover:border-gray-300 dark:hover:border-slate-600"
                        />
                    </div>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="h-10 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear
                        </button>
                    )}
                </div>

                {/* Results count */}
                {!loading && !error && (
                    <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">
                        {filtered.length === events.length
                            ? `Showing all ${filtered.length} events`
                            : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} found`}
                    </p>
                )}

                {/* Error state */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-red-300 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{error}</h3>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 h-9 px-5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Loading skeletons */}
                {loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Empty search state */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-gray-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">No events found</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-sm max-w-[280px] leading-relaxed">
                            Try adjusting your search terms.
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-5 h-9 px-5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Events grid */}
                {!loading && !error && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}

            </main>


        </div>
    );
}