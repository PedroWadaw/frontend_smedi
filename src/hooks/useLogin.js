import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "../schemas/loginUserSchema";
import { api } from "../services/api";

export function useLogin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      const token = res.data.token;
      localStorage.setItem("token", token);

      return { success: true };

    } catch (err) {
      if (err.response?.status === 422) {
        const backendErrors = err.response.data.errors;

        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field][0],
          });
        });

        return { success: false };
      }

      setError("root", {
        type: "server",
        message: "Terjadi kesalahan, coba lagi",
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
    watch,
    setValue,
  };
}