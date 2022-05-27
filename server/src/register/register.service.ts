import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { IUsers } from './../users/interfaces/users.interface';

@Injectable()
export class RegisterService {
  constructor(private readonly usersService: UsersService) {}

  public async register(registerUserDto: RegisterUserDto): Promise<IUsers> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    return this.usersService.create(registerUserDto);
  }
}
