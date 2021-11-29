import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';

import { Ticket } from '@zendesk/types';

import { catchError, map, Observable } from 'rxjs';
import { environment as env } from '../environments/environment';

const ZENDESK_TICKETS_URL = `https://${env.zendesk.subdomain}.zendesk.com/api/v2/tickets`;

@Injectable()
export class TicketService {
  constructor(private readonly http: HttpService) {}

  listTickets(token: string): Observable<Ticket[]> {
    return this.http
      .get(ZENDESK_TICKETS_URL, {
        headers: { Authorization: `${token}` },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        })
      )
      .pipe(map((res) => res.data.tickets));
  }
}
