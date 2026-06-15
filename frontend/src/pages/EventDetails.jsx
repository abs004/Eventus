import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, registerForEvent } from "../services/events";

export default function EventDetails() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");
    const [registering, setRegistering] = useState(false);

    useEffect(() => {

        const fetchEvent = async () => {
            try {
                const data = await getEvent(id);
                setEvent(data);
            } catch (error) {
                console.error(error);
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

            setMessage("Successfully registered for this event!");

        } catch (error) {

            if (error.response?.data?.detail) {
                setMessage(error.response.data.detail);
            } else if (error.response?.data?.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("Registration failed");
            }

        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-slate-500">Loading event...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                {/* Gradient Header */}
                <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                <div className="p-8">

                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 mb-6 text-slate-600">

                        <div>
                            📅 {event.date}
                        </div>

                        <div>
                            📍 {event.location}
                        </div>

                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8">
                        {event.description}
                    </p>

                    {message && (
                        <div
                            className={`mb-5 p-4 rounded-xl border ${
                                message.toLowerCase().includes("success")
                                    ? "bg-green-50 border-green-200 text-green-700"
                                    : "bg-red-50 border-red-200 text-red-700"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        onClick={handleRegister}
                        disabled={registering}
                        className="px-8 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition disabled:opacity-50"
                    >
                        {registering
                            ? "Registering..."
                            : "Register Now"}
                    </button>

                </div>

            </div>

        </div>
    );
}