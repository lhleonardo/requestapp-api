import { ConflictException, Injectable } from '@nestjs/common';
import { HashProvider } from 'src/providers/hash';
import CreateUserDTO from '../dtos/create-user.dto';
import User, { Role } from '../user.entity';
import UserRepository from '../user.repository';

@Injectable()
export class ReviewerService {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  public async getAll(): Promise<User[]> {
    const users = await this.repository.find({
      where: { role: Role.reviewer },
    });

    return users;
  }

  public async createUser({
    email,
    name,
    password,
  }: CreateUserDTO): Promise<User> {
    // busca pelo e-mail
    const existUserUsingEmail = await this.repository.findOne({
      where: { email },
    });

    if (existUserUsingEmail) {
      throw new ConflictException('Endereço de email já está em uso');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const admin = await this.repository.createUser(
      {
        name,
        email,
        password: passwordHashed,
      },
      Role.reviewer,
    );

    return admin;
  }
}
