import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerOrganizationSchema } from "../schemas/registerOrganizationSchema";
import { api } from "../services/api";

export function useRegisterOrganization() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerOrganizationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/organizations/register", data);
      return { success: true };
    } catch (err) {
      if (err.response?.status === 422) {
        const backendErrors = err.response.data.errors;

        // mapping error backend → RHF
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
  };
}