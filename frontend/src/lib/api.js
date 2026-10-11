import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// ---- Public ----
export async function createLead(payload) {
  const { data } = await api.post("/leads", payload);
  return data;
}

// ---- Admin ----
export function adminHeaders(token) {
  return { headers: { "X-Admin-Token": token } };
}

export async function verifyAdmin(token) {
  const { data } = await api.get("/admin/verify", adminHeaders(token));
  return data;
}

export async function fetchStats(token) {
  const { data } = await api.get("/admin/stats", adminHeaders(token));
  return data;
}

export async function fetchLeads(token, { search = "", status = "" } = {}) {
  const params = {};
  if (search) params.search = search;
  if (status) params.status = status;
  const { data } = await api.get("/admin/leads", {
    ...adminHeaders(token),
    params,
  });
  return data;
}

export async function updateLead(token, id, body) {
  const { data } = await api.patch(`/admin/leads/${id}`, body, adminHeaders(token));
  return data;
}

export async function deleteLead(token, id) {
  const { data } = await api.delete(`/admin/leads/${id}`, adminHeaders(token));
  return data;
}

export function exportCsvUrl() {
  return `${API}/admin/leads/export`;
}
