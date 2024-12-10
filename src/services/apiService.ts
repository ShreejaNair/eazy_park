import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.API_BASE_URL || "https://eazyparkadminapp.incubermax.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } else if (status >= 400 && status < 500) {
      console.error("Client error:", error.response.data);
    } else {
      console.error("Server error:", error.response.data || "Unexpected error");
    }
    return Promise.reject(error);
  }
);

export const login = async (userId: string, password: string) => {
  return api.post("/FacilityAdmin/Admin/LogInWeb", { userId, password });
};

export const dashboard = async(facilityid:string, token:string, inputdatetime:string) => {
  return api.post("/ReportAPI/Report/GetAdminMISReportWeb", {facilityid, token, inputdatetime})
}

export default api;
