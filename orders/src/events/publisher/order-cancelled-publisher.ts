import { Subjects, OrderCancelledEvent, Publisher } from "@skgtick/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
