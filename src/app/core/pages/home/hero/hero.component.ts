import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- <section class="hero">


      <div class="hero__background">
        <div class="hero__background-overlay"></div>
        <div class="hero__particles">
          <div class="particle" *ngFor="let particle of particles; let i = index"
              [style.left.%]="particle.x"
              [style.top.%]="particle.y"
              [style.animation-delay.s]="particle.delay"></div>
        </div>
      </div>

      <div class="hero__container">
        <div class="hero__content">
          <div class="hero__badge" [class.animate]="isLoaded">
            <span class="hero__badge-icon">🔌</span>
            <span class="hero__badge-text">Service 24h/24</span>
          </div>

          <h1 class="hero__title" [class.animate]="isLoaded">
            <span class="hero__title-main">Électricien Urgence 24/7</span>
            <span class="hero__title-sub">Intervention en moins de 2h
              <span class="hero__title-location">sur PACA</span>
            </span>

          </h1>

          <p class="hero__subtitle" [class.animate]="isLoaded">
            Une Panne de courant, tableau HS, prise défectueuse ? Un électricien
            agréé intervient rapidement En 20 minutes 7j/7.
          </p>

          <div class="hero__features" [class.animate]="isLoaded">
            <div class="feature" *ngFor="let feature of features; let i = index"
                 [style.animation-delay.ms]="200 + i * 100">
              <div class="feature__icon">{{ feature.icon }}</div>
              <span class="feature__text">{{ feature.text }}</span>
            </div>
          </div>

            <button class="btn btn--primary" (click)="callNow()">
              <span class="btn__icon">📞</span>
              <span class="btn__text">Appel immédiat</span>
              <div class="btn__ripple"></div>
            </button>

            <button class="btn btn--secondary" (click)="openQuoteForm()">
              <span class="btn__icon">💡</span>
              <span class="btn__text">Devis gratuit</span>
              <div class="btn__ripple"></div>
            </button>
          </div>

          <div class="hero-cta animate-fade-in-up" style="animation-delay: 0.6s">
            <a href="tel:+33756935200" class="cta-btn cta-primary pulse-animation">
              <span class="cta-icon">📞</span>
              <span class="cta-text">Appelez un électricien maintenant</span>
              <span class="cta-badge">URGENT</span>
            </a>
          </div>
        </div>

        <div class="hero__visual">
          <div class="hero__visual-card" [class.animate]="isLoaded">
            <div class="card__header">
              <div class="card__status">
                <div class="status-dot status-dot--online"></div>
                <span>Électricien disponible</span>
              </div>
              <div class="card__time">{{ currentTime }}</div>
            </div>

            <div class="card__content">
              <div class="card__icon">
                <div class="electrical-icon">
                  <div class="electrical-icon__bolt"></div>
                </div>
              </div>

              <div class="card__info">
                <h3>Intervention rapide</h3>
                <p>Temps de réponse moyen: <strong>45 minutes</strong></p>
                <div class="card__progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [class.animate]="isLoaded"></div>
                  </div>
                  <span class="progress-text">Disponibilité: 98%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="hero__floating-elements">
            <div class="floating-element floating-element--1" [class.animate]="isLoaded">⚡</div>
            <div class="floating-element floating-element--2" [class.animate]="isLoaded">🔧</div>
            <div class="floating-element floating-element--3" [class.animate]="isLoaded">⚡</div>
          </div>
        </div>


      <div class="modal" [class.active]="showQuoteForm" (click)="closeQuoteForm()">
        <div class="modal__content" (click)="$event.stopPropagation()">
          <div class="modal__header">
            <h3>Demande de devis gratuit</h3>
            <button class="modal__close" (click)="closeQuoteForm()">×</button>
          </div>

          <form class="quote-form" (ngSubmit)="submitQuote()" #quoteForm="ngForm">
            <div class="form-group">
              <label for="name">Nom complet *</label>
              <input type="text" id="name" [(ngModel)]="quote.name" name="name" required>
            </div>

            <div class="form-group">
              <label for="phone">Téléphone *</label>
              <input type="tel" id="phone" [(ngModel)]="quote.phone" name="phone" required>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" [(ngModel)]="quote.email" name="email">
            </div>

            <div class="form-group">
              <label for="issue">Type de problème *</label>
              <select id="issue" [(ngModel)]="quote.issue" name="issue" required>
                <option value="">Sélectionnez le problème</option>
                <option value="panne-courant">Panne de courant</option>
                <option value="tableau-hs">Tableau électrique HS</option>
                <option value="prise-defectueuse">Prise défectueuse</option>
                <option value="installation">Nouvelle installation</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div class="form-group">
              <label for="description">Description du problème</label>
              <textarea id="description" [(ngModel)]="quote.description" name="description" rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn--primary btn--full" [disabled]="!quoteForm.form.valid">
              <span class="btn__text">Envoyer la demande</span>
              <div class="btn__ripple"></div>
            </button>
          </form>
        </div>
      </div>
    </section> -->

    <section class="hero-section">
      <!-- Background with Glassmorphism Effect -->
      <div class="hero-background">
        <div class="background-image"></div>
        <div class="glass-overlay"></div>
        <div class="animated-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="hero-container">
        <div class="hero-content" [class.visible]="isVisible">
          <!-- Badge -->
          <div class="">
            <div class="hero-badge animate-fade-in-up" style="animation-delay: 0.1s">
              <span class="badge-icon">⚡</span>
              <span class="badge-text">Intervention d'urgence 24h/24</span>
            </div>

            <a href="tel:+33756935200" class="hero-badge animate-fade-in-up" style="animation-delay: 0.6s">
              <span class="badge-icon">📞</span>
              <span class="badge-text">07 56 93 52 00</span>
            </a>
          </div>


          <!-- Main Title -->
          <h1 class="hero-title animate-fade-in-up" style="animation-delay: 0.2s">
  <span class="title-highlight">Électricien 24h/24</span>

  <div class="title-line-spacer"></div>

  Une panne de courant ?

  <div class="title-line-spacer"></div>

  Une panne sur votre tableau électrique ?

  <div class="title-line-spacer"></div>

  Un électricien agréé chez vous en <span class="urgent-text">20 minutes !</span>

  <div class="title-line-spacer"></div>

  Intervention <span class="urgent-text">7j/7 24h/24</span>
