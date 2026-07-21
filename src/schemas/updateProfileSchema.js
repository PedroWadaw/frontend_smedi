import { z } from "zod";

export const updateProfileSchema =
  z.object({

    alamat: z.string()
      .min(1, "Alamat wajib"),

    no_telepon: z.string()
      .min(8, "No telepon tidak valid"),

    foto: z.any().optional(),
  });