import styles from './experiment.module.css'
import type { Experiment } from '../../experiments'

export interface ExperimentPickerOptions {
    experiments: Map<string, Experiment>
    currentExperiment: string
    onSelect: (id: string) => void
}

export class ExperimentPicker {
    private container: HTMLElement
    private panel: HTMLElement
    private list: HTMLElement
    private isOpen = false
    private currentExperiment: string
    private experiments: Map<string, Experiment>
    private onSelect: (id: string) => void
    private keyHandler: (e: KeyboardEvent) => void

    constructor(options: ExperimentPickerOptions) {
        this.experiments = options.experiments
        this.currentExperiment = options.currentExperiment
        this.onSelect = options.onSelect

        this.container = document.createElement('div')
        this.container.className = styles.picker

        // Toggle button
        const toggle = document.createElement('button')
        toggle.className = styles.toggle
        toggle.innerHTML = `<span class="${styles.toggleIcon}">E</span>`
        toggle.addEventListener('click', () => this.toggle())

        // Panel
        this.panel = document.createElement('div')
        this.panel.className = styles.panel

        // Header
        const header = document.createElement('div')
        header.className = styles.header
        header.innerHTML = `
      <span class="${styles.title}">Experiments</span>
      <button class="${styles.closeBtn}">&times;</button>
    `
        header
            .querySelector(`.${styles.closeBtn}`)
            ?.addEventListener('click', () => this.close())

        // List
        this.list = document.createElement('ul')
        this.list.className = styles.list
        this.renderList()

        // Hint
        const hint = document.createElement('div')
        hint.className = styles.hint
        hint.innerHTML = `Press <span class="${styles.kbd}">E</span> to toggle`

        this.panel.appendChild(header)
        this.panel.appendChild(this.list)
        this.panel.appendChild(hint)

        this.container.appendChild(this.panel)
        this.container.appendChild(toggle)

        // Keyboard handler
        this.keyHandler = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'e' && !this.isInputFocused()) {
                e.preventDefault()
                this.toggle()
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close()
            }
        }
        window.addEventListener('keydown', this.keyHandler)

        document.body.appendChild(this.container)
    }

    private isInputFocused(): boolean {
        const active = document.activeElement
        return (
            active instanceof HTMLInputElement ||
            active instanceof HTMLTextAreaElement ||
            active?.getAttribute('contenteditable') === 'true'
        )
    }

    private renderList(): void {
        this.list.innerHTML = ''

        for (const [id, experiment] of this.experiments) {
            const item = document.createElement('li')
            item.className = `${styles.item} ${id === this.currentExperiment ? styles.itemActive : ''}`
            item.innerHTML = `
        <span class="${styles.itemIndicator}"></span>
        <span class="${styles.itemName}">${experiment.name}</span>
      `
            item.addEventListener('click', () => {
                this.onSelect(id)
                this.close()
            })
            this.list.appendChild(item)
        }
    }

    toggle(): void {
        this.isOpen ? this.close() : this.open()
    }

    open(): void {
        this.isOpen = true
        this.panel.classList.add(styles.panelOpen)
    }

    close(): void {
        this.isOpen = false
        this.panel.classList.remove(styles.panelOpen)
    }

    setCurrentExperiment(id: string): void {
        this.currentExperiment = id
        this.renderList()
    }

    destroy(): void {
        window.removeEventListener('keydown', this.keyHandler)
        this.container.remove()
    }
}
