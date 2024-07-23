import { Publisher, OrderCreatedEvent, Subjects } from "@skgtick/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
