import { UserProfileDto } from './../users/dto/user.profile.dto';
import { GoogleRegisterDto } from './dto/google.register.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class RegisterService {
  constructor(private readonly usersService: UsersService) {}

  public async register(
    registerUserDto: RegisterUserDto,
  ): Promise<UserProfileDto> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    const user: Users = RegisterUserDto.toEntity(registerUserDto);
    return this.usersService.create(user);
  }

  public async registerWithGoogle(
    registerUserDto: GoogleRegisterDto,
  ): Promise<UserProfileDto> {
    const user: Users = GoogleRegisterDto.toEntity(registerUserDto);
    return this.usersService.create(user);
  }
}
