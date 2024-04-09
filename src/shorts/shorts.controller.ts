import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('shorts')
export class ShortsController {
  constructor(private readonly shortsService: ShortsService) {}

  @Post()
  create(@Body() createShortDto: CreateShortDto, @GetUser() user: User) {
    return this.shortsService.create(createShortDto, user);
  }

  @Get()
  findAll() {
    return this.shortsService.findAll();
  }

  @Get(':short')
  async findOne(@Param('short') short: string, @Res() res: Response) {
    const { urlRedirect } = await this.shortsService.findOne(short);
    res.redirect(urlRedirect);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateShortDto: UpdateShortDto,
  ) {
    return this.shortsService.update(id, updateShortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortsService.remove(id);
  }
}
