import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
   path: path.join(process.cwd(), ".env"),
});

const envSchema = z.object({
   nodeENV: z.enum(["development", "production"]).default("development"),
   port: z.coerce
      .number({
         error: "Port is required",
      })
      .int()
      .positive(),
   clientUrl: z.string({
      error: "Client URL is required.",
   }),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
   console.error("❌ Invalid environment variables:");

   console.error(z.treeifyError(result.error));

   process.exit(1);
}

export const configs = result.data;

export type TEnvType = z.infer<typeof envSchema>;
