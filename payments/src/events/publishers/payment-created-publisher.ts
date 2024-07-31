import { Subjects, Publisher, PaymentCreatedEvent } from "@skgtick/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
