import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly password: string;
}
