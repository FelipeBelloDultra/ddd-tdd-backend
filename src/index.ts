import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { CreateBarbershop } from "@modules/barbershop/application/useCases/CreateBarbershop";

new CreateBarbershop(new FakeRepositoryFactory())
  .execute({
    name: "Fake Barbershop",
    email: "fake@fakebarbershop.com",
    password: "fakebarbershop",
  })
  .then(console.log)
  .catch(console.log);
