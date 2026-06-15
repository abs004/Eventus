import api from "./api";

export const getEvents = async () => {
    const response = await api.get("/events/");
    return response.data;
};

export const getEvent = async (id) => {
    const response = await api.get(`/events/${id}/`);
    return response.data;
};

export const registerForEvent = async (id) => {
    const response = await api.post(
        `/events/${id}/register/`
    );

    return response.data;
};

export const getMyRegistrations = async () => {
    const response = await api.get("/my-registrations/");
    return response.data;
};