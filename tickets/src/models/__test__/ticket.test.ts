import { Ticket } from "../ticket";
import request from "supertest";

it("impliments optamistic concurrency control", async () => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  //Save the ticket to the database
  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make two seperate changes to the ticket we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });
  //save the first fetch ticket
  await firstInstance!.save();

  //save the second fetch ticket and expect an error
  await secondInstance!.save();
});
