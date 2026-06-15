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

    const token = localStorage.getItem("access");

    const response = await api.post(
        `/events/${id}/register/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getMyRegistrations = async () => {

    const token = localStorage.getItem("access");

    const response = await api.get(
        "/my-registrations/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};