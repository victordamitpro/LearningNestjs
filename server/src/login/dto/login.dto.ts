import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
