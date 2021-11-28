import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthUser } from '@zendesk/types';
import { BehaviorSubject, tap, Observable, mergeMap } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'zendesk_token';

  private user = new BehaviorSubject<OAuthUser>(undefined);
  public user$: Observable<OAuthUser> = this.user.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const signedInUser = this.retrieve();
    this.user.next(signedInUser);
    if (signedInUser) this.router.navigate(['/tickets']);
  }

  get token(): string | undefined {
    return this.user?.getValue()?.token.full_token;
  }

  get authenticated(): boolean {
    return this.user?.getValue() ? true : false;
  }

  signIn(email: string, password: string): Observable<OAuthUser> {
    return this.http
      .post<OAuthUser>(`${environment.api}/oauth`, { email, password })
      .pipe(
        tap((user) => this.store(user)),
        tap((user) => this.user.next(user)),
        tap(() => this.router.navigate(['/tickets'])),
        mergeMap(() => this.user$)
      );
  }

  signOut() {
    this.user.next(undefined);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth']);
  }

  private store(user: OAuthUser) {
    localStorage.setItem(this.tokenKey, JSON.stringify(user));
  }

  private retrieve(): OAuthUser | undefined {
    const storedToken: string | null = localStorage.getItem(this.tokenKey);
    if (!storedToken) return undefined;
    return JSON.parse(storedToken) as OAuthUser;
  }
}
