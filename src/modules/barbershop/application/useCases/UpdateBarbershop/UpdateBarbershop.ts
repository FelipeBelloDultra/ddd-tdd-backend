import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { Neighborhood } from "@modules/barbershop/domain/barbershop/Neighborhood";
import { Street } from "@modules/barbershop/domain/barbershop/Street";
import { StreetNumber } from "@modules/barbershop/domain/barbershop/StreetNumber";
import { IUpdateBarbershopRepository } from "@modules/barbershop/application/repository/IUpdateBarbershopRepository";
import { IFindByIdBarbershopRepository } from "@modules/barbershop/application/repository/IFindByIdBarbershopRepository";

import { Phone } from "@_shared/domain/Phone";
import { AvatarUrl } from "@_shared/domain/AvatarUrl";

import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

interface Input {
  id: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
}

type Output = Either<BarbershopNotFoundError, Barbershop>;

type IUpdateBarbershopRepositories = IUpdateBarbershopRepository &
  IFindByIdBarbershopRepository;

interface IUpdateBarbershop {
  updateBarbershopRepository: IUpdateBarbershopRepositories;
}

export class UpdateBarbershop implements IUseCase<Input, Output> {
  private readonly updateBarbershopRepository: IUpdateBarbershopRepositories;

  constructor({ updateBarbershopRepository }: IUpdateBarbershop) {
    this.updateBarbershopRepository = updateBarbershopRepository;
  }

  public async execute(data: Input): Promise<Output> {
    const findedbyId = await this.updateBarbershopRepository.findById(data.id);

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

    const updatedUser = await this.updateBarbershopRepository.update(
      barbershop.value as Barbershop
    );

    return right(updatedUser);
  }
}
