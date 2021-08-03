import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksController } from './books/books.controller';
import { AuthorsController } from './authors/authors.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { AuthorsService } from './authors/authors.service';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','/imgs'),

    }),
    BooksModule,
    AuthorsModule
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
