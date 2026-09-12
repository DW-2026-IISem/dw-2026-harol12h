export class ClientNotFoundException extends Error {
    constructor(id) {
        super(`Cliente con ID ${id} no encontrado`);
        this.name = 'ClientNotFoundException';
    }
}
//# sourceMappingURL=client-not-found.exception.js.map