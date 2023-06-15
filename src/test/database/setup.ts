import { prisma } from "@infra/prisma";

export async function teardown() {
  await prisma.appointment.deleteMany();
  await prisma.client.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.barbershop.deleteMany();

  await prisma.$disconnect();
}
