import { queries } from "@infra/database/queries";

export async function teardown() {
  await queries.appointment.deleteMany();
  await queries.client.deleteMany();
  await queries.employee.deleteMany();
  await queries.barbershop.deleteMany();

  await queries.$disconnect();
}
