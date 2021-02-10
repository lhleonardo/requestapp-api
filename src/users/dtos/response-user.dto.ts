import { Role } from '../user.entity';

export default interface ResponseUserDTO {
  name: string;
  email: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;

  role: Role;
}
