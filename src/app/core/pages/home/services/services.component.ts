import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services-section">
      <!-- Background Effects -->
      <div class="background-effects">
        <div class="tool-icon floating-wrench"></div>
        <div class="tool-icon floating-pipe"></div>
        <div class="tool-icon floating-drop"></div>
        <div class="tool-icon floating-wrench"></div>
        <div class="tool-icon floating-pipe"></div>
        <div class="tool-icon floating-drop"></div>
        <div class="tool-icon floating-wrench"></div>
        <div class="tool-icon floating-pipe"></div>
        <div class="tool-icon floating-drop"></div>
        <div class="tool-icon floating-wrench"></div>
        <div class="tool-icon floating-pipe"></div>
        <div class="tool-icon floating-drop"></div>
      </div>

      <div class="container">
        <!-- Header Section -->

        <!-- Services Hero -->
        <div class="services-hero">
          <div class="hero-content animate-fade-in-up">
            <div class="hero-badge">
              <span class="badge-icon">🛠️</span>
              <span>Nos prestations</span>
            </div>
            <h1 class="hero-title">
              Services de <span class="title-highlight">d’électricien </span> complets
            </h1>
            <p class="hero-subtitle">
              Intervention <span class="emergency-highlight">24h/24 - 7j/7</span> pour tous vos besoins en électricité.
              <br>
              De l’urgence à la rénovation complète, nos experts vous accompagnent avec réactivité et savoir-faire.
            </p>

            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">24h</span>
                <span class="stat-label">Service d'urgence</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">15 ans</span>
                <span class="stat-label">D'expérience</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Satisfaction client</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Grid -->
        <div class="services-grid">
          <div
            *ngFor="let service of services; let i = index"
            class="service-card"
            [class.animate]="isVisible"
            [style.animation-delay]="(i * 200) + 'ms'"
            [attr.data-color]="service.color">

            <div class="card-header">
              <div class="icon-container" [style.background]="'linear-gradient(135deg, ' + service.color + '20, ' + service.color + '40)'">
                <i [innerHTML]="service.icon" class="service-icon"></i>
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
            </div>

            <div class="card-content">
              <p class="service-description">{{ service.description }}</p>

              <div class="features-list">
                <div
                  *ngFor="let feature of service.features"
                  class="feature-item">
                  <span class="feature-bullet" [style.background-color]="service.color">✓</span>
                  <span class="feature-text">{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- <div class="card-footer">
              <button class="cta-button" [style.background-color]="service.color">
                Demander un devis
                <span class="button-arrow">→</span>
              </button>
            </div> -->

            <!-- Hover Effect Background -->
            <div class="hover-bg" [style.background]="'linear-gradient(135deg, ' + service.color + '10, ' + service.color + '20)'"></div>
          </div>
        </div>

        <!-- Emergency Contact Section -->
        <div class="emergency-section" [class.animate]="isVisible">
          <div class="emergency-content">
            <div class="emergency-icon">🚨</div>
            <div class="emergency-text">
              <h3>Urgence Électrique 24h/24</h3>
              <p>Intervention rapide pour toute urgence électrique</p>
            </div>
            <a href="tel:+33756935200" class="emergency-button">
              <span class="phone-icon">📞</span>
              Appeler Maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  isVisible = false;

  services: Service[] = [
    {
      id: 1,
      title: 'Réparation Électrique',
      description: 'Intervention rapide pour toute panne électrique, que ce soit pour une entreprise ou un particulier. Nos spécialistes diagnostiquent et réparent efficacement.',
      icon: '🔧',
      features: [
        'Réparation de prise électrique',
        'Réparation de tableau électrique',
        'Réparation d\'interrupteur',
        'Réparation de radiateur électrique',
        'Réparation d\'éclairage',
        'Réparation moteur volets roulants'
      ],
      color: '#FF6B35'
    },
    {
      id: 2,
      title: 'Recherche de Panne',
      description: 'Identification précise de l\'origine des pannes électriques grâce à notre expertise et nos outils de diagnostic professionnels.',
      icon: '🔍',
      features: [
        'Diagnostic complet des installations',
        'Détection d\'appareils défectueux',
        'Test des circuits électriques',
        'Localisation des courts-circuits',
        'Vérification des disjoncteurs',
        'Remplacement des éléments défaillants'
      ],
      color: '#4ECDC4'
    },
    {
      id: 3,
      title: 'Installation Électrique',
      description: 'Installation complète d\'équipements électriques pour bâtiments neufs ou en rénovation, en respectant toutes les normes en vigueur.',
      icon: '⚡',
      features: [
        'Installation prise électrique',
        'Installation VMC simple/double flux',
        'Installation radiateur électrique',
        'Installation tableau électrique',
        'Installation appareils électriques',
        'Mise aux normes complète'
      ],
      color: '#45B7D1'
    },
    {
      id: 4,
      title: 'Contrôle & Diagnostic',
      description: 'Vérification de conformité de vos installations électriques et accompagnement dans les démarches de mise aux normes.',
      icon: '📋',
      features: [
        'Diagnostic électrique complet',
        'Contrôle de conformité',
        'Vérification des normes',
        'Rapport détaillé',
        'Conseils de mise aux normes',
        'Suivi réglementaire'
      ],
      color: '#96CEB4'
    }
  ];

  ngOnInit() {
    // Trigger animation after component initialization
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
}
