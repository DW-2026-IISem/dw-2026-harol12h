export class PaymentCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly method: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: Date,
  ) {}
}
