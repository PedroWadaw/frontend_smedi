import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../schemas/forgetPasswordSchema";
import { supabase } from "../services/supabase";
import { api } from "../services/api";

export function useResetPassword() {
  const [session, setSession] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      resetPasswordSchema
    ),
  });

  useEffect(() => {
    supabase.auth.getSession().then(
      ({ data }) => {
        setSession(data.session);
      }
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      const email =
        session?.user?.email;

      if (!email) {
        setError("root", {
          type: "manual",
          message: "Session invalid",
        });

        return { success: false };
      }

      await api.post(
        "/auth/reset-password",
        {
          email,
          password: data.password,
          password_confirmation:
            data.password_confirmation,
        }
      );

      return { success: true };

    } catch {
      setError("root", {
        type: "manual",
        message: "Gagal reset password",
      });

      return { success: false };
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading: isSubmitting,
    onSubmit,
  };
}