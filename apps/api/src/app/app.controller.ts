import {
  Controller,
  Request,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { OAuthResponse, Ticket } from '@zendesk/types';
import { mergeMap, Observable, map } from 'rxjs';

import { OAuthService } from './oauth.service';
import { TicketService } from './ticket.service';

@Controller()
export class AppController {
  constructor(
    private readonly oauth: OAuthService,
    private readonly tickets: TicketService
  ) {}

  @Post('oauth')
  getClients(@Request() req): Observable<OAuthResponse> {
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

        // Use the first client for simplicity
        const client = clients[0];

        return this.oauth.createAccessToken(email, password, client.id).pipe(
          map((token) => {
            return { token, client };
          })
        );
      })
    );
  }

  @Get('tickets')
  getTickets(@Request() req): Observable<Ticket[]> {
    if (!req?.headers?.authorization) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return this.tickets.listTickets(req.headers.authorization);
  }
}
