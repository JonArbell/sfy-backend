import { AuthProvider } from "../../prisma/generated/prisma/enums";

export interface MyAccountResponseDTO {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  icon: string | null;
  provider: AuthProvider;
  createdAt: Date;
  updatedAt: Date;
}
