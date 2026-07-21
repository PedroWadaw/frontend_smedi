import { z } from "zod";

export const updateAccountSchema = z.object({
    nama: z.string()
        .min(1, "Nama wajib"),

    email: z.string()
        .email("Email tidak valid"),

    password: z.string()
        .min(8, "Password minimal 8 karakter"),
});