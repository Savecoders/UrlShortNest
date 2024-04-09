import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto.';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...res } = createAuthDto;

      const salts = bcrypt.genSaltSync(10);

      const hashed = bcrypt.hashSync(password, salts);

      const user = this.authRepository.create({
        ...res,
        password: hashed,
      });

      await this.authRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErros(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, name, password } = loginUserDto;

    if (!email && !name) {
      throw new BadRequestException('Email or username is required');
    }

    const user = await this.authRepository.findOne({
      where: [{ email }, { name }],
      select: {
        password: true,
        email: true,
        name: true,
        id: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Username, Email or password is incorrect',
      );
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Username, Email or password is incorrect',
      );
    }

    // remove passsword from user object
    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private async getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErros(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('Email already exists');
    }
    throw new InternalServerErrorException('Please checks server logs');
  }
}
