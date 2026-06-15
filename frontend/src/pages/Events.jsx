import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/events";

export default function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-10 text-center">

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Discover Events
        </h1>

        <p className="text-slate-500">
          Find and register for exciting events around you.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}

      </div>

    </div>
  );
}