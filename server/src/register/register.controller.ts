import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  public async register(
    @Res() res,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<any> {
    try {
      await this.registerService.register(registerUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'User registration successfully!',
        status: 200,
      });
    } catch (err) {
      if (err instanceof HttpException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: err.getResponse(),
          status: 400,
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not registration!',
        status: 400,
      });
    }
  }
}
