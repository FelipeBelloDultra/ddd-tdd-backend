import { FakeBarbershopRepository } from "~/repositories/fakes/FakeBarbershopRepository";
import { CreateBarbershop } from "~/useCases/CreateBarbershop";

new CreateBarbershop(new FakeBarbershopRepository())
  .execute({
    name: "Fake Barbershop",
    email: "fake@fakebarbershop.com",
    password: "fakebarbershop",
  })
  .then(console.log)
  .catch(console.log);
