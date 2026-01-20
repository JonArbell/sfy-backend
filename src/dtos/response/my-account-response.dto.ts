export interface MyAccountResponseDTO {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
}
