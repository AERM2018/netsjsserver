import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customImageName } from 'src/utils/customImageName';
import { BookEntity } from './book.entity';
import { BooksService } from './books.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('books')
export class BooksController {

    constructor(private service:BooksService){}

    @Get()
    async getBooks(){
        return await this.service.getAllBooks();
    }

    @Get(':id')
    async getBookById(@Param() params){
        return await this.service.getBookById(params.id)
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
                destination : './imgs',
                filename:customImageName
            })
        })
    )
    async createNewBook(@Body() book:any, @UploadedFile() file){
        try {
            book.cover = file.filename
            const bookJSON = JSON.parse(JSON.stringify(book)) ;
            await this.service.createNewBook(bookJSON );
            
        } catch (error) {
            console.log(error);
            
        }
        return {
            msg : 'Book created successfully'
        }
    }

    @Put(':id')
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
                destination : './imgs',
                filename:customImageName
            })
        })
    )
    async updateBookById(@Param() params, @Body() book:BookEntity, @UploadedFile() file){
        // Borrar imagen antigua para subir la nueva y asignar el nombre de la imagen a la entidad en base de datos
        if(file){
            book.cover = file.filename
            const [bookDB] = await this.service.getBookById(params.id)
            if(fs.existsSync(path.join(__dirname,'../../','imgs'))){
                if(fs.existsSync(path.join(__dirname,'../../','imgs',bookDB.cover))){
                    fs.rmSync(path.join(__dirname,'../../','imgs',bookDB.cover))
                }
            }
        }
        const bookJSON = JSON.parse(JSON.stringify(book))
        bookJSON.author = bookJSON.author.id
        await this.service.updateBook(params.id,JSON.parse(JSON.stringify(book)))
        return {
            msg : 'Book updated successfully'
        }
    }

    @Delete(':id')
    async deleteBookById(@Param() params){
        const [bookDB] = await this.service.getBookById(params.id)
        if(fs.existsSync(path.join(__dirname,'../../','imgs'))){
            if(fs.existsSync(path.join(__dirname,'../../','imgs',bookDB.cover))){
                fs.rmSync(path.join(__dirname,'../../','imgs',bookDB.cover))
            }
        }
        await this.service.deleteBook(params.id);
        return {
            msg : 'Book deleted successfully'
        }
    }

}
