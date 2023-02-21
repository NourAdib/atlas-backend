import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetProximityMemoryDto } from './dto/get-proximity-memory.dto';
import { CreateMemoryDto } from './dto/memory-create.dto';
import { MemoryService } from './memory.service';

@Controller('memory')
export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() body: CreateMemoryDto,
    @Request() req,
    @Res() res: Response,
    @UploadedFile() file
  ) {
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Image is required' });
    }
    this.memoryService
      .createMemory(req.user, body, file)
      .then((memory) => {
        return res.status(HttpStatus.OK).json(memory);
      })
      .catch((err) => {
        console.log(err);

        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('proximity-memories')
  getProximityMemories(
    @Body() body: GetProximityMemoryDto,
    @Request() req,
    @Res() res: Response,
    @Query() pageOptionsDto: PageOptionsDto
  ) {
    this.memoryService
      .getProximityMemories(req.user, body, pageOptionsDto)
      .then((memory) => {
        return res.status(HttpStatus.OK).json(memory);
      })
      .catch((err) => {
        console.log(err);
        
        return res.status(err.status).json({ message: err.message });
      });
  }
}
