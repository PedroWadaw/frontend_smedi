// hooks/useUpdateAccount.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAccountSchema } from "../schemas/updateAccountSchema";
import axios from "axios";
import { api } from "../services/api";

export function useUpdateAccount(defaultValues) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateAccountSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return { success: false };
    }

    try {
      await api.post("/auth/update-account", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.href = "/account";
      return { success: true };
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;

        Object.keys(validationErrors).forEach((key) => {
          setError(key, {
            type: "server",
            message: validationErrors[key][0],
          });
        });
      }

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