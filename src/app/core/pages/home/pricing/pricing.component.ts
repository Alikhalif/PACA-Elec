import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PricingItem {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  features: string[];
  isPopular?: boolean;
  category: 'repair' | 'installation' | 'maintenance' | 'emergency';
}

interface Guarantee {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="pricing">
      <div class="pricing__container">
        <!-- Header -->
        <div class="pricing__header" [class.animate]="isLoaded">
          <div class="pricing__badge">
            <span class="pricing__badge-icon">🧾</span>
            <span class="pricing__badge-text">Tarifs transparents</span>
          </div>

          <!-- <h2 class="pricing__title">Tarifs & Forfaits</h2> -->
           <h1 class="hero-title">
            Nos <span class="title-highlight">tarifs transparents</span>
          </h1>
          <p class="pricing__subtitle">
            Nos tarifs sont clairs et transparents. Aucune surprise,
            aucun frais caché. Devis gratuit par téléphone ou en ligne.
          </p>
        </div>

        <!-- Category Filter -->
        <div class="pricing__filters" [class.animate]="isLoaded">
          <button
            *ngFor="let category of categories"
            class="filter-btn"
            [class.active]="selectedCategory === category.id"
            (click)="selectCategory(category.id)">
            <span class="filter-btn__icon">{{ category.icon }}</span>
            <span class="filter-btn__text">{{ category.name }}</span>
          </button>
        </div>

        <!-- Pricing Grid -->
        <div class="pricing__grid" [class.animate]="isLoaded">
          <div
            *ngFor="let item of filteredPricing; let i = index"
            class="pricing-card"
            [class.popular]="item.isPopular"
            [style.animation-delay.ms]="i * 100">

            <div class="pricing-card__header">
              <div class="pricing-card__icon">
                <span>{{ item.icon }}</span>
              </div>
              <h3 class="pricing-card__title">{{ item.title }}</h3>
              <p class="pricing-card__description">{{ item.description }}</p>
            </div>

            <!-- <div class="pricing-card__price">
              <span class="pricing-card__price-amount">{{ item.price }}</span>
              <span class="pricing-card__price-currency">TTC</span>
            </div> -->

            <div class="pricing-card__features">
              <div
                *ngFor="let feature of item.features"
                class="pricing-card__feature">
                <span class="feature-icon">✓</span>
                <span class="feature-text">{{ feature }}</span>
              </div>
            </div>

            <div class="zone-footer">
              <button class="contact-btn">
                <span class="btn-icon">📞</span>
                <span class="btn-text">Contacter</span>
                <div class="btn-ripple"></div>
              </button>
            </div>

            <div *ngIf="item.isPopular" class="pricing-card__badge">
              <span>Plus demandé</span>
            </div>
          </div>
        </div>

        <!-- Guarantees Section -->
        <div class="pricing__guarantees" [class.animate]="isLoaded">
          <h3 class="guarantees__title">Nos Garanties</h3>
          <div class="guarantees__grid">
            <div
              *ngFor="let guarantee of guarantees; let i = index"
              class="guarantee-card"
              [style.animation-delay.ms]="i * 150">
              <div class="guarantee-card__icon">
                <span>{{ guarantee.icon }}</span>
              </div>
              <h4 class="guarantee-card__title">{{ guarantee.title }}</h4>
              <p class="guarantee-card__description">{{ guarantee.description }}</p>
            </div>
          </div>
        </div>

        <!-- <div class="cta-card__content">
              <h3>Besoin d'un devis personnalisé ?</h3>
              <p>Contactez-nous pour obtenir un devis gratuit adapté à vos besoins spécifiques.</p>
            </div> -->


      </div>

      <!-- Quote Modal -->
      <!-- <div class="modal" [class.active]="showQuoteModal" (click)="closeQuoteModal()">
        <div class="modal__content" (click)="$event.stopPropagation()">
          <div class="modal__header">
            <h3>Demande de devis - {{ selectedService?.title }}</h3>
            <button class="modal__close" (click)="closeQuoteModal()">×</button>
          </div>

          <form class="quote-form" (ngSubmit)="submitQuote()" #quoteForm="ngForm">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Prénom *</label>
                <input type="text" id="firstName" [(ngModel)]="quoteData.firstName" name="firstName" required>
              </div>
              <div class="form-group">
                <label for="lastName">Nom *</label>
                <input type="text" id="lastName" [(ngModel)]="quoteData.lastName" name="lastName" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">Téléphone *</label>
                <input type="tel" id="phone" [(ngModel)]="quoteData.phone" name="phone" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" [(ngModel)]="quoteData.email" name="email">
              </div>
            </div>

            <div class="form-group">
              <label for="address">Adresse d'intervention *</label>
              <input type="text" id="address" [(ngModel)]="quoteData.address" name="address" required>
            </div>

