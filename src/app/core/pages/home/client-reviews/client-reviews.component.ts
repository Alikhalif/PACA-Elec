// client-reviews.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

@Component({
  selector: 'app-client-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="reviews-section">
      <div class="container">
        <div class="reviews-header" [@fadeInUp]>
          <div class="hero-badge">
            <span class="badge-icon">⭐</span>
            <span>Ils nous recommandent</span>
          </div>
          <h1 class="hero-title">
            Ce que disent <span class="title-highlight">nos clients</span>
          </h1>
          <p class="section-subtitle">
            Découvrez ce que nos clients disent de nos services électriques
          </p>
        </div>

        <div class="reviews-grid" [@staggerReviews]="reviews.length">
          <div
            *ngFor="let review of reviews; let i = index"
            class="review-card"
            [@slideInUp]
            (mouseenter)="onCardHover(i)"
            (mouseleave)="onCardLeave(i)"
          >
            <div class="review-header">
              <div class="stars">
                <span
                  *ngFor="let star of getStars(review.rating); let j = index"
                  class="star"
                  [class.filled]="star"
                  [@starPulse]="hoveredCard === i ? j : null"
                >
                  ⭐
                </span>
              </div>
              <div class="review-meta">
                <span class="service-badge">{{ review.service }}</span>
                <span class="review-date">{{ review.date }}</span>
              </div>
            </div>

            <blockquote class="review-text">
              "{{ review.comment }}"
            </blockquote>

            <div class="review-footer">
              <div class="client-info">
                <div class="client-avatar">
                  {{ getInitials(review.name) }}
                </div>
                <div class="client-details">
                  <h4 class="client-name">{{ review.name }}</h4>
                  <!-- <p class="client-location">{{ review.location }}</p> -->
                </div>
              </div>
              <div class="verification-badge">
                <span class="verified-icon">✓</span>
                Vérifié
              </div>
            </div>
          </div>
        </div>

        <div class="reviews-stats" [@fadeInUp]>
          <div class="stat-item">
            <div class="stat-number">{{ reviews.length }}+</div>
            <div class="stat-label">Avis Clients</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ getAverageRating() }}/5</div>
            <div class="stat-label">Note Moyenne</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./client-reviews.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition(':enter', animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
    ]),
    trigger('slideInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition(':enter', animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
    ]),
    trigger('staggerReviews', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(200, animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ]),
    trigger('starPulse', [
      transition('* => *', [
        animate('0.3s ease-in-out', style({ transform: 'scale(1.2)' })),
        animate('0.3s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ClientReviewsComponent implements OnInit {
  hoveredCard: number | null = null;

  reviews: Review[] = [
    {
      id: 1,
      name: 'Thomas L.',
      location: 'Paris',
      rating: 5,
      comment: 'Intervention rapide à Paris à 2h du matin ! Électricien très professionnel, problème réglé en 30 minutes.',
      date: 'Il y a 2 jours',
      service: 'Dépannage Urgent'
    },
    {
      id: 2,
      name: 'Sophie D.',
      location: 'Lyon',
      rating: 5,
      comment: 'Tableau électrique remis aux normes sans surcoût. Je recommande !',
      date: 'Il y a 1 semaine',
      service: 'Mise aux Normes'
    },
    {
      id: 3,
      name: 'Marc R.',
      location: 'Marseille',
      rating: 5,
      comment: 'Installation complète de l\'éclairage LED. Travail impeccable et équipe très sympathique.',
      date: 'Il y a 2 semaines',
      service: 'Installation LED'
    },
    {
      id: 4,
      name: 'Claire M.',
      location: 'Toulouse',
      rating: 5,
      comment: 'Rénovation électrique complète de ma maison. Délais respectés et prix transparent.',
      date: 'Il y a 3 semaines',
      service: 'Rénovation'
    },
    {
      id: 5,
      name: 'Pierre B.',
      location: 'Nice',
      rating: 5,
      comment: 'Dépannage panne générale un dimanche. Service client exceptionnel !',
      date: 'Il y a 1 mois',
      service: 'Dépannage Weekend'
    },
    {
      id: 6,
      name: 'Marie K.',
      location: 'Nantes',
      rating: 5,
      comment: 'Installation borne de recharge électrique. Conseil personnalisé et installation parfaite.',
      date: 'Il y a 1 mois',
      service: 'Borne de Recharge'
    }
  ];

  ngOnInit() {
    // Component initialization
  }

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  getAverageRating(): number {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / this.reviews.length) * 10) / 10;
  }

  onCardHover(index: number) {
    this.hoveredCard = index;
  }

  onCardLeave(index: number) {
    this.hoveredCard = null;
  }
}
