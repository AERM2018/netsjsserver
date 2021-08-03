import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
    controllers : [AuthorsController],
    providers : [AuthorsService],
    imports : [TypeOrmModule.forFeature([AuthorEntity])]
})
export class AuthorsModule {}
