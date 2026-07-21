import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useDashboardAuth(tokenFromProps) {
  const [user, setUser] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const init = async () => {
      try {
        let token = tokenFromProps;

        token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const [userRes, usageRes] = await Promise.all([
          api.get("/user"),
          api.get("/statistics/last")
        ]);

        setUser(userRes.data.data);
        setUsageData(usageRes.data);

        if (userRes.data.data.status === "verify") {
          window.location.href = "/create-profile-member";
          return;
        }

      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    init();

    intervalId = setInterval(() => {
      init();
    }, 60000);

    return () => clearInterval(intervalId);

  }, [tokenFromProps]);

  return { user, usageData, loading };
}