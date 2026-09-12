import { Model } from 'sequelize-typescript';
import { ClientModel } from '../../../../clients/infrastructure/persistence/models/client.model.js';
export declare class SaleModel extends Model {
    id: number;
    clientId: number;
    amount: number;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    client: ClientModel;
}
