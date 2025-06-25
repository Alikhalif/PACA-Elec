import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private router = inject(Router);
  private currentSection: string = 'home';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.handleNavigation(event.urlAfterRedirects);
    });
  }

  navigateTo(section: string) {
    this.router.navigate([], { fragment: section });
    this.scrollTo(section);
  }

  private handleNavigation(url: string) {
    const fragment = url.split('#')[1];
    if (fragment) {
      this.scrollTo(fragment);
    }
  }

  private scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.currentSection = sectionId;
    }
  }
}
