import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useDataDev(tokenFromProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let token = tokenFromProps;

        token = localStorage.getItem("token");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res = await api.get("/merchant/me");
        const userData = res.data

        setUser(userData);

      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login-dev";
        }
      }
      finally {
          setLoading(false);
        }
      };

      init();
    }, [tokenFromProps]);

  return { user, loading };
}