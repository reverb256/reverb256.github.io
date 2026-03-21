import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 * @returns true if animations should be disabled
 */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize infrastructure showcase animations
 * Optimized for performance with reduced-motion support
 */
export function initInfrastructureAnimations() {
  // Respect user's motion preferences
  if (prefersReducedMotion()) {
    console.info('Animations disabled: user prefers reduced motion');
    return;
  }

  // Batch all ScrollTrigger operations for better performance
  // See: https://greensock.com/docs/v3/Plugins/ScrollTrigger
  ScrollTrigger.batch('.stat-item', {
    onEnter: (elements) => {
      // Simple CSS animation is more performant than GSAP for continuous pulse
      // Using GSAP only for initial stagger
      gsap.from(elements, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          // Add CSS class for continuous pulse animation (more efficient than GSAP)
          elements.forEach((el) => el.classList.add('stat-pulse'));
        },
      });
    },
    start: 'top 90%',
  });

  // Batch section animations for better scroll performance
  // Note: Removed onLeaveBack to prevent elements from disappearing when scrolling up
  ScrollTrigger.batch(
    '.intro-section, .innovation-section, .operations-section, .capabilities-section',
    {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      start: 'top 80%',
      once: true, // Only animate once to prevent scroll issues
    }
  );

  // Optimize glass cards with batched ScrollTrigger
  const glassGrids = document.querySelectorAll('.glass-grid');
  glassGrids.forEach((grid) => {
    ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      onEnter: () => {
        const cards = grid.querySelectorAll('.glass-card');
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
      once: true, // Only animate once for better performance
    });
  });

  // Timeline milestones - optimized with single ScrollTrigger batch
  ScrollTrigger.batch('.milestone', {
    onEnter: (elements) => {
      elements.forEach((el) => el.classList.add('visible'));
    },
    start: 'top 80%',
    once: true,
  });

  // Performance: Refresh all ScrollTriggers once after setup
  // This is more efficient than letting each trigger refresh independently
  ScrollTrigger.refresh();
}

/**
 * Clean up all GSAP animations and ScrollTriggers
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
