import { ConflictException, Injectable } from '@nestjs/common';
import { HashProvider } from 'src/providers/hash';
import CreateUserDTO from './dtos/create-user.dto';
import User, { Role } from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  public async createAdminUser({
    email,
    name,
    password,
  }: CreateUserDTO): Promise<User> {
    const existUserUsingEmail = await this.userRepository.findByEmail(email);

    if (existUserUsingEmail) {
      throw new ConflictException('Endereço de email já está em uso');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const admin = await this.userRepository.createUser(
      {
        name,
        email,
        password: passwordHashed,
      },
      Role.admin,
    );

    return admin;
  }
}
