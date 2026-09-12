import { Status } from '../../../../../common/enums/status.enum.js';

export interface ClientProps {
  id?: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  password?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client {
  static create(arg0: { name: string; address: string | undefined; phone: string | undefined; email: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  static reconstitute(arg0: { id: number; name: string; address: string | undefined; phone: string | undefined; email: string | undefined; password: string | undefined; status: Status; createdAt: Date; updatedAt: Date; }): Client {
    throw new Error('Method not implemented.');
  }
  id?: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  password?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: ClientProps) {
    this.id = props.id;
    this.name = props.name;
    this.address = props.address;
    this.phone = props.phone;
    this.email = props.email;
    this.password = props.password;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