</h1>

          <!-- Subtitle -->
          <!-- <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.4s">

            Intervention en moins de 20 minute
          </p> -->

          <!-- Main CTA Buttons -->
          <div class="hero-cta animate-fade-in-up" style="animation-delay: 0.6s">
            <a href="tel:+33756935200" class="cta-btn cta-primary pulse-animation">
              <span class="cta-icon">📞</span>
              <span class="cta-text">Appelez un électricien maintenant</span>
              <span class="cta-badge">URGENT</span>
            </a>
          </div>

          <!-- Features Grid -->
          <div class="features-grid animate-fade-in-up" style="animation-delay: 0.8s">
            <div class="feature-card"
                 *ngFor="let feature of features; let i = index"
                 [style.animation-delay.s]="1.2 + (i * 0.2)">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-text">{{ feature.text }}</div>
              <div class="feature-check">✅</div>
            </div>
          </div>
        </div>
      </div>
    </section>

  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  isVisible = true;

  features = [
    { icon: '⚡', text: 'Intervention urgente sous 2h' },
    { icon: '🆓', text: 'Déplacement gratuit si réparation sur place' },
    { icon: '👨‍🔧', text: 'Techniciens certifiés, devis transparent' },
    { icon: '💳', text: 'Paiement CB, virement, ou sur facture' }
  ];

  private animationInterval: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private title: Title, private meta: Meta
  ) {
    // this.title.setTitle('Plombier 24h/24 – Intervention rapide en PACA | depannageplomberie-paca.com');

    this.meta.addTags([
      // { name: 'description', content: 'Plombier en région PACA – Dépannage rapide, installation, rénovation et recherche de fuite. Interventions en moins de 2h.' },
      // { name: 'keywords', content: 'plombier PACA, urgence plomberie, dépannage fuite, plombier Marseille, Aix, Toulon, Nice, PACA' },
      // { name: 'robots', content: 'index, follow' },
      // { property: 'og:title', content: 'Plombier PACA – Urgences 24h/24 | depannageplomberie-paca.com' },
      // { property: 'og:description', content: 'Un plombier de confiance en région PACA. Intervention rapide, devis gratuit et techniciens certifiés.' },
      // { property: 'og:type', content: 'website' },
      // { property: 'og:url', content: 'https://www.depannageplomberie-paca.com/home' },
    ]);
  }


  ngOnInit() {
    // Trigger animations on load
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isVisible = true;
      }, 10);
      this.startShapeAnimation();
    }
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  @HostListener('window:scroll', [])
    onWindowScroll() {
      if (isPlatformBrowser(this.platformId)) {
      const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement;
      if (scrollIndicator) {
        const opacity = Math.max(0, 1 - window.pageYOffset / 300);
        scrollIndicator.style.opacity = opacity.toString();
      }
    }
  }

  private startShapeAnimation() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const element = shape as HTMLElement;
      const delay = index * 2000;

      setTimeout(() => {
        element.style.animationDelay = '0s';
        element.classList.add('floating');
      }, delay);
    });
  }
}
