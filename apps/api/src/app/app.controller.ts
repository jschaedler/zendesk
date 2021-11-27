import {
  Controller,
  Request,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { AccessToken, TicketResponse } from '@zendesk/types';
import { mergeMap, Observable } from 'rxjs';

import { OAuthService } from './oauth.service';
import { TicketService } from './ticket.service';

@Controller()
export class AppController {
  constructor(
    private readonly oauth: OAuthService,
    private readonly tickets: TicketService
  ) {}

  @Get('oauth')
  getClients(@Request() req): Observable<AccessToken> {
    if (!req?.body?.email || !req?.body?.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid request body',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const { email, password } = req.body;
    return this.oauth.listClients(email, password).pipe(
      mergeMap((clients) => {
        if (clients.length === 0) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'No clients registered to account',
            },
            HttpStatus.BAD_REQUEST
          );
        }
        return this.oauth.createAccessToken(email, password, clients[0].id);
      })
    );
  }

  @Get('tickets')
  getTickets(
    @Request() req,
    @Query('page_size') size: number,
    @Query('before') before: string,
    @Query('after') after: string
  ): Observable<TicketResponse> {
    if (!req?.headers?.authorization || size === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return this.tickets.listTickets(
      req.headers.authorization,
      size,
      before,
      after
    );
  }
}
