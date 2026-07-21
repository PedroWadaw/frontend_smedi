import { z } from "zod";

export const registerStepOneSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),

  email: z
    .string()
    .min(1, "Email wajib diisi")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Harus menggunakan @gmail.com",
    }),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
});