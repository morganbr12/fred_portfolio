import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { GitHubService, Contribution, ContributionResponse } from '../../shared/github.service';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

interface WeekCol {
  days: (Contribution | null)[];  // always 7 slots (Sun–Sat), null = padding
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

@Component({
  selector: 'app-github-activity',
  standalone: true,
  imports: [AsyncPipe, ScrollRevealDirective],
  templateUrl: './github-activity.html',
  styleUrl: './github-activity.scss',
})
export class GithubActivityComponent implements OnInit, OnDestroy {
  private gh = inject(GitHubService);
  private platformId = inject(PLATFORM_ID);
  private sub = new Subscription();

  user$    = this.gh.user$;

  loading  = signal(true);
  error    = signal(false);
  tooltip  = signal<string | null>(null);
  tooltipX = signal(0);
  tooltipY = signal(0);

  weeks        = signal<WeekCol[]>([]);
  totalLastYear = signal(0);
  todayCount   = signal(0);
  longestStreak = signal(0);
  currentStreak = signal(0);
  monthLabels  = signal<{ label: string; col: number }[]>([]);

  readonly dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  readonly today = new Date().toISOString().slice(0, 10);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.sub.add(
      this.gh.contributions$.subscribe({
        next: (data) => {
          this.loading.set(false);
          this.process(data);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        },
      })
    );
  }

  private process(data: ContributionResponse) {
    const all = data.contributions ?? [];
    if (!all.length) { this.error.set(true); return; }

    // total for last year
    const yearKey = Object.keys(data.total ?? {}).find(k => k === 'lastYear') ?? 'lastYear';
    this.totalLastYear.set((data.total as Record<string,number>)[yearKey] ?? all.reduce((s, c) => s + c.count, 0));

    // today
    const today = new Date().toISOString().slice(0, 10);
    this.todayCount.set(all.find(c => c.date === today)?.count ?? 0);

    // streaks
    const sorted = [...all].sort((a, b) => a.date.localeCompare(b.date));
    let cur = 0, longest = 0, tmp = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].date > today) continue;
      if (sorted[i].count > 0) {
        if (cur === 0) cur++;
        else cur++;
        tmp++;
        longest = Math.max(longest, tmp);
      } else {
        if (cur > 0) break; // streak broken from today
        tmp = 0;
      }
    }
    // recalculate longest properly
    tmp = 0;
    for (const c of sorted) {
      if (c.count > 0) { tmp++; longest = Math.max(longest, tmp); }
      else tmp = 0;
    }
    // current streak (from today backwards)
    cur = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].date > today) continue;
      if (sorted[i].count > 0) cur++;
      else break;
    }
    this.currentStreak.set(cur);
    this.longestStreak.set(longest);

    // Build grid: 52 weeks ending today
    const endDate = new Date(today);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);
    // Rewind start to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const map = new Map(all.map(c => [c.date, c]));
    const weeks: WeekCol[] = [];
    const monthLbls: { label: string; col: number }[] = [];
    let lastMonth = -1;

    let cur2 = new Date(startDate);
    while (cur2 <= endDate) {
      const week: WeekCol = { days: [] };
      for (let d = 0; d < 7; d++) {
        const ds = cur2.toISOString().slice(0, 10);
        if (cur2 > endDate) {
          week.days.push(null);
        } else {
          week.days.push(map.get(ds) ?? { date: ds, count: 0, level: 0 });
        }
        const m = cur2.getMonth();
        if (d === 0 && m !== lastMonth) {
          monthLbls.push({ label: MONTHS[m], col: weeks.length });
          lastMonth = m;
        }
        cur2.setDate(cur2.getDate() + 1);
      }
      weeks.push(week);
    }

    this.weeks.set(weeks);
    this.monthLabels.set(monthLbls);
  }

  levelColor(level: number): string {
    // 0 = empty cell, 1–4 = increasing blue intensity
    const colors = ['#1a1a2e', '#1e3a5f', '#1d5f9e', '#2380d4', '#38cfff'];
    return colors[Math.min(level, 4)];
  }

  showTooltip(event: MouseEvent, day: Contribution | null) {
    if (!day) return;
    const label = day.count === 0
      ? `No contributions on ${day.date}`
      : `${day.count} contribution${day.count > 1 ? 's' : ''} on ${day.date}`;
    this.tooltip.set(label);
    this.tooltipX.set(event.clientX);
    this.tooltipY.set(event.clientY);
  }

  hideTooltip() { this.tooltip.set(null); }

  ngOnDestroy() { this.sub.unsubscribe(); }
}
