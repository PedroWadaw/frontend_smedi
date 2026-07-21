import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../schemas/forgetPasswordSchema";
import { supabase } from "../services/supabase";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (!result.success) {
        setError("email", {
          type: "manual",
          message: result.message,
        });
        return { success: false };
      }

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          data.email,
          {
            redirectTo:
              import.meta.env.VITE_REDIRECT_URL,
          }
        );

      if (error) {
        setError("email", {
          type: "manual",
          message: error.message,
        });

        return { success: false };
      }

      return { success: true };

    } catch {
      setError("root", {
        type: "manual",
        message: "Terjadi kesalahan",
      });

      return { success: false };
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading: isSubmitting,
    isValid,
    onSubmit,
  };
}