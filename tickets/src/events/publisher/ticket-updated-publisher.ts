import { Publisher, Subjects, TicketUpdatedEvent } from "@skgtick/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
