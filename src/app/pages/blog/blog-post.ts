import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../shared/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
})
export class BlogPostComponent implements OnInit {
  private route       = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post       = signal<BlogPost | null>(null);
  related    = signal<BlogPost[]>([]);
  notFound   = signal(false);
  readProgress = signal(0);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? '';
      const found = this.blogService.getBySlug(slug);
      if (!found) { this.notFound.set(true); return; }
      this.post.set(found);
      this.related.set(
        this.blogService.getAll()
          .filter(p => p.slug !== slug && (p.category === found.category || p.tags.some(t => found.tags.includes(t))))
          .slice(0, 3)
      );
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    this.readProgress.set(total > 0 ? Math.round((scrolled / total) * 100) : 0);
  }
}
