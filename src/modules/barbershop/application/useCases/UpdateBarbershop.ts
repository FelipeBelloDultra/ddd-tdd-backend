import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { AvatarUrl } from "@modules/barbershop/domain/barbershop/AvatarUrl";
import { Neighborhood } from "@modules/barbershop/domain/barbershop/Neighborhood";
import { Phone } from "@modules/barbershop/domain/barbershop/Phone";
import { Street } from "@modules/barbershop/domain/barbershop/Street";
import { StreetNumber } from "@modules/barbershop/domain/barbershop/StreetNumber";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";
import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

interface IUpdateBarbershop {
  id: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
}

type IUpdateBarbershopResponse = Either<BarbershopNotFoundError, Barbershop>;

export class UpdateBarbershop {
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
  }

  public async execute(
    data: IUpdateBarbershop
  ): Promise<IUpdateBarbershopResponse> {
    const findedbyId = await this.barbershopRepository.findById(data.id);

    if (!findedbyId) return left(new BarbershopNotFoundError());

    const avatarUrl = data.avatarUrl
      ? (AvatarUrl.create(data.avatarUrl).value as AvatarUrl)
      : undefined;

    const neighborhood = data.neighborhood
      ? (Neighborhood.create(data.neighborhood).value as Neighborhood)
      : undefined;

    const number = data.number
      ? (StreetNumber.create(data.number).value as StreetNumber)
      : undefined;

    const street = data.street
      ? (Street.create(data.street).value as Street)
      : undefined;

    const phone = data.phone ? Phone.create(data.phone) : undefined;
    if (phone?.isLeft()) {
      return left(phone.value);
    }

    const barbershop = findedbyId.update({
      avatarUrl,
      neighborhood,
      number,
      phone: phone ? (phone.value as Phone) : undefined,
      street,
    });

    const updatedUser = await this.barbershopRepository.update(
      barbershop.value as Barbershop
    );

    return right(updatedUser);
  }
}
