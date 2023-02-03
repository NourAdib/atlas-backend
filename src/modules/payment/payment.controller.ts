import {
  Controller,
  UseGuards,
  Res,
  Request,
  Post,
  HttpStatus,
  RawBodyRequest,
  Req
} from '@nestjs/common';
import { Get, Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  async subscribe(@Request() req, @Res() res: Response) {
    this.paymentService
      .subscribe(req.user)
      .then((result) => {
        return res.status(HttpStatus.OK).json({ message: 'Payment success', url: result });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('unsubscribe')
  async unsubscribe(@Request() req, @Res() res: Response) {
    this.paymentService
      .unsubscribe(req.user)
      .then((result) => {
        return res.status(HttpStatus.OK).json({ message: 'Success' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @Get('success')
  async paymentSuccess(
    @Request() req,
    @Res() res: Response,
    @Query('session_id') sessionId: string
  ) {
    this.paymentService
      .paymentSuccess(sessionId)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Payment success' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @Get('cancel')
  async paymentCancel(
    @Request() req,
    @Res() res: Response,
    @Query('session_id') sessionId: string
  ) {
    this.paymentService
      .paymentCancel(sessionId)
      .then(() => {
        return res.status(HttpStatus.OK).json({ message: 'Payment Failed' });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }

  @Post('invoicing-webhook')
  async invoicingWebHook(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    this.paymentService
      .invoicingWebHook(req.headers['stripe-signature'], req.rawBody)
      .then((result) => {
        return res.status(HttpStatus.OK).json({ message: result });
      })
      .catch((err) => {
        return res.status(err.status).json({ message: err.message });
      });
  }
}
