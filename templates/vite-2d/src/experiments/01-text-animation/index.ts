import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import type { Experiment } from '../index'
import { createDebugPanel, destroyDebugPanel } from '../../core/debug'
import styles from './style.module.css'

let cleanup: (() => void) | null = null

export const textAnimation: Experiment = {
    name: 'Text Animation',

    init(container: HTMLElement) {
        // Create DOM
        const wrapper = document.createElement('div')
        wrapper.className = styles.container
        wrapper.innerHTML = `
      <h1 class="${styles.title}">Creative Animation</h1>
      <div class="${styles.boxes}">
        <div class="${styles.box}"></div>
        <div class="${styles.box}"></div>
        <div class="${styles.box}"></div>
        <div class="${styles.box}"></div>
      </div>
      <div class="${styles.controls}">
        <button class="${styles.btn}" data-action="play">Play</button>
        <button class="${styles.btn}" data-action="pause">Pause</button>
        <button class="${styles.btn}" data-action="reverse">Reverse</button>
        <button class="${styles.btn}" data-action="restart">Restart</button>
      </div>
    `
        container.appendChild(wrapper)

        const title = wrapper.querySelector(`.${styles.title}`) as HTMLElement
        const boxes = wrapper.querySelectorAll(`.${styles.box}`)
        const buttons = wrapper.querySelectorAll(`.${styles.btn}`)

        // Split text
        const split = new SplitText(title, {
            type: 'chars,words',
            charsClass: styles.char,
            wordsClass: styles.word,
        })

        // Create timeline
        const tl = gsap.timeline({ paused: true })

        // Animate characters
        tl.from(split.chars, {
            y: 100,
            opacity: 0,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: 'back.out(1.7)',
        })

        // Animate boxes
        tl.from(
            boxes,
            {
                scale: 0,
                rotation: -180,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.7)',
            },
            '-=0.4'
        )

        // Box continuous animation
        tl.to(
            boxes,
            {
                y: -20,
                stagger: {
                    each: 0.1,
                    yoyo: true,
                    repeat: -1,
                },
                duration: 0.4,
                ease: 'power1.inOut',
            },
            '+=0.2'
        )

        // Auto-play
        tl.play()

        // Button controls
        const handleClick = (e: Event) => {
            const target = e.target as HTMLElement
            const action = target.dataset.action
            if (action === 'play') tl.play()
            if (action === 'pause') tl.pause()
            if (action === 'reverse') tl.reverse()
            if (action === 'restart') tl.restart()
        }

        buttons.forEach((btn) => btn.addEventListener('click', handleClick))

        // Debug panel
        const gui = createDebugPanel()
        const params = {
            timeScale: 1,
            progress: 0,
        }

        gui.add(params, 'timeScale', 0.1, 3, 0.1).onChange((value: number) => {
            tl.timeScale(value)
        })

        gui.add(params, 'progress', 0, 1, 0.01)
            .onChange((value: number) => {
                tl.progress(value)
            })
            .listen()

        // Update progress slider
        const updateProgress = () => {
            params.progress = tl.progress()
        }
        gsap.ticker.add(updateProgress)

        cleanup = () => {
            gsap.ticker.remove(updateProgress)
            tl.kill()
            split.revert()
            destroyDebugPanel()
            wrapper.remove()
        }
    },

    destroy() {
        cleanup?.()
        cleanup = null
    },
}
