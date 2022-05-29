import { UserDto } from 'src/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Users } from 'src/users/entities/users.entity';

export class GoogleRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly googleId: string;

  static toEntity(dto: GoogleRegisterDto): Users {
    const data = instanceToPlain(dto);
    return plainToInstance(Users, data);
  }
}
