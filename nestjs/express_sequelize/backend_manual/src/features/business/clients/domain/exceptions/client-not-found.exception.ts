export class ClientNotFoundException extends Error {
  constructor(id: number) {
    super(`Cliente con ID ${id} no encontrado`);
    this.name = 'ClientNotFoundException';
  }
}
