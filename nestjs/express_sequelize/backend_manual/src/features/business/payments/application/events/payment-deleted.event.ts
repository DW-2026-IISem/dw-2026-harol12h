export class PaymentDeletedEvent {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
  ) {}
}
