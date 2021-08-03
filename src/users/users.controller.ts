import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customImageName } from 'src/utils/customImageName';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service:UsersService){}

@Get()
getUsers(){
    return this.service.getAllUsers()
}

@Get(":id")
getUserById(@Param() params){
    return this.service.getUser(params.id)
}

@Post()
addUser(@Body() user:UserEntity){
    return this.service.createUser( user );
}

@Post("upload")
@UseInterceptors(
    FileInterceptor('image',{
        storage : diskStorage({
            destination : './avatars',
            filename : customImageName,
        })
    })
)

async uploadFile(@Body() user:UserEntity, @UploadedFile() file){
    user.avatar = file.filename.split(' ')

    await this.service.createUser(JSON.parse(JSON.stringify(user)));

    const response = {
        imageName: file.filename
    }

    return {
        status : HttpStatus.OK,
        msg: "Image uploaded successfully",
        data: response
    }
}

@Put()
updateUser(@Body() user:UserEntity){
    return this.service.updateUser(user)
    
}

// @Patch()
// updateAttUser(){
//     return "patchUsers"
    
// }

@Delete(':id')
deleteUser(@Param() params){
    return this.service.deleteUser(params.id)

}
}
