import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customImageName } from 'src/utils/customImageName';
import { AuthorEntity } from './author.entity';
import { AuthorsService } from './authors.service';
import * as fs from 'fs';
import * as path from 'path';


@Controller('authors')
export class AuthorsController {
    constructor(private service:AuthorsService){}

    @Get()
    async getAuthors(){
        return await this.service.getAuthors()
    }
    
    @Get(':id')
    async getAuthorById(@Param() params){
        return await this.service.getAuthorById(params.id)
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
    async createAuthor(@Body() author:AuthorEntity, @UploadedFile() file, @Res() res){
        try {
                author.profilePic = file.filename
            author.birthdate = new Date(author.birthdate)
            await this.service.createNewAuthor( JSON.parse(JSON.stringify(author)) )
            res.status(200).json({
                msg : "Author created successfully"
            })
            
        } catch ( err ) {
            console.log(err);
            res.status(500).json({
                msg : "Talk to the adminstrator"
            })
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
    async updateAuthorById(@Param() params, @Body() author:AuthorEntity, @UploadedFile() file){
        // Borrar imagen antigua para subir la nueva y asignar el nombre de la imagen a la entidad en base de datos
        if(file){
            author.profilePic = file.filename
            const [authorDB] = await this.service.getAuthorById(params.id)
            if(fs.existsSync(path.join(__dirname,'../../','imgs'))){
                if(fs.existsSync(path.join(__dirname,'../../','imgs',authorDB.profilePic))){
                    fs.rmSync(path.join(__dirname,'../../','imgs',authorDB.profilePic))
                }
            }
        }
        author.birthdate = new Date(author.birthdate)
        await this.service.updateAuthor( params.id, JSON.parse(JSON.stringify(author)) );
        return {
            msg : "Author updated successfully"
        }
        return{
            user:JSON.parse(JSON.stringify(author)) 
        }
    }

    @Delete(':id')
    async deleteAuthorById( @Param() params, @Res() res){

        try {
            
            const [authorDB] = await this.service.getAuthorById(params.id)
            console.log(authorDB);
            if(fs.existsSync(path.join(__dirname,'../../','imgs'))){
                if(fs.existsSync(path.join(__dirname,'../../','imgs',authorDB.profilePic))){
                    fs.rmSync(path.join(__dirname,'../../','imgs',authorDB.profilePic))
                }
            }
            await this.service.deleteAuthor( params.id );
            res.status(200).json({
                msg : "Author deleted successfully"
            })
        } catch ( err ) {
            console.log(err);
            res.status(500).json({
                msg : "Talk with the administrator"
            })
        }
    }
}
