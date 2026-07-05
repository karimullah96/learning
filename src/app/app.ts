
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Post {
  id: number;
  avatar: string;
  name: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

interface Story {
  id: number;
  name: string;
  avatar: string;
  bg: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Facebook Clone');

  protected readonly stories = signal<Story[]>([
    { id: 1, name: 'Karim',   avatar: 'K', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 2, name: 'Sarah',   avatar: 'S', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 3, name: 'Ahmed',   avatar: 'A', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 4, name: 'Maya',    avatar: 'M', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 5, name: 'Omar',    avatar: 'O', bg: 'linear-gradient(135deg, #fa709a, #fee140)' },
  ]);

  protected readonly posts = signal<Post[]>([
    {
      id: 1,
      avatar: 'S',
      name: 'Sarah Johnson',
      time: '2 hrs',
      content: 'Just finished my morning hike! The view from the top was absolutely worth it. 🏔️ Nature never fails to amaze me.',
      likes: 142,
      comments: 23,
      shares: 5
    },
    {
      id: 2,
      avatar: 'A',
      name: 'Ahmed Hassan',
      time: '5 hrs',
      content: 'Excited to announce that I just launched my new web application! 🚀 It\'s been months of hard work and I couldn\'t be happier with the result. Check it out!',
      likes: 89,
      comments: 31,
      shares: 12
    },
    {
      id: 3,
      avatar: 'M',
      name: 'Maya Chen',
      time: '8 hrs',
      content: 'Happy weekend everyone! ☀️ Spending time with family is the best. Don\'t forget to appreciate the little moments in life. ❤️',
      likes: 210,
      comments: 45,
      shares: 8
    }
  ]);

  protected readonly contacts = signal<Contact[]>([
    { id: 1, name: 'Karim',   avatar: 'K', online: true  },
    { id: 2, name: 'Sarah',   avatar: 'S', online: true  },
    { id: 3, name: 'Ahmed',   avatar: 'A', online: false },
    { id: 4, name: 'Maya',    avatar: 'M', online: true  },
    { id: 5, name: 'Omar',    avatar: 'O', online: false },
    { id: 6, name: 'Layla',   avatar: 'L', online: true  },
    { id: 7, name: 'Yusuf',   avatar: 'Y', online: false },
    { id: 8, name: 'Nadia',   avatar: 'N', online: true  },
  ]);

  protected likedPosts = signal<Set<number>>(new Set());

  toggleLike(postId: number) {
    const current = new Set(this.likedPosts());
    if (current.has(postId)) {
      current.delete(postId);
      this.posts.update(posts =>
        posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p)
      );
    } else {
      current.add(postId);
      this.posts.update(posts =>
        posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
      );
    }
    this.likedPosts.set(current);
  }
}