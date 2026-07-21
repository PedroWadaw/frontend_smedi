import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
    .string()
    .min(1, "Email wajib diisi")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Harus menggunakan @gmail.com",
    }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password minimal 8 karakter"),

    password_confirmation: z.string(),
  })
  .refine((data) => {
    return (
      data.password ===
      data.password_confirmation
    );
  }, {
    message: "Password tidak sama",
    path: ["password_confirmation"],
  });