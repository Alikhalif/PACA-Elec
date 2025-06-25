import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="hero">
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

          <!-- <div class="hero__actions" [class.animate]="isLoaded">
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
          </div> -->

          <!-- Main CTA Buttons -->
          <div class="hero-cta animate-fade-in-up" style="animation-delay: 0.6s">
            <a href="tel:+33756935200" class="cta-btn cta-primary pulse-animation">
              <span class="cta-icon">📞</span>
              <span class="cta-text">Appelez un électricien maintenant</span>
              <span class="cta-badge">URGENT</span>
            </a>
            <!-- <a routerLink="/devis" class="cta-btn cta-secondary" (click)="openQuoteForm()">
              <span class="cta-icon">📩</span>
              <span class="cta-text">Devis gratuit</span>
            </a> -->
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
      </div>

      <!-- Quote Form Modal -->
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
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  isLoaded = false;
  showQuoteForm = false;
  currentTime = '';

  particles = Array.from({ length: 15 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  features = [
    { icon: '⚡', text: 'Intervention sous 2h' },
    { icon: '🚫', text: 'Déplacement gratuit' },
    { icon: '✅', text: 'Électriciens certifiés' },
    { icon: '📋', text: 'Devis sans engagement' }
  ];

  quote = {
    name: '',
    phone: '',
    email: '',
    issue: '',
    description: ''
  };

  ngOnInit() {
      this.isLoaded = true;

    // this.updateTime();
    // setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  callNow() {
    // Simulate phone call
    window.location.href = 'tel:+33756935200';
  }

  openQuoteForm() {
    this.showQuoteForm = true;
    document.body.style.overflow = 'hidden';
  }

  closeQuoteForm() {
    this.showQuoteForm = false;
    document.body.style.overflow = 'auto';
  }

  submitQuote() {
    console.log('Quote submitted:', this.quote);
    // Handle form submission
    this.closeQuoteForm();

    // Reset form
    this.quote = {
      name: '',
      phone: '',
      email: '',
      issue: '',
      description: ''
    };
  }
}
