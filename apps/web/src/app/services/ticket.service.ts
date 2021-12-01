import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '@zendesk/types';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

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

    try {
      return this.http
        .get<Ticket[]>(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .pipe(
          catchError((err) => {
            alert('Could not connect to server, unable display tickets');
            throw Error(err);
          })
        );
    } catch (error) {
      return of(null);
    }
  }
}
