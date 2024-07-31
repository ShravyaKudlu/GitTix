import { Subjects, Publisher, ExpirationCompleteEvent } from "@skgtick/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
