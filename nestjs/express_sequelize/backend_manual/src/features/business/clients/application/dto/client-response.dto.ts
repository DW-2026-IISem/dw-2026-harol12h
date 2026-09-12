import { Status } from '../../../../../common/enums/status.enum.js';

export class ClientResponseDto {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
