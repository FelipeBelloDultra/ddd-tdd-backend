import { faker } from "@faker-js/faker";

interface IMakePassword {
  length?: number;
}

export class BaseFactory {
  static makeUuid(): string {
    return faker.string.uuid();
  }

  static makeEmail(): string {
    const email = faker.internet.email().trim().toLowerCase();

    return email;
  }

  static makeFullName(): string {
    return faker.person.fullName();
  }

  static makeAvatar(): string {
    return faker.internet.avatar();
  }

  static makePassword(options?: IMakePassword): string {
    return faker.internet.password({ length: options?.length || 15 });
  }

  static makePhone(format = "+55 (99) 99999-9999"): string {
    return faker.phone.number(format);
  }

  static makeAddressNeighborhood(): string {
    return faker.location.streetAddress();
  }

  static makeAddressStreet(): string {
    return faker.location.street();
  }

  static makeAddressNumber(): string {
    return faker.location.buildingNumber();
  }
}
