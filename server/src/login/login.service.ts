import { UserProfileDto } from './../users/dto/user.profile.dto';
import { RegisterService } from './../register/register.service';
import { GoogleRegisterDto } from './../register/dto/google.register.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginDto } from './dto/login.dto';
import { Users } from 'src/users/entities/users.entity';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly registerService: RegisterService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(loginDto: LoginDto): Promise<Users> {
    return await this.usersService.findByEmail(loginDto.email);
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validate(loginDto)
      .then((userData) => {
        if (!userData) {
          throw new UnauthorizedException();
        }

        const passwordIsValid = bcrypt.compareSync(
          loginDto.password,
          userData.password,
        );

        if (!passwordIsValid == true) {
          return {
            message: 'Authentication failed. Wrong password',
            status: 400,
          };
        }
        const data: JwtPayload = {
          email: userData.email,
        };

        const token = this.generateTokenPayload(data);
        return {
          expiresIn: 3600,
          accessToken: token,
          user: {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName,
            email: userData.email,
          },
          status: 200,
        };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  public async googleLogin(req: any, res: any) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const { email, firstName, lastName, accessToken } = req.user;

    const currentUser = await this.usersService.findByEmail(email);

    // If not yet existed user than automatic signup new user
    if (!currentUser) {
      const userDto: GoogleRegisterDto = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: accessToken,
      };

      const result = await this.registerService.registerWithGoogle(userDto);
      this.GenerateTokenAndRedirect(result.id, userDto, res);
      return;
    }

    // Update current User
    currentUser.googleId = accessToken;
    await this.usersService.updateById(currentUser.id, currentUser);
    const userDto: GoogleRegisterDto = {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      googleId: accessToken,
    };
    this.GenerateTokenAndRedirect(currentUser.id, userDto, res);
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user.email);
  }

  protected createJwtPayload(email: string) {
    const data: JwtPayload = {
      email: email,
    };

    const jwt = this.generateTokenPayload(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }

  protected generateTokenPayload(payLoad: JwtPayload) {
    return this.jwtService.sign(payLoad);
  }

  private GenerateTokenAndRedirect(
    id: string,
    userDto: GoogleRegisterDto,
    res: any,
  ): void {
    const data: JwtPayload = {
      email: userDto.email,
    };

    const token = this.generateTokenPayload(data);

    res.redirect(
      `/auth/google/redirect/${token}/${id}/${userDto.email}/${userDto.firstName}/${userDto.lastName}`,
    );
  }
}
