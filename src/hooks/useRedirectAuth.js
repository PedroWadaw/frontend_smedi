import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useRedirectAuth(tokenFromProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let token = tokenFromProps;

        if (token) {
          localStorage.setItem("token", token);
        } else {
          token = localStorage.getItem("token");
        }

        if (!token) {
          window.location.href = "/login";
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res = await api.get("/getMe");
        const userData = res.data;

        setUser(userData);

        if (userData.status === "verify") {
          window.location.href = "/create-profile-member";
          return;
        } else if (userData.status === "active") {
          window.location.href = "/dashboard";
          return;
        }

      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [tokenFromProps]);

  return { user, loading };
}