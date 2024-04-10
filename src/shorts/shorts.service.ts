import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Short } from './entities/short.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ShortsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Short)
    private readonly shortRepository: Repository<Short>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createShortDto: CreateShortDto, user: User) {
    try {
      const short = this.shortRepository.create(createShortDto);

      if (user) {
        console.log('user', user);
      }

      await this.shortRepository.save(short);

      delete short.id;

      return short;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all shorts`;
  }

  async findOne(id: string): Promise<{ urlRedirect: string }> {
    const short = await this.shortRepository.findOne({
      where: {
        short: id,
      },
    });

    if (!short) {
      throw new NotFoundException('Short not found');
    }

    // Increment the number of clicks

    short.clicks += 1;

    await this.shortRepository.save(short);

    return { urlRedirect: short.url_redirect };
  }

  async update(id: string, updateShortDto: UpdateShortDto) {
    try {
      await this.shortRepository.update(id, updateShortDto);
      return await this.shortRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} short`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    // show the error in the console api
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error occurred, check server logs',
    );
  }
}
