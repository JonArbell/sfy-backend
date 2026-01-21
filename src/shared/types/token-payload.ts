import { AuthProvider } from "../../prisma/generated/prisma/enums";

export interface TokenPayload {
  id: string;
  type: "access" | "refresh";
  username: string;
  provider: AuthProvider;
}
