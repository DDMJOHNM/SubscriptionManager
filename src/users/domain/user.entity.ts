export interface User {
  id: string| null;
  firstName: string;
  middleName: string;
  familyName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isActive: boolean;
  isDeleted: boolean;
}
