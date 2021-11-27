import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';

import { TicketResponse } from '@zendesk/types';

import { catchError, map, Observable } from 'rxjs';
import { environment as env } from '../environments/environment';

const ZENDESK_TICKETS_URL = `https://${env.zendesk.subdomain}.zendesk.com/api/v2/tickets`;

@Injectable()
export class TicketService {
  constructor(private readonly http: HttpService) {}

  listTickets(
    token: string,
    size: number,
    before: string | undefined,
    after: string | undefined
  ): Observable<TicketResponse> {
    let url = `${ZENDESK_TICKETS_URL}?page%5Bsize%5D=${size}`;

    if (before) {
      url += `&page%5Bbefore%5D=${before}`;
    }

    if (after) {
      url += `&page%5Bafter%5D=${after}`;
    }

    return this.http
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        })
      )
      .pipe(map((res) => res.data));
  }
}
