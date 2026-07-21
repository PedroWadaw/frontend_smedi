import React, { useEffect, useState } from "react";
import { useUpdateAccount } from "../../hooks/useUpdateAccount";
import UpdateAccountForm from "../../Components/UpdateAccountForm";
import { api } from "../../services/api";

export default function UpdateAccountPage() {
  const [defaultValues, setDefaultValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await api.get("/getMe", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;

        if (user?.status === "verify") {
          window.location.href = "/create-profile-member";
        } else if (user?.google_id !== null) {
          window.location.href = "/account";
        }



        setDefaultValues({
          nama: user?.nama || "",
          email: user?.email || "",
          password: "",
        });
      } catch (err) {
        console.error("Gagal fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex h-screen bg-gray-black text-white items-center justify-center">Loading...</div>;
  }

  if (!defaultValues) return <p>Data user tidak ditemukan</p>;

  return <UpdateAccountForm defaultValues={defaultValues} />;
}