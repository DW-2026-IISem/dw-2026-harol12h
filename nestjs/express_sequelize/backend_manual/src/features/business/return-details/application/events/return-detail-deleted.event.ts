export class ReturnDetailDeletedEvent {
  constructor(
    public readonly id: number,
    public readonly returnId: number,
  ) {}
}
