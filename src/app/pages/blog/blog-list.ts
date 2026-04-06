import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../shared/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogListComponent {
  private blogService = inject(BlogService);

  activeCategory = signal('All');
  searchQuery    = signal('');

  categories = computed(() => ['All', ...this.blogService.getCategories()]);

  posts = computed(() => {
    let all = this.blogService.getAll();
    const cat = this.activeCategory();
    const q   = this.searchQuery().toLowerCase().trim();
    if (cat !== 'All') all = all.filter(p => p.category === cat);
    if (q) all = all.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
    return all;
  });

  setCategory(cat: string) { this.activeCategory.set(cat); }
  onSearch(e: Event) { this.searchQuery.set((e.target as HTMLInputElement).value); }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  }
}
