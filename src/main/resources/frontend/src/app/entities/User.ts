import { } from './Address';
import { Address } from './Address';
import { Payment } from './Payment';
import { UserRole } from './UserRole';
export class User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: Address;
  username?: string;
  phone?: string;
  creationDate?: Date;
  updatedDate?: Date;
  ratings?: number;
  payment?: Payment;
  userRoles?: Set<UserRole>;
}
