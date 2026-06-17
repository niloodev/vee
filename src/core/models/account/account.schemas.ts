import { z } from "zod";

export const accountSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  displayName: z.string().min(1, "Nome de exibição é obrigatório"),
  avatar: z.string().default(""),
  defaultGameDir: z.string().default(""),
  defaultRomDir: z.string().default(""),
  defaultEmulator: z.string().default(""),
  mcpEnabled: z.boolean().default(false),
  mcpKey: z.string().default(""),
});
