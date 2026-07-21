import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfileSchema } from "../schemas/updateProfileSchema";

import { api } from "../services/api";

export function useUpdateProfile(defaultValues) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");


      formData.append("alamat", data.alamat);

      formData.append("no_telepon", data.no_telepon);

      if (
        data.foto instanceof File
      ) {
        formData.append(
          "foto",
          data.foto
        );
      }

      const res = await api.post("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        user: res.data.user,
      };
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

      return {
        success: false,
      };
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