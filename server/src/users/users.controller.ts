import { UserDto } from 'src/users/dto/user.dto';
import {
  Controller,
  Get,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from './dto/user.profile.dto';

@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/profile')
  public async getUser(
    @Res() res,
    @Param('id') id: string,
  ): Promise<UserProfileDto> {
    const user = await this.usersService.findByUid(id);

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    return res.status(HttpStatus.OK).json({
      user: UserProfileDto.toDto(user),
      status: 200,
    });
  }
}
