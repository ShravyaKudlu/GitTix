import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("Allows authenticated users to create an order", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin()) // Ensure `global.signin()` provides a valid auth token or cookie
    .send({ ticketId: new mongoose.Types.ObjectId() })
    .expect(404);
});

it("requires an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "efjnweofn",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  //console.log(ticket.id);
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  // Create a new ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert1",
    price: 200,
  });
  await ticket.save();
  // console.log(`Created ticket with ID: ${ticket.id}`);

  // Make a request to reserve the ticket
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  // Create a new ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert1",
    price: 200,
  });
  await ticket.save();
  // console.log(`Created ticket with ID: ${ticket.id}`);

  // Make a request to reserve the ticket
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
