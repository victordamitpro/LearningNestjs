import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { IUsers } from './interfaces/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId/profile')
  public async getUser(
    @Res() res,
    @Param('userId') userId: number,
  ): Promise<IUsers> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200,
    });
  }
}
