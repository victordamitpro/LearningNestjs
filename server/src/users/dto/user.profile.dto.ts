import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { Users } from '../entities/users.entity';

export class UserProfileDto {
  @IsOptional()
  readonly id: string;

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
  @IsPhoneNumber()
  readonly phone: string;

  public static toDto(entity: Users): UserProfileDto {
    const data = instanceToPlain(entity);
    return plainToInstance(UserProfileDto, data);
  }
}
