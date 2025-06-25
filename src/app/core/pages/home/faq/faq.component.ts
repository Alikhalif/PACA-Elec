import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [
    trigger('answerAnimation', [
      state('closed', style({
        height: '0',
        opacity: '0',
        padding: '0'
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        padding: '0 24px 24px'
      })),
      transition('closed <=> open', [
        animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class FaqComponent {

  faqItems = [
    {
      question: "Que faire en cas de panne électrique ?",
      answer: "Coupez immédiatement le courant au disjoncteur général et ne touchez à aucun fil ou équipement électrique. Faites appel à un professionnel pour une intervention sécurisée.",
      icon: "⚡",
      isOpen: false
    },
    {
      question: "Combien coûte un dépannage urgent ?",
      answer: "Le tarif d'un dépannage électrique urgent commence à partir de 59 € TTC. Le prix peut varier en fonction de la nature et de la gravité de la panne.",
      icon: "💶",
      isOpen: false
    },
    {
      question: "Travaillez-vous les week-ends et jours fériés ?",
      answer: "Oui, notre service est disponible 24h/24 et 7j/7, y compris les week-ends et les jours fériés, pour tous vos besoins en dépannage électrique.",
      icon: "🕒",
      isOpen: false
    }
  ];

  toggleFAQ(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
