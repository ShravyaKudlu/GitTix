import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@skgtick/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // If no ticket, throw error
    if (!ticket) {
      throw new Error("ticket Not Found");
    }
    //mark the ticket as being reserved by setting it's orderId property
    ticket.set({ orderId: data.id });
    //save the ticket
    await ticket.save();
    //publish an event to say we incremented the version
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    //ack message
    msg.ack();
  }
}
