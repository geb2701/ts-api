import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserResponse } from './dto/user.response';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Usuario creado', type: UserResponse })
  create(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(dto) as unknown as Promise<UserResponse>;
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de usuarios', type: UserResponse, isArray: true })
  findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll() as unknown as Promise<UserResponse[]>;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalle de usuario', type: UserResponse })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return this.usersService.findOne(id) as unknown as Promise<UserResponse>;
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Usuario actualizado', type: UserResponse })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<UserResponse> {
    return this.usersService.update(id, dto) as unknown as Promise<UserResponse>;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Usuario eliminado', type: UserResponse })
  remove(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return this.usersService.remove(id) as unknown as Promise<UserResponse>;
  }
}