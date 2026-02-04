import type { Experiment } from '../index'
import styles from './style.module.css'

// Cleanup function reference
let cleanup: (() => void) | null = null

export const template: Experiment = {
    name: 'Template',

    init(container: HTMLElement) {
        // Create experiment DOM
        const wrapper = document.createElement('div')
        wrapper.className = styles.container

        // Add your experiment content here

        container.appendChild(wrapper)

        // Setup cleanup
        cleanup = () => {
            wrapper.remove()
        }
    },

    destroy() {
        cleanup?.()
        cleanup = null
    },
}
