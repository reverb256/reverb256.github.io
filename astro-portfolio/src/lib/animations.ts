import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize infrastructure showcase animations
 */
export function initInfrastructureAnimations() {
  // Animate stat items with pulse effect
  const statItems = document.querySelectorAll('.stat-item');
  if (statItems.length > 0) {
    gsap.to(statItems, {
      scale: 1.05,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: 0.2,
    });
  }

  // Animate sections on scroll
  const sections = document.querySelectorAll('.intro-section, .innovation-section, .operations-section, .capabilities-section');
  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Animate glass cards with staggered delay
  const glassCards = document.querySelectorAll('.glass-card');
  if (glassCards.length > 0) {
    gsap.from(glassCards, {
      scrollTrigger: {
        trigger: '.glass-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
    });
  }

  // Animate timeline milestones
  const milestones = document.querySelectorAll('.milestone');
  milestones.forEach((milestone) => {
    ScrollTrigger.create({
      trigger: milestone,
      start: 'top 80%',
      onEnter: () => milestone.classList.add('visible'),
      once: true,
    });
  });

  // Parallax background effect (will be implemented in Task 8)
  // const parallaxBg = document.querySelector('.parallax-background');
  // if (parallaxBg) {
  //   gsap.to(parallaxBg, {
  //     scrollTrigger: {
  //       trigger: '.infrastructure-showcase',
  //       start: 'top top',
  //       end: 'bottom top',
  //       scrub: 1,
  //     },
  //     y: 200,
  //     ease: 'none',
  //   });
  // }
}

/**
 * Clean up all GSAP animations and ScrollTriggers
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
