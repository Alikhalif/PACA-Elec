import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InterventionZone {
  department: string;
  cities: string[];
  color: string;
  icon: string;
}

@Component({
  selector: 'app-intervention-zones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="intervention-zones">
      <div class="container">
        <!-- Header Section -->
        <div class="header-section">
          <div class="header-content">
            <span class="badge">🗺️ COUVERTURE RÉGIONALE</span>
            <h2 class="main-title">
              Zones d'<span class="highlight">Intervention</span>
            </h2>
            <p class="subtitle">
              Service d'électricité générale et dépannage d'urgence dans toute la région PACA
            </p>
          </div>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">5</div>
              <div class="stat-label">Départements</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">19</div>
              <div class="stat-label">Villes</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24h/7j</div>
              <div class="stat-label">Disponibilité</div>
            </div>
          </div>
        </div>

        <!-- Zones Grid -->
        <div class="zones-grid">
          <div
            *ngFor="let zone of interventionZones; let i = index"
            class="zone-card"
            [style.animation-delay]="(i * 0.1) + 's'"
            (mouseenter)="onCardHover(i)"
            (mouseleave)="onCardLeave(i)"
          >
            <div class="zone-header" [style.background]="zone.color">
              <div class="zone-icon">{{ zone.icon }}</div>
              <div class="zone-department">{{ zone.department }}</div>
              <div class="zone-badge">{{ zone.cities.length }} villes</div>
            </div>

            <div class="zone-content">
              <div class="cities-list">
                <div
                  *ngFor="let city of zone.cities; let cityIndex = index"
                  class="city-item"
                  [style.animation-delay]="(cityIndex * 0.05) + 's'"
                >
                  <div class="city-dot"></div>
                  <span class="city-name">{{ city }}</span>
                </div>
              </div>
            </div>

            <div class="zone-footer">
              <button class="contact-btn" (click)="callNow()">
                <span class="btn-icon">📞</span>
                <span class="btn-text">Contacter</span>
                <div class="btn-ripple"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <div class="cta-content">
            <h3>Besoin d'un électricien dans votre ville ?</h3>
            <p>Intervention rapide et devis gratuit dans toute la région PACA</p>
            <a href="tel:+33756935200" class="cta-button">
              <span>🚨 Dépannage d'urgence</span>
              <div class="cta-ripple"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./intervention-zones.component.scss']
})
export class InterventionZonesComponent implements OnInit {
  interventionZones: InterventionZone[] = [
    {
      department: 'Bouches-du-Rhône',
      cities: ['Marseille', 'Aubagne', 'Aix', 'Allauch', 'Cassis'],
      color: 'linear-gradient(135deg, #2563eb, #1e40af)',
      icon: '🏙️'
    },
    {
      department: 'Var',
      cities: ['Toulon', 'Fréjus', 'La Seyne', 'Saint-Tropez'],
      color: 'linear-gradient(135deg, #dc2626, #b91c1c)',
      icon: '⛵'
    },
    {
      department: 'Alpes-Maritimes',
      cities: ['Nice', 'Antibes', 'Cannes'],
      color: 'linear-gradient(135deg, #16a34a, #15803d)',
      icon: '🌊'
    },
    {
      department: 'Vaucluse',
      cities: ['Avignon', 'Cavaillon', 'Orange'],
      color: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      icon: '🏰'
    },
    {
      department: 'Alpes-de-Haute-Provence',
      cities: ['Manosque', 'Digne'],
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: '⛰️'
    }
  ];

  ngOnInit() {
    // Component initialization
  }

  onCardHover(index: number) {
    // Handle card hover effects
  }

  onCardLeave(index: number) {
    // Handle card leave effects
  }

  callNow(){
    window.location.href = 'tel:+33756935200';
  }
}
