export class PaymentUpdatedEvent {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly method: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly updatedAt: Date,
  ) {}
}
