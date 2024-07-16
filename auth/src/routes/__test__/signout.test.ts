import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  // Sign out the user
  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  // Log headers to inspect them
  // console.log("Headers:", response.headers["set-cookie"]);
  expect(response.headers["set-cookie"]).toBeDefined();
  expect(response.headers["set-cookie"][0]).toMatch(/session=;/);
});
