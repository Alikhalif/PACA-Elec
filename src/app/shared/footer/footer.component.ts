// footer.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer" [@fadeInUp]>
      <!-- Main Footer Content -->
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">

            <!-- Company Info -->
            <div class="footer-section" [@slideInLeft]>
              <div class="footer-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="220" height="90" viewBox="0 0 700 120">
            <style>
              .bg-circle { fill: #2563eb; } /* Secondary */
              .bolt { fill: #fbbf24; } /* Accent */
              .brand-text {
                font-family: 'Montserrat', sans-serif;
                font-weight: 900;
                font-size: 55px;
                fill: #fbbf24; /* Primary */
              }
              .sub-text {
                font-family: 'Montserrat', sans-serif;
                font-size: 30px;
                fill: #6b7280; /* Light text */
              }
            </style>
            <g>
              <!-- Circle and lightning bolt -->
              <circle cx="50" cy="60" r="42" class="bg-circle"/>
              <polygon class="bolt" points="42,25 66,25 54,55 75,55 46,95 54,60 32,60"/>

              <!-- Brand name -->
              <text x="110" y="60" class="brand-text">Elec-Urgence</text>
              <text x="112" y="100" class="sub-text">Électricien 24h/24 – PACA</text>
            </g>
          </svg>
              </div>

              <p class="company-description">
                Intervention d'urgence 24h/24 et 7j/7 pour tous vos problèmes électriques.
                Électriciens certifiés et agréés, intervention rapide et tarifs transparents.
              </p>

              <div class="certifications">
                <div class="cert-badge" *ngFor="let cert of certifications" [@scaleIn]>
                  <span>{{ cert }}</span>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-section" [@slideInUp]>
              <h4>Nos Services</h4>
              <ul class="footer-links">
                <li *ngFor="let service of services; let i = index"
                    [@staggerLinks]="i"
                    (mouseenter)="onLinkHover($event)"
                    (mouseleave)="onLinkLeave($event)">
                  <a href="#" class="footer-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0L10 6H6L8 0Z"/>
                      <path d="M8 16L6 10H10L8 16Z"/>
                      <circle cx="8" cy="8" r="2"/>
                    </svg>
                    {{ service }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div class="footer-section" [@slideInUp]>
              <h4>Contact Urgence</h4>
              <div class="contact-info">
                <div class="contact-item" [@pulseAnimation]>
                  <div class="contact-icon emergency">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3h16l-8 5L2 3z"/>
                      <path d="M2 3v14h16V3l-8 5L2 3z"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Urgence 24h/24</span>
                    <a href="tel:+33756935200" class="contact-value emergency-phone">
                      📞 07 56 93 52 00
                    </a>
                  </div>
                </div>

                <!-- <div class="contact-item">
                  <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2L15 7H12V18H8V7H5L10 2Z"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Email</span>
                    <a href="mailto:contact@elec-urgence.fr" class="contact-value">
                      contact@ elec-urgence.fr
                    </a>
                  </div>
                </div> -->

                <div class="contact-item">
                  <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2C6.7 2 4 4.7 4 8C4 12.5 10 18 10 18S16 12.5 16 8C16 4.7 13.3 2 10 2ZM10 10.5C8.6 10.5 7.5 9.4 7.5 8S8.6 5.5 10 5.5S12.5 6.6 12.5 8S11.4 10.5 10 10.5Z"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Zone d'intervention</span>
                    <span class="contact-value">Île-de-France & PACA</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Service Hours -->
            <div class="footer-section" [@slideInRight]>
              <h4>Horaires & Garanties</h4>
              <div class="service-hours">
                <div class="hours-item">
                  <span class="hours-label">Urgences</span>
                  <span class="hours-value available">24h/24 - 7j/7</span>
                </div>
                <div class="hours-item">
                  <span class="hours-label">Devis gratuit</span>
                  <span class="hours-value">Sans engagement</span>
                </div>
                <div class="hours-item">
                  <span class="hours-label">Intervention</span>
                  <span class="hours-value">20 minutes</span>
                </div>
              </div>

              <div class="guarantees">
                <div class="guarantee-item" *ngFor="let guarantee of guarantees" [@fadeInScale]>
                  <div class="guarantee-icon">✓</div>
                  <span>{{ guarantee }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-content">
            <div class="copyright">
              <p>&copy; {{ currentYear }} Elec-Urgence. Tous droits réservés.</p>
            </div>
            <div class="legal-links">
              <a href="#" class="legal-link">Mentions légales</a>
              <a href="#" class="legal-link">CGV</a>
              <a href="#" class="legal-link">Politique de confidentialité</a>
            </div>
            <div class="social-links">
              <!-- <a href="#" class="social-link" *ngFor="let social of socialLinks"
                 [title]="social.name"
                 [@socialHover]>
                <svg width="24" height="24" [innerHTML]="social.icon"></svg>
              </a> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Emergency CTA -->
      <!-- <div class="emergency-cta" [@emergencyPulse]>
        <a href="tel:+33756935200" class="emergency-button">
          <div class="emergency-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3h16l-8 5L2 3z"/>
              <path d="M2 3v14h16V3l-8 5L2 3z"/>
            </svg>
          </div>
          <span>Urgence 24h/24</span>
        </a>
      </div> -->
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('0.6s 0.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s 0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('0.6s 0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('staggerLinks', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.4s 0.8s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('pulseAnimation', [
      state('pulse', style({})),
      transition('* => pulse', [
        animate('0.6s ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('0.6s ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('emergencyPulse', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('socialHover', [
      state('hover', style({ transform: 'translateY(-3px) scale(1.1)' })),
      transition('* <=> hover', animate('0.3s ease-out'))
    ])
  ]
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  certifications = ['NF C 15-100', 'Certifié RGE', 'Agréé Assurance'];

  services = [
    'Dépannage électrique 24h/24',
    'Tableau électrique',
    'Prises et interrupteurs',
    'Mise aux normes',
    'Diagnostic électrique',
    'Chauffe-eau électrique'
  ];

  guarantees = [
    'Devis gratuit',
    'Pas de frais cachés',
    'Intervention sous 20 minutes',
    'Électriciens certifiés'
  ];

  socialLinks = [
    { name: 'Facebook', icon: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>' },
    { name: 'Twitter', icon: '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>' },
    { name: 'LinkedIn', icon: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' }
  ];

  ngOnInit() {
    // Component initialization
  }

  onLinkHover(event: Event) {
    const element = event.target as HTMLElement;
    element.style.transform = 'translateX(8px)';
  }

  onLinkLeave(event: Event) {
    const element = event.target as HTMLElement;
    element.style.transform = 'translateX(0)';
  }
}
