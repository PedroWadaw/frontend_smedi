import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import UpdateProfileForm from "../../Components/UpdateProfileForm";

export default function UpdateProfilePage() {
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
        }

        setDefaultValues({
          alamat: user?.alamat || "",
          no_telepon: user?.no_telepon || "",
          foto: user?.foto || null,
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
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!defaultValues) {
    return <p>Data user tidak ditemukan</p>;
  }

  return <UpdateProfileForm defaultValues={defaultValues} />;
}