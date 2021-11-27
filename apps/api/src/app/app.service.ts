import { Injectable } from '@nestjs/common';
import { Ticket } from '@zendesk/types';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getTickets(): Observable<Ticket[]> {
    return of([]);
  }
}
