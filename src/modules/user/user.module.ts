import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeormUserRepository } from './repositories/typeorm/user.repository';
import { CreateUserService, FindOneUserService } from './services';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    CreateUserService,
    FindOneUserService,
    { provide: UserRepository, useClass: TypeormUserRepository },
  ],
  exports: [CreateUserService, FindOneUserService],
})
export class UserModule {}
