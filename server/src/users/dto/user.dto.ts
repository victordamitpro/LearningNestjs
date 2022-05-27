import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(250)
  readonly firstname: string;

  @IsString()
  @MaxLength(250)
  readonly lastname: string;

  @IsString()
  @MaxLength(250)
  readonly username: string;

  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;
}
