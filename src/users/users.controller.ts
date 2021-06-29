import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service:UsersService){}

@Get()
getUsers(){
    return this.service.getAllUsers()
}

@Post()
addUser(@Body() user:UserEntity){
    return this.service.createUser( user );
    
}

@Put()
updateUser(){
    return "updateUser"
    
}

@Patch()
updateAttUser(){
    return "updateAttUser"
    
}

@Delete()
deleteUser(){
    return "deleteUser"

}
}
