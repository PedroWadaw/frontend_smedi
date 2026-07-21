import { z } from "zod";

export const stepTwoSchema = z.object({
  alamat: z.string().min(1, "Alamat wajib"),
  no_telepon: z.string().min(12, "Minimal 12 karakter"),

  organization_id: z.number().nullable().optional(),
  kode_organisasi: z.string().optional(),

  foto: z.any(),
}).refine((data) => {
  if (data.organization_id && !data.kode_organisasi) {
    return false;
  }
  return true;
}, {
  message: "Kode organisasi wajib diisi",
  path: ["kode_organisasi"],
});