import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AccessToken, Client } from '@zendesk/types';
import { catchError, map, Observable } from 'rxjs';

import { environment as env } from '../environments/environment';

export const ZENDESK_CLIENT_URL = `https://${env.zendesk.subdomain}.zendesk.com/api/v2/oauth/clients.json`;
export const ZENDESK_TOKEN_URL = `https://${env.zendesk.subdomain}.zendesk.com/api/v2/oauth/tokens.json`;

@Injectable()
export class OAuthService {
  constructor(private readonly http: HttpService) {}

  listClients(username: string, password: string): Observable<Client[]> {
    return this.http
      .get(ZENDESK_CLIENT_URL, {
        auth: { username, password },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        })
      )
      .pipe(
        map((res) => {
          if (!res?.data?.clients) {
            throw new HttpException(
              {
                status: HttpStatus.UNAUTHORIZED,
                error: 'Failed to get clients',
              },
              HttpStatus.UNAUTHORIZED
            );
          }

          return res.data.clients as Client[];
        })
      );
  }

  createAccessToken(
    username: string,
    password: string,
    clientId: number
  ): Observable<AccessToken> {
    return this.http
      .post(
        ZENDESK_TOKEN_URL,
        {
          token: {
            client_id: `${clientId}`,
            scopes: ['read', 'write'],
          },
        },
        {
          auth: { username, password },
        }
      )
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        })
      )
      .pipe(
        map((res) => {
          return res.data.token as AccessToken;
        })
      );
  }
}
