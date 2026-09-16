export class ReturnCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly date: Date,
    public readonly reason: string,
    public readonly total: number,
    public readonly status: string,
    public readonly createdAt: Date,
  ) {}
}
