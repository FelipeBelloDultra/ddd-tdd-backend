-- CreateTable
CREATE TABLE "Client" (
    "id_client" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "Barbershop" (
    "id_barbershop" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "street" TEXT,
    "neighborhood" TEXT,
    "number" TEXT,
    "phone" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barbershop_pkey" PRIMARY KEY ("id_barbershop")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id_employee" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id_employee")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id_appointment" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_email_key" ON "Barbershop"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_id_appointment_key" ON "Appointment"("id_appointment");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "Barbershop"("id_barbershop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id_employee") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;
