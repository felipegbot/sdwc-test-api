import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: User, password: string): Promise<User> {
    return await this.userRepository.create(createUserDto, password);
  }
}
