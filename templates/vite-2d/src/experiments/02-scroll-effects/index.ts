import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Experiment } from '../index'
import { createDebugPanel, destroyDebugPanel } from '../../core/debug'
import styles from './style.module.css'

let cleanup: (() => void) | null = null

export const scrollEffects: Experiment = {
    name: 'Scroll Effects',

    init(container: HTMLElement) {
        // Create scrollable content
        const wrapper = document.createElement('div')
        wrapper.className = styles.wrapper
        wrapper.innerHTML = `
      <section class="${styles.section} ${styles.hero}">
        <div class="${styles.heroContent}">
          <h1 class="${styles.heroTitle}">ScrollTrigger</h1>
          <p class="${styles.heroSubtitle}">Scroll-driven animations</p>
        </div>
        <div class="${styles.scrollIndicator}">
          <span>Scroll down</span>
          <div class="${styles.scrollArrow}"></div>
        </div>
      </section>

      <section class="${styles.section}">
        <div class="${styles.cards}">
          <div class="${styles.card}">
            <h2 class="${styles.cardTitle}">Reveal on Scroll</h2>
            <p class="${styles.cardText}">Elements animate in as you scroll down the page. ScrollTrigger makes it easy to create scroll-based animations.</p>
          </div>
          <div class="${styles.card}">
            <h2 class="${styles.cardTitle}">Pin & Scrub</h2>
            <p class="${styles.cardText}">Pin elements in place while scrolling continues, or scrub animations based on scroll position.</p>
          </div>
          <div class="${styles.card}">
            <h2 class="${styles.cardTitle}">Batch Animations</h2>
            <p class="${styles.cardText}">Efficiently animate multiple elements with staggered timing for a polished, sequential reveal effect.</p>
          </div>
        </div>
      </section>

      <section class="${styles.section} ${styles.horizontal}">
        <div class="${styles.horizontalTrack}">
          <div class="${styles.horizontalPanel} ${styles.panel1}">Panel 1</div>
          <div class="${styles.horizontalPanel} ${styles.panel2}">Panel 2</div>
          <div class="${styles.horizontalPanel} ${styles.panel3}">Panel 3</div>
        </div>
      </section>

      <section class="${styles.section} ${styles.finale}">
        <p class="${styles.finaleText}">The End</p>
      </section>
    `
        container.appendChild(wrapper)

        const cards = wrapper.querySelectorAll(`.${styles.card}`)
        const heroTitle = wrapper.querySelector(
            `.${styles.heroTitle}`
        ) as HTMLElement
        const heroSubtitle = wrapper.querySelector(
            `.${styles.heroSubtitle}`
        ) as HTMLElement
        const horizontalSection = wrapper.querySelector(
            `.${styles.horizontal}`
        ) as HTMLElement
        const horizontalTrack = wrapper.querySelector(
            `.${styles.horizontalTrack}`
        ) as HTMLElement
        const finaleText = wrapper.querySelector(
            `.${styles.finaleText}`
        ) as HTMLElement

        // Hero parallax
        gsap.to(heroTitle, {
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: heroTitle,
                scroller: wrapper,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })

        gsap.to(heroSubtitle, {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: heroSubtitle,
                scroller: wrapper,
                start: 'top center',
                end: 'bottom top',
                scrub: true,
            },
        })

        // Cards reveal
        cards.forEach((card) => {
            gsap.to(card, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    scroller: wrapper,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            })
        })

        // Horizontal scroll
        gsap.to(horizontalTrack, {
            x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalSection,
                scroller: wrapper,
                start: 'top top',
                end: () =>
                    `+=${horizontalTrack.scrollWidth - window.innerWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        })

        // Finale
        gsap.from(finaleText, {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: finaleText,
                scroller: wrapper,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        })

        // Debug panel
        const gui = createDebugPanel()
        const params = {
            markers: false,
        }

        gui.add(params, 'markers').onChange((value: boolean) => {
            ScrollTrigger.getAll().forEach((st) => {
                if (value) {
                    ScrollTrigger.create({
                        ...st.vars,
                        markers: true,
                    })
                }
            })
            if (!value) {
                ScrollTrigger.refresh()
            }
        })

        cleanup = () => {
            ScrollTrigger.getAll().forEach((st) => st.kill())
            destroyDebugPanel()
            wrapper.remove()
        }
    },

    destroy() {
        cleanup?.()
        cleanup = null
    },
}
