import { z } from "zod/v4";
import { SchoolClasses } from "@/constants/schoolClasses";

export const RegistrationSchema = z.object({
  name: z.string().trim().min(1, { error: "Nama lengkap wajib diisi." }),
  preferedName: z
    .string()
    .trim()
    .transform((val) => val === "" ? null : val)
    .nullable(),
  phone: z
    .string()
    .regex(/^08\d{8,11}$/, {
      message: "Nomor telepon harus diawali dengan 08 dan terdiri dari 10-13 digit angka.",
    }),
  major: z.enum(
    SchoolClasses.map((schoolClass) => `${schoolClass.major}`) as [string, ...string[]],
    { error: "Jurusan wajib dipilih." }
  ),
  grade: z.enum(["X", "XI", "XII", "XIII"], {
    error: "Kelas wajib dipilih.",
  }),
  gradeParallel: z.number().nullable(),
  reasonToJoin: z
    .string()
    .trim()
    .min(1, { error: "Alasan masuk wajib diisi." }),
});
