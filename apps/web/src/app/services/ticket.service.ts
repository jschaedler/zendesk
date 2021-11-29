import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '@zendesk/types';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export enum CursorType {
  None,
  Before,
  After,
}

export interface TicketCursor {
  size: number;
  value?: string;
  type?: CursorType;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  query(): Observable<Ticket[] | null> {
    const url = `${environment.api}/tickets`;
    const token = this.auth.token;

    if (!token) {
      alert('Cannot get tickets, you are not signed in');
      return of(null);
    }

    return this.http.get<Ticket[]>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
