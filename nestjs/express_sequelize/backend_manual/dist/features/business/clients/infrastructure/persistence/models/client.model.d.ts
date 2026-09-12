import { Model } from 'sequelize-typescript';
import { Status } from '../../../../../../common/enums/status.enum.js';
export declare class ClientModel extends Model {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    password: string | null;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
