import { z } from "zod";

export const registerOrganizationSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),

  ketua_organisasi: z.string().min(1, "Ketua wajib diisi"),

  no_telepon: z
    .string()
    .min(8, "No telepon tidak valid"),

  jumlah_member: z
    .string()
    .min(1, "Jumlah anggota wajib diisi"),

  kode_organisasi: z
    .string()
    .min(3, "Kode organisasi minimal 3 karakter"),
});