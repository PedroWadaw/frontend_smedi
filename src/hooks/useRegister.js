import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStepOneSchema } from "../schemas/registerStepOneSchema";
import { api } from "../services/api";

export function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,       
    setValue,   
  } = useForm({
    resolver: zodResolver(registerStepOneSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      return { success: true, data: res.data };
    } catch (err) {
      if (err.response?.status === 422) {
        const backendErrors = err.response.data.errors;

        Object.keys(backendErrors).forEach((key) => {
          setError(key, {
            type: "server",
            message: backendErrors[key][0],
          });
        });

        return { success: false };
      }

      throw err;
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