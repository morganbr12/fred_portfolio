import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, interval, switchMap, startWith, shareReplay, catchError } from 'rxjs';

export interface Contribution {
  date: string;   // 'YYYY-MM-DD'
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const USERNAME = 'morganbr12';
// Free public contributions API — no token required
const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const USER_API    = `https://api.github.com/users/${USERNAME}`;
// Refresh every 5 minutes
const POLL_MS = 5 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private http       = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  /** Contribution heatmap data, polled every 5 min */
  readonly contributions$: Observable<ContributionResponse> = isPlatformBrowser(this.platformId)
    ? interval(POLL_MS).pipe(
        startWith(0),
        switchMap(() =>
          this.http.get<ContributionResponse>(CONTRIB_API).pipe(
            catchError(() => of({ total: {}, contributions: [] } as ContributionResponse))
          )
        ),
        shareReplay(1)
      )
    : of({ total: {}, contributions: [] });

  /** Public profile — fetched once */
  readonly user$: Observable<GitHubUser | null> = isPlatformBrowser(this.platformId)
    ? this.http.get<GitHubUser>(USER_API).pipe(
        catchError(() => of(null)),
        shareReplay(1)
      )
    : of(null);
}
