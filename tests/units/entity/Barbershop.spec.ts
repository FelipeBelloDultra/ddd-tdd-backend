import { faker } from "@faker-js/faker";
import { Barbershop } from "~/domain/entity/Barbershop";

describe("Barbershop.ts", () => {
  it("should create Barbershop instance", () => {
    const barbershop = Barbershop.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(barbershop).toBeInstanceOf(Barbershop);
  });
});
