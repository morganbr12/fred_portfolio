import { Injectable } from '@angular/core';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;       // raw HTML / markdown-style string
  cover: string;         // CSS gradient or image URL
  category: string;
  tags: string[];
  readTime: number;      // minutes
  date: string;          // YYYY-MM-DD
  featured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BlogService {

  private posts: BlogPost[] = [
    {
      slug: 'flutter-state-management-bloc-vs-riverpod',
      title: 'Flutter State Management: BLoC vs Riverpod in 2024',
      excerpt: 'A deep dive into the two most popular state management solutions in Flutter, comparing architecture, boilerplate, testability, and when to choose each.',
      cover: 'linear-gradient(135deg, #54c5f8 0%, #0074a5 100%)',
      category: 'Flutter',
      tags: ['Flutter', 'Dart', 'BLoC', 'Riverpod', 'State Management'],
      readTime: 8,
      date: '2026-04-05',
      featured: true,
      content: `
<h2>Introduction</h2>
<p>State management is one of the most debated topics in the Flutter community. Two packages dominate the conversation: <strong>BLoC</strong> (Business Logic Component) and <strong>Riverpod</strong>. Both are production-ready and widely adopted, but they solve the problem in very different ways.</p>

<h2>BLoC: Explicit, Testable, Verbose</h2>
<p>BLoC enforces a strict unidirectional data flow. You dispatch <em>Events</em>, the bloc processes them and emits <em>States</em>. This makes it extremely predictable and easy to unit-test in isolation.</p>
<pre><code>// Defining an event
abstract class CounterEvent {}
class Increment extends CounterEvent {}

// The BLoC
class CounterBloc extends Bloc&lt;CounterEvent, int&gt; {
  CounterBloc() : super(0) {
    on&lt;Increment&gt;((event, emit) => emit(state + 1));
  }
}</code></pre>
<p>The downside is boilerplate — for each feature you need an event class, a state class, and the bloc itself.</p>

<h2>Riverpod: Composable, Concise, Compile-safe</h2>
<p>Riverpod is built around <em>providers</em> — simple, composable units of state that can depend on each other. It's fully compile-safe, has zero Flutter Widget dependency, and works beautifully with async data.</p>
<pre><code>final counterProvider = StateProvider&lt;int&gt;((ref) => 0);

// In your widget
final count = ref.watch(counterProvider);
ref.read(counterProvider.notifier).state++;</code></pre>

<h2>When to Choose Which</h2>
<ul>
  <li><strong>BLoC</strong> — large teams, strict separation of concerns, complex event-driven flows, enterprise apps.</li>
  <li><strong>Riverpod</strong> — solo developers, startups, apps with lots of async data fetching, simpler dependency injection needs.</li>
</ul>

<h2>Conclusion</h2>
<p>There is no universal winner. BLoC gives you structure at the cost of verbosity. Riverpod gives you speed at the cost of less enforced discipline. Know your team and your app's complexity — then choose accordingly.</p>
      `,
    },
    {
      slug: 'angular-signals-complete-guide',
      title: 'Angular Signals: The Complete Developer Guide',
      excerpt: 'Signals are Angular\'s answer to fine-grained reactivity. Learn how to replace BehaviorSubjects, OnPush components, and ngOnChanges with a cleaner mental model.',
      cover: 'linear-gradient(135deg, #dd0031 0%, #c3002f 50%, #ff6b6b 100%)',
      category: 'Angular',
      tags: ['Angular', 'TypeScript', 'Signals', 'Reactivity'],
      readTime: 7,
      date: '2026-04-03',
      featured: true,
      content: `
<h2>What Are Signals?</h2>
<p>Signals are a new reactive primitive introduced in Angular 16 and stabilised in Angular 17. A signal is a wrapper around a value that notifies interested consumers when that value changes — without needing Zone.js or manual change detection.</p>

<pre><code>import { signal, computed, effect } from '@angular/core';

const count = signal(0);
const doubled = computed(() => count() * 2);

effect(() => console.log('Count changed:', count()));

count.set(5); // logs "Count changed: 5"
console.log(doubled()); // 10</code></pre>

<h2>signal() vs BehaviorSubject</h2>
<p>Before signals, the idiomatic Angular reactive pattern was <code>BehaviorSubject</code> + <code>async</code> pipe. Signals are simpler:</p>
<ul>
  <li>No need to call <code>.next()</code> — use <code>.set()</code> or <code>.update()</code></li>
  <li>No subscription management or <code>takeUntilDestroyed</code></li>
  <li>Synchronous reads — call the signal like a function: <code>count()</code></li>
  <li>Works with <code>OnPush</code> automatically</li>
</ul>

<h2>computed() for Derived State</h2>
<p>Use <code>computed()</code> to derive state from one or more signals. It memoises automatically — the computation only re-runs when its dependencies change.</p>

<h2>effect() for Side Effects</h2>
<p><code>effect()</code> runs a function whenever any signal it reads changes. Use it for logging, analytics, or syncing to localStorage — not for updating other signals.</p>

<h2>Migrating from RxJS</h2>
<p>Angular provides <code>toSignal()</code> and <code>toObservable()</code> to bridge the two worlds. You don't need to rewrite everything — migrate incrementally, starting with leaf components that have simple state.</p>

<h2>Conclusion</h2>
<p>Signals make Angular components easier to read, easier to test, and faster at runtime. Start using them in new components today.</p>
      `,
    },
    {
      slug: 'building-offline-first-flutter-apps',
      title: 'Building Offline-First Flutter Apps with Hive & Sync',
      excerpt: 'How to architect a Flutter app that works perfectly without a network connection and syncs reliably when connectivity returns.',
      cover: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      category: 'Flutter',
      tags: ['Flutter', 'Hive', 'Offline', 'Sync', 'Architecture'],
      readTime: 10,
      date: '2026-04-01',
      content: `
<h2>Why Offline-First Matters</h2>
<p>Users in areas with unreliable connectivity — or simply on the subway — still expect apps to work. An offline-first architecture means the app reads and writes to a local store first, then syncs with the server when connectivity is available.</p>

<h2>The Local Store: Hive</h2>
<p>Hive is a lightweight, NoSQL key-value database for Flutter. It's faster than SQLite for simple models and requires zero native dependencies.</p>
<pre><code>// Register adapter
Hive.registerAdapter(TaskAdapter());

// Open box
final box = await Hive.openBox&lt;Task&gt;('tasks');

// Write
await box.put(task.id, task);

// Read
final tasks = box.values.toList();</code></pre>

<h2>The Sync Layer</h2>
<p>The sync layer is responsible for pushing local changes to the server and pulling remote changes down. Key design decisions:</p>
<ul>
  <li><strong>Optimistic writes</strong> — write locally first, queue a sync job</li>
  <li><strong>Conflict resolution</strong> — last-write-wins is simplest; use vector clocks for complex cases</li>
  <li><strong>Connectivity listener</strong> — use <code>connectivity_plus</code> to trigger sync on reconnect</li>
</ul>

<h2>Connectivity-Aware Sync</h2>
<pre><code>Connectivity().onConnectivityChanged.listen((result) {
  if (result != ConnectivityResult.none) {
    syncService.flushQueue();
  }
});</code></pre>

<h2>Conclusion</h2>
<p>Offline-first is not just about handling errors gracefully — it's a fundamentally different architectural mindset. Start with Hive for local storage, build a simple sync queue, and your users will never notice a dropped connection again.</p>
      `,
    },
    {
      slug: 'ci-cd-flutter-angular-github-actions',
      title: 'CI/CD for Flutter & Angular with GitHub Actions',
      excerpt: 'A practical walkthrough of setting up automated build, test, and deployment pipelines for both Flutter and Angular projects using GitHub Actions.',
      cover: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      category: 'DevOps',
      tags: ['CI/CD', 'GitHub Actions', 'Flutter', 'Angular', 'DevOps'],
      readTime: 9,
      date: '2026-03-29',
      content: `
<h2>Why CI/CD?</h2>
<p>Automated pipelines catch bugs before they reach users, ensure consistent build environments, and free you from manual deploy steps. For solo developers and small teams alike, the upfront investment pays back immediately.</p>

<h2>Flutter Pipeline</h2>
<pre><code>name: Flutter CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.19.0'
      - run: flutter pub get
      - run: flutter test
      - run: flutter build apk --release</code></pre>

<h2>Angular Pipeline</h2>
<pre><code>name: Angular CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx ng test --watch=false --browsers=ChromeHeadless
      - run: npx ng build --configuration production</code></pre>

<h2>Deploy to Firebase Hosting</h2>
<p>Add a deploy step after the build using the official Firebase action. Store your <code>FIREBASE_TOKEN</code> in GitHub Secrets.</p>

<h2>Key Tips</h2>
<ul>
  <li>Cache <code>~/.pub-cache</code> and <code>node_modules</code> to cut build times by 60%</li>
  <li>Use <code>concurrency</code> groups to cancel stale runs on the same branch</li>
  <li>Add a staging environment that auto-deploys from <code>develop</code>, prod from <code>main</code></li>
</ul>

<h2>Conclusion</h2>
<p>A solid CI/CD pipeline is a multiplier on your development speed. Set it up once, and every commit benefits automatically.</p>
      `,
    },
    {
      slug: 'flutter-performance-tips-2024',
      title: '10 Flutter Performance Tips Every Dev Should Know',
      excerpt: 'From const constructors to RepaintBoundary, these practical techniques will make your Flutter app noticeably faster.',
      cover: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      category: 'Flutter',
      tags: ['Flutter', 'Performance', 'Dart', 'Optimisation'],
      readTime: 6,
      date: '2026-03-25',
      content: `
<h2>1. Use const Constructors Everywhere You Can</h2>
<p>Marking a widget <code>const</code> tells Flutter it will never change, allowing it to skip rebuilds entirely.</p>

<h2>2. RepaintBoundary for Complex Subtrees</h2>
<p>Wrap expensive widgets in <code>RepaintBoundary</code> to isolate their repaint cycle from the rest of the tree.</p>

<h2>3. ListView.builder over ListView</h2>
<p>Always use <code>ListView.builder</code> for long lists — it lazily builds only visible items instead of the entire list upfront.</p>

<h2>4. Avoid Rebuilding the Whole Tree</h2>
<p>Move state as low as possible in the tree. Use <code>ValueListenableBuilder</code> or signals to rebuild only the widgets that actually depend on the changing data.</p>

<h2>5. Image Caching with cached_network_image</h2>
<p>Replace <code>Image.network</code> with <code>CachedNetworkImage</code> to avoid re-downloading images on every rebuild.</p>

<h2>6. Profile Mode, Not Debug</h2>
<p>Never measure performance in debug mode. Run <code>flutter run --profile</code> to get realistic numbers.</p>

<h2>7. Reduce Shader Jank</h2>
<p>Use <code>flutter run --cache-sksl</code> during development to warm up shaders and eliminate first-frame jank in production.</p>

<h2>8. Minimize Widget Rebuilds with Keys</h2>
<p>Use <code>GlobalKey</code> and <code>ValueKey</code> strategically to preserve widget state across rebuilds and list reorders.</p>

<h2>9. Lazy-load Heavy Routes</h2>
<p>Defer loading heavy screens until the user navigates to them using deferred imports and <code>DeferredWidget</code>.</p>

<h2>10. Use Isolates for CPU-heavy Work</h2>
<p>Never block the main isolate with JSON parsing or image processing. Use <code>compute()</code> or a dedicated <code>Isolate</code> to keep the UI at 60fps.</p>
      `,
    },
    {
      slug: 'angular-standalone-components-deep-dive',
      title: 'Angular Standalone Components: Ditching NgModule for Good',
      excerpt: 'NgModule is no longer required in modern Angular. Here\'s how standalone components simplify your architecture and what to watch out for during migration.',
      cover: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      category: 'Angular',
      tags: ['Angular', 'TypeScript', 'Standalone', 'Architecture'],
      readTime: 7,
      date: '2026-03-22',
      content: `
<h2>The Problem with NgModule</h2>
<p>NgModule added an indirection layer that confused beginners and slowed down large apps. Declaring a component in one module and importing it in another was boilerplate that didn't add real value.</p>

<h2>What Standalone Means</h2>
<p>A standalone component is self-contained. It declares its own dependencies directly in its <code>imports</code> array — no NgModule required.</p>
<pre><code>@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: \`&lt;button&gt;&lt;ng-content /&gt;&lt;/button&gt;\`,
})</code></pre>

<h2>Bootstrapping Without NgModule</h2>
<pre><code>bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
});</code></pre>

<h2>Lazy Loading Standalone Components</h2>
<pre><code>const routes: Routes = [{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard').then(m => m.DashboardComponent)
}];</code></pre>

<h2>Migration Strategy</h2>
<ol>
  <li>Run <code>ng generate @angular/core:standalone</code> to auto-migrate components</li>
  <li>Convert leaf components first, then work up the tree</li>
  <li>Remove NgModules last, once all their declarations are standalone</li>
</ol>

<h2>Conclusion</h2>
<p>Standalone components make Angular dramatically more approachable. New projects should go standalone from day one.</p>
      `,
    },
  ];

  getAll(): BlogPost[] {
    return [...this.posts].sort((a, b) => b.date.localeCompare(a.date));
  }

  getRecent(count = 4): BlogPost[] {
    return this.getAll().slice(0, count);
  }

  getBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(p => p.slug === slug);
  }

  getByCategory(cat: string): BlogPost[] {
    return this.getAll().filter(p => p.category === cat);
  }

  getCategories(): string[] {
    return [...new Set(this.posts.map(p => p.category))];
  }
}
