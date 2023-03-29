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
      .then(() => {
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
        return res.send(
          '<html><head><link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet"></head><style>body { text-align: center; padding: 40px 0; background: #EBF0F5; } h1 { color: #88B04B; font-family: "Nunito Sans", "Helvetica Neue", sans-serif; font-weight: 900; font-size: 40px; margin-bottom: 10px; } p { color: #404F5E; font-family: "Nunito Sans", "Helvetica Neue", sans-serif; font-size: 20px; margin: 0; } i { color: #9ABC66; font-size: 100px; line-height: 200px; margin-left: -15px; } .card { background: white; padding: 60px; border-radius: 4px; box-shadow: 0 2px 3px #C8D0D8; display: inline-block; margin: 0 auto; } </style> <body> <div class="card"> <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;"> <i class="checkmark">✓</i> </div> <h1>Success</h1> <p>You have subscribed successfully, you can now close this page</p> </div> </body> </html>'
        );
      })
      .catch((err) => {
        console.log(err);
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
