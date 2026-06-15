import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRegistrations } from "../services/events";

function SkeletonRow() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-center gap-4">
      <div className="w-16 h-12 rounded-xl bg-gray-100 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded animate-pulse w-3/5" />
        <div className="h-3.5 bg-gray-100 rounded animate-pulse w-2/5" />
      </div>
      <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse shrink-0" />
    </div>
  );
}

export default function MyRegistrations() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getMyRegistrations();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load your registrations. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

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

  const isUpcoming = (dateStr) => {
    if (!dateStr) return false;
    try {
      return new Date(dateStr) >= new Date();
    } catch {
      return false;
    }
  };

  const upcomingCount = events.filter((e) => isUpcoming(e.date)).length;
  const pastCount = events.length - upcomingCount;

  const STATS = [
    {
      label: "Total",
      value: events.length,
      color: "text-indigo-600 bg-indigo-50",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      label: "Upcoming",
      value: upcomingCount,
      color: "text-emerald-600 bg-emerald-50",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Attended",
      value: pastCount,
      color: "text-gray-500 bg-gray-100",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

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
    <div className="min-h-screen bg-[#f8f9fc]">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
              My Registrations
            </h1>
            <p className="text-gray-500 text-sm">Events you've signed up to attend</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="hidden sm:flex h-9 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors items-center gap-1.5 shrink-0 shadow-sm shadow-indigo-200"
          >
            Browse Events
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-7">
            {STATS.map(({ label, value, color, icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                  {icon}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-semibold text-gray-900 leading-none">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 h-9 px-5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && events.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-20 sm:py-28 text-center px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">No registrations yet</h3>
            <p className="text-gray-500 text-sm max-w-[280px] leading-relaxed mb-6">
              You haven't registered for any events. Browse upcoming events to get started.
            </p>
            <button
              onClick={() => navigate("/")}
              className="h-9 px-5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-200"
            >
              Browse Events
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        {/* Registrations list */}
        {!loading && !error && events.length > 0 && (
          <>
            <p className="text-xs text-gray-400 mb-4">
              {events.length} registration{events.length !== 1 ? "s" : ""}
            </p>

            <div className="space-y-3">
              {events.map((event) => {
                const upcoming = isUpcoming(event.date);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/60 transition-all duration-200 overflow-hidden"
                  >
                    <div
                      className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer group"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      {/* Color accent */}
                      <div
                        className="w-1.5 self-stretch rounded-full shrink-0"
                        style={{
                          background: upcoming
                            ? "linear-gradient(to bottom, #4f46e5, #9333ea)"
                            : "#e2e8f0",
                        }}
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors truncate mb-1">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(event.date)}
                              </span>
                              <span className="hidden sm:flex items-center gap-1">
                                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-full border hidden sm:inline-flex items-center gap-1 ${upcoming
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-gray-100 text-gray-500 border-gray-200"
                                }`}
                            >
                              {upcoming ? (
                                <>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Upcoming
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Past
                                </>
                              )}
                            </span>
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-gray-100 px-4 sm:px-5 py-2.5 flex items-center justify-between bg-gray-50/50">
                      <span className="text-xs text-gray-400">
                        {upcoming ? "Registered · Upcoming event" : "Attended"}
                      </span>
                      <button
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                      >
                        View details →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile browse button */}
            <button
              onClick={() => navigate("/")}
              className="sm:hidden w-full mt-5 h-10 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
            >
              Browse more events
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-gray-900 text-sm">Eventus</span>
          <p className="text-xs text-gray-400">© 2026 Eventus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}