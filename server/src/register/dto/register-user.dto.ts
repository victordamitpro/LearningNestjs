import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  readonly id: number;

  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
