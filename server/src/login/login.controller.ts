import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../login/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    const response = await this.loginService.login(loginDto);
    return response;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    /* TODO document why this async method 'googleAuth' is empty */
    // This api handle incoming request and send all required code to google verify
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const response = this.loginService.googleLogin(req, res);
    return response;
  }
}
