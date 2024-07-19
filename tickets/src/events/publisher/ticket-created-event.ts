import { Publisher, Subjects, TicketCreatedEvent } from "@skgtick/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
