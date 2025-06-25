import { Component, HostListener, inject } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { PricingComponent } from "./pricing/pricing.component";
import { FaqComponent } from "./faq/faq.component";
import { ContactComponent } from "./contact/contact.component";
import { ServicesComponent } from "./services/services.component";
import { ClientReviewsComponent } from "./client-reviews/client-reviews.component";
import { InterventionZonesComponent } from "./intervention-zones/intervention-zones.component";
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, PricingComponent, FaqComponent, ContactComponent, ServicesComponent, ClientReviewsComponent, InterventionZonesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query('.section-component', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('600ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('scrollAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('100ms', [
            animate('500ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent {
  private viewportScroller = inject(ViewportScroller);
  private router = inject(Router);

  sections = [
    'hero',
    'services',
    'tarifs',
    'zones',
    'avis',
    'contact',
    'faq',
  ];

  currentSection = 'hero';


  ngOnInit() {
    this.router.events.subscribe(() => {
      const fragment = this.router.url.split('#')[1];
      if (fragment) {
        this.currentSection = fragment;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.pageYOffset;

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
          this.currentSection = section;
          history.replaceState(null, '', `#${section}`);
          break;
        }
      }
    }
  }

  scrollTo(section: string) {
    this.currentSection = section;
    this.viewportScroller.scrollToAnchor(section);
  }
}
