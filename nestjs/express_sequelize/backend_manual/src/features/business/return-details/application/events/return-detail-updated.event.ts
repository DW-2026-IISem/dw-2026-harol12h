export class ReturnDetailUpdatedEvent {
  constructor(
    public readonly id: number,
    public readonly returnId: number,
    public readonly productId: number,
    public readonly quantity: number,
    public readonly reason: string,
    public readonly updatedAt: Date,
  ) {}
}
