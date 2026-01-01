import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/entries"
});

export const getAllEntries = () => api.get("/");
export const getEntryByTitle = (title) => api.get(`/${title}`);
export const createEntry = (data) => api.post("/", data);
export const updateEntry = (title, data) => api.put(`/${title}`, data);
export const getRandomEntry = () => api.get("/random");
export const searchEntries = (q) => api.get(`/search?q=${q}`);
export const deleteEntry = (title) => api.delete(`/${title}`);