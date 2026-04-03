import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayout implements OnInit {
  currentRoute = '';
  isSidebarOpen = true;

  menuItems = [
    { path: 'dashboard', label: 'Dashboard', icon: '📊' },
    { path: 'categorias', label: 'Categorías', icon: '📁' },
    { path: 'productos', label: 'Productos', icon: '📦' },
    { path: 'contactos', label: 'Mensajes', icon: '✉️' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.url.split('/').filter((s: string) => s);
        this.currentRoute = segments[segments.length - 1] || 'dashboard';
      });

    const segments = this.router.url.split('/').filter(s => s);
    this.currentRoute = segments[segments.length - 1] || 'dashboard';
  }

  go(path: string) {
    this.router.navigate(['/admin', path]);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isActive(path: string): boolean {
    return this.currentRoute === path;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
