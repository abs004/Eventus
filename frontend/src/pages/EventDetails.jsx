import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, registerForEvent, getMyRegistrations } from "../services/events";


function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                <div className="text-sm font-medium text-gray-900">{value}</div>
            </div>
        </div>
    );
}

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" | "error"
    const [registering, setRegistering] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const [eventData, registrations] = await Promise.all([
                    getEvent(id),
                    getMyRegistrations(),
                ]);

                setEvent(eventData);

                const alreadyRegistered = registrations.some(
                    (event) => event.id === Number(id)
                );

                setIsRegistered(alreadyRegistered);

            } catch (error) {
                setMessage("Failed to load event.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        setMessage("");
        try {
            setRegistering(true);
            await registerForEvent(id);
            setIsRegistered(true);
            setMessageType("success");
            setMessage("You're registered! See you at the event.");
        } catch (error) {
            setMessageType("error");
            if (error.response?.data?.detail) {
                setMessage(error.response.data.detail);
            } else if (error.response?.data?.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("Registration failed. Please try again.");
            }
        } finally {
            setRegistering(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return dateStr;
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fc]">
                {/* Header skeleton */}
                <div className="w-full h-[260px] bg-gray-200 animate-pulse" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-5">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                                <div className="h-5 bg-gray-100 rounded animate-pulse w-1/3" />
                                <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                                <div className="h-4 bg-gray-100 rounded animate-pulse w-4/5" />
                                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/5" />
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                            <div className="h-8 bg-gray-100 rounded animate-pulse w-1/2" />
                            <div className="h-10 bg-gray-100 rounded-xl animate-pulse w-full mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center py-32 text-center px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Event not found</h2>
                <p className="text-gray-500 text-sm mb-6">This event doesn't exist or may have been removed.</p>
                <button
                    onClick={() => navigate("/")}
                    className="h-9 px-5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fc]">

            {/* Banner header */}
            <div className="w-full relative overflow-hidden" style={{ background: "linear-gradient(140deg, #1e1b4b 0%, #312e81 45%, #4c1d95 100%)", minHeight: "200px" }}>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-10 relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to events
                    </button>

                    {isRegistered && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Registered
                        </span>
                    )}

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight max-w-3xl leading-tight">
                        {event.title}
                    </h1>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* About */}
                        <section className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-semibold text-gray-900 mb-4">About this event</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                        </section>

                        {/* Event details */}
                        <section className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="font-semibold text-gray-900 mb-5">Event details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InfoItem
                                    label="Date"
                                    value={formatDate(event.date)}
                                    icon={
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />
                                <InfoItem
                                    label="Location"
                                    value={event.location}
                                    icon={
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    }
                                />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">

                        {/* Registration card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-[72px]">

                            {isRegistered && (
                                <div className="flex items-start gap-2.5 mb-5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                                    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <div className="text-sm font-medium text-emerald-800">You're registered!</div>
                                        <div className="text-xs text-emerald-600 mt-0.5">Check My Registrations for details</div>
                                    </div>
                                </div>
                            )}

                            {message && !isRegistered && (
                                <div
                                    className={`flex items-start gap-2.5 mb-5 rounded-xl px-4 py-3 border text-sm ${messageType === "success"
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                        : "bg-red-50 border-red-200 text-red-700"
                                        }`}
                                >
                                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={
                                            messageType === "success"
                                                ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                : "M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                        } />
                                    </svg>
                                    {message}
                                </div>
                            )}

                            <div className="mb-5">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(event.date)}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.location}
                                </div>
                            </div>

                            {!isRegistered ? (
                                <button
                                    onClick={handleRegister}
                                    disabled={registering}
                                    className="w-full h-11 rounded-xl text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center gap-2"
                                >
                                    {registering ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Registering...
                                        </>
                                    ) : "Register Now"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/my-registrations")}
                                    className="w-full h-11 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    View My Registrations
                                </button>
                            )}

                            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Secure registration
                            </div>
                        </div>

                        {/* Share card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Share this event</h3>
                            <button
                                onClick={handleCopyLink}
                                className="w-full h-9 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-emerald-600">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        Copy link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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