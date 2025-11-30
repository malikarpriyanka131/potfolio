import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly apiBase = 'https://api.github.com';

  constructor() {}

  async fetchPinnedRepos(username: string) {
    // GitHub doesn't provide a pinned repos API; we try to fetch user's repos and pick top-starred as fallback
    const token = environment.github?.token || '';
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json'
    };
    if (token) headers['Authorization'] = `token ${token}`;

    const res = await fetch(`${this.apiBase}/users/${username}/repos?per_page=100`, { headers });
    if (!res.ok) throw new Error('Failed to fetch repos');
    const repos = await res.json();
    // sort by stargazers_count desc and return top 6
    repos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
    return repos.slice(0, 6).map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language
    }));
  }
}
