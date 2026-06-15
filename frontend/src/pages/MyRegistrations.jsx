import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getMyRegistrations } from "../services/events";

export default function MyRegistrations() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRegistrations = async () => {
      try {
        const data = await getMyRegistrations();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500">
          Loading registrations...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-10 text-center">

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          My Registrations
        </h1>

        <p className="text-slate-500">
          Events you've registered for.
        </p>

      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">

          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            No registrations yet
          </h3>

          <p className="text-slate-500">
            Browse events and register to see them here.
          </p>

        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}

        </div>

      )}

    </div>
  );
}