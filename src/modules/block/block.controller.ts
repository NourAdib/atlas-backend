import { Controller, UseGuards, Res, Request, Post, Param, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(private blockService: BlockService) {}

  @UseGuards(JwtAuthGuard)
  @Post('block-user/:id')
  blockUser(@Request() req, @Param('id') id: string, @Res() res: Response) {
    this.blockService
      .blockUser(id, req.user)
      .then((block) => {
        return res.status(HttpStatus.OK).json(block);
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('unblock-user/:id')
  unblockUser(@Request() req, @Param('id') id: string, @Res() res: Response) {
    this.blockService
      .unblockUser(id, req.user)
      .then((_) => {
        return res.status(HttpStatus.OK).json({ message: 'User unblocked' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
