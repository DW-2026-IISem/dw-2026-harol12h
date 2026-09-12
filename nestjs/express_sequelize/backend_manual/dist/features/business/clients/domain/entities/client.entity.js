import { Status } from '../../../../../common/enums/status.enum.js';
export class Client {
    static create(arg0) {
        throw new Error('Method not implemented.');
    }
    static reconstitute(arg0) {
        throw new Error('Method not implemented.');
    }
    id;
    name;
    address;
    phone;
    email;
    password;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
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
//# sourceMappingURL=client.entity.js.map