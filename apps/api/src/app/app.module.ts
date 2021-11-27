import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { OAuthService } from './oauth.service';
import { TicketService } from './ticket.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [OAuthService, TicketService],
})
export class AppModule {}
