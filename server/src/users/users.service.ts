import { UserProfileDto } from './dto/user.profile.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  public async findByEmail(email: string): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findByGoogleId(googleId: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: {
        googleId: googleId,
      },
    });

    return user;
  }

  public async findByUid(userUid: string): Promise<Users> {
    const defaultUser = await this.userRepository.findOne({
      where: {
        id: userUid,
      },
    });

    return defaultUser;
  }

  public async isUserExisted(email: string): Promise<boolean> {
    return (
      (await this.userRepository.count({
        where: {
          email: email,
        },
      })) > 0
    );
  }

  public async create(user: Users): Promise<UserProfileDto> {
    try {
      const isUserExist = await this.isUserExisted(user.email);

      if (isUserExist) {
        throw new HttpException(
          `${user.email} already existed please chose another email.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      user.createdBy = 'Admin';
      user.lastChangedBy = 'Admin';
      return await this.userRepository
        .save(user)
        .then((res) => UserProfileDto.toDto(res));
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateById(id: string, userDto: any): Promise<UserDto> {
    await this.userRepository.update(id, userDto);
    return await this.findByUid(id);
  }
}
