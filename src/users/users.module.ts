import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers:[UsersController],
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {}
