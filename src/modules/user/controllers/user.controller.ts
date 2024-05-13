import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import ApiError from '@/common/error/entities/api-error.entity';
import { CreateUserService } from '../services/create-user.service';
import { FindOneUserService } from '../services/find-one-user.service';
import { User } from '../user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findOneUserService: FindOneUserService,
  ) {}
  logger = new Logger(UserController.name);

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const emailAlreadyInUse = await this.findOneUserService.findOne({
      key: 'email',
      value: createUserDto.email,
    });

    if (emailAlreadyInUse)
      throw new ApiError('email-already-in-use', 'Email já está em uso', 400);

    const user = new User();
    Object.assign(user, createUserDto);

    const createdUser = await this.createUserService.createUser(
      user,
      createUserDto.password,
    );

    this.logger.log(
      `User ${createdUser.id} created with email ${createdUser.email}`,
    );

    return {
      ok: true,
      user: createdUser,
    };
  }
}