            <div class="form-group">
              <label for="urgency">Niveau d'urgence</label>
              <select id="urgency" [(ngModel)]="quoteData.urgency" name="urgency">
                <option value="normal">Normal (sous 48h)</option>
                <option value="urgent">Urgent (sous 24h)</option>
                <option value="emergency">Urgence (sous 2h)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="description">Description détaillée</label>
              <textarea id="description" [(ngModel)]="quoteData.description" name="description" rows="4"
                        placeholder="Décrivez votre problème ou vos besoins..."></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="quoteData.acceptTerms" name="acceptTerms" required>
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">J'accepte les conditions générales et la politique de confidentialité</span>
              </label>
            </div>

            <button type="submit" class="btn btn--primary btn--full" [disabled]="!quoteForm.form.valid">
              <span class="btn-text">Envoyer la demande</span>
              <span class="btn-icon">📨</span>
            </button>
          </form>
        </div>
      </div> -->
    </section>
  `,
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {
  isLoaded = false;
  showQuoteModal = false;
  selectedCategory = 'all';
  selectedService: PricingItem | null = null;

  categories = [
    { id: 'all', name: 'Tous les services', icon: '🔧' },
    { id: 'repair', name: 'Réparations', icon: '⚡' },
    { id: 'installation', name: 'Installations', icon: '🔌' },
    { id: 'maintenance', name: 'Maintenance', icon: '🛠️' },
    { id: 'emergency', name: 'Urgences', icon: '🚨' }
  ];

  pricingItems: any[] = [
    {
      id: 'outlet-replacement',
      title: 'Remplacement prise/interrupteur',
      description: 'Remplacement simple d\'une prise ou interrupteur défectueux',
      // price: '59 €',
      icon: '🔌',
      category: 'repair',
      features: [
        'Déplacement inclus',
        'Fourniture comprise',
        'Test de fonctionnement',
        'Garantie 1 an'
      ]
    },
    {
      id: 'panel-repair',
      title: 'Réparation tableau électrique',
      description: 'Diagnostic et réparation de votre tableau électrique',
      // price: 'À partir de 120 €',
      icon: '⚡',
      category: 'repair',
      isPopular: true,
      features: [
        'Diagnostic complet',
        'Réparation sur place',
        'Test de sécurité',
        'Rapport d\'intervention'
      ]
    },
    {
      id: 'fault-finding',
      title: 'Recherche de panne',
      description: 'Diagnostic et localisation de panne électrique (1h)',
      // price: '75 €',
      icon: '🔍',
      category: 'emergency',
      features: [
        'Diagnostic professionnel',
        'Rapport détaillé',
        'Déduit si réparation',
        'Conseils préventifs'
      ]
    },
    {
      id: 'installation-outlet',
      title: 'Installation nouvelle prise',
      description: 'Installation d\'une nouvelle prise électrique',
      // price: '85 €',
      icon: '🔧',
      category: 'installation',
      features: [
        'Perçage et raccordement',
        'Fourniture incluse',
        'Mise aux normes',
        'Test de conformité'
      ]
    },
    {
      id: 'emergency-intervention',
      title: 'Intervention d\'urgence',
      description: 'Intervention rapide 24h/24, 7j/7',
      // price: '150 €',
      icon: '🚨',
      category: 'emergency',
      features: [
        'Intervention sous 20 minutes',
        'Disponible 24h/24',
        'Weekends et jours fériés',
        'Première heure incluse'
      ]
    },
    {
      id: 'maintenance-check',
      title: 'Contrôle installation',
      description: 'Vérification complète de votre installation',
      // price: '120 €',
      icon: '🛠️',
      category: 'maintenance',
      features: [
        'Contrôle de sécurité',
        'Test des protections',
        'Rapport détaillé',
        'Conseils d\'amélioration'
      ]
    }
  ];

  guarantees: Guarantee[] = [
    {
      icon: '🚫',
      title: 'Pas de frais cachés',
      description: 'Nos tarifs sont transparents et définitifs. Aucune surprise sur la facture.'
    },
    {
      icon: '📋',
      title: 'Facture détaillée',
      description: 'Vous recevez une facture claire avec le détail de tous les travaux effectués.'
    },
    {
      icon: '📞',
      title: 'Devis gratuit',
      description: 'Estimation gratuite par téléphone ou en ligne, sans engagement.'
    }
  ];

  quoteData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    urgency: 'normal',
    description: '',
    acceptTerms: false
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 300);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  get filteredPricing() {
    if (this.selectedCategory === 'all') {
      return this.pricingItems;
    }
    return this.pricingItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  requestQuote(service: PricingItem) {
    this.selectedService = service;
    this.openQuoteModal();
  }

  callForQuote() {
    window.location.href = 'tel:+33756935200';
  }

  openQuoteForm() {
    this.selectedService = null;
    this.openQuoteModal();
  }

  openQuoteModal() {
    this.showQuoteModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal() {
    this.showQuoteModal = false;
    document.body.style.overflow = 'auto';
  }

  submitQuote() {
    console.log('Quote submitted:', {
      service: this.selectedService,
      data: this.quoteData
    });

    // Handle form submission here
    this.closeQuoteModal();

    // Reset form
    this.quoteData = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      urgency: 'normal',
      description: '',
      acceptTerms: false
    };
  }
}
