import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    controllers : [BooksController],
    providers : [BooksService],
    imports:[TypeOrmModule.forFeature([BookEntity])]
})
export class BooksModule {}
