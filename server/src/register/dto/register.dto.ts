import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Users } from 'src/users/entities/users.entity';

export class RegisterUserDto {
  readonly id: number;

  @ApiProperty({
    description: 'The first name of user',
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of user',
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  readonly lastName: string;

  @ApiProperty({
    description: 'The user name of user used for login',
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @ApiProperty()
  @IsString()
  @MaxLength(250)
  readonly userName: string;

  @ApiProperty({
    description: 'The email of user used for login',
    maxLength: 100,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @ApiProperty({
    description: 'The phone of user',
    maxLength: 20,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({
    description: 'The password of user',
    maxLength: 100,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;

  public static toEntity(dto: Partial<RegisterUserDto>): Users {
    const data = instanceToPlain(dto);
    return plainToInstance(Users, data);
  }
}
