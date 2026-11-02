import { HttpClient, HttpContext } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EffectivePermission,
  LoginRequest,
  LogoutRequest,
  RefreshSessionRequest,
  SessionProfile,
  SessionTokens,
} from '../models/auth.model';
import { NOTIFY_HTTP_ERROR } from '../interceptors/error-interceptor';

@Service()
export class SessionApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/sesion`;

  login(payload: LoginRequest): Observable<SessionTokens> {
    return this.http.post<SessionTokens>(
      `${this.base}/login`,
      payload,
    );
  }

  refresh(payload: RefreshSessionRequest): Observable<SessionTokens> {
    return this.http.post<SessionTokens>(
      `${this.base}/refresh`,
      payload,
    );
  }

  logout(payload: LogoutRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.base}/logout`,
      payload,
    );
  }

  me(notifyErrors = false): Observable<SessionProfile> {
    return this.http.get<SessionProfile>(`${this.base}/me`, {
      context: new HttpContext().set(NOTIFY_HTTP_ERROR, notifyErrors),
    });
  }

  permissions(notifyErrors = false): Observable<EffectivePermission[]> {
    return this.http
      .get<{ permissions: EffectivePermission[] }>(
        `${this.base}/permissions`,
        {
          context: new HttpContext().set(NOTIFY_HTTP_ERROR, notifyErrors),
        },
      )
      .pipe(map((response) => response.permissions));
  }

  sessions(): Observable<unknown[]> {
    return this.http
      .get<{ sessions: unknown[] }>(`${this.base}/sessions`)
      .pipe(map((response) => response.sessions));
  }

  revokeSessions(): Observable<{ revoked: number }> {
    return this.http.post<{ revoked: number }>(
      `${this.base}/sessions/revoke`,
      {},
    );
  }
}
