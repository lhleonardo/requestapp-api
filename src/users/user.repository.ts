import { EntityRepository, Repository } from 'typeorm';
import CreateUserDTO from './dtos/create-user.dto';
import User, { Role } from './user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUser(
    { name, email, password }: CreateUserDTO,
    role: Role,
  ): Promise<User> {
    const createdUser = this.create({
      name,
      email,
      password,
      role,
    });

    return await this.save(createdUser);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const response = await this.findOne({ where: { email } });

    return response;
  }
}

export default UserRepository;
