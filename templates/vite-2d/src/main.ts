import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { experiments, defaultExperiment, type Experiment } from './experiments'
import { ExperimentPicker } from './ui'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

class App {
    private currentExperiment: Experiment | null = null
    private currentExperimentId: string = ''
    private container: HTMLElement
    private picker: ExperimentPicker

    constructor() {
        this.container = document.getElementById(
            'experiment-container'
        ) as HTMLElement

        // Initialize experiment picker
        this.picker = new ExperimentPicker({
            experiments,
            currentExperiment: this.getExperimentFromHash(),
            onSelect: (id) => this.loadExperiment(id),
        })

        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            const id = this.getExperimentFromHash()
            if (id !== this.currentExperimentId) {
                this.loadExperiment(id)
            }
        })

        // Load initial experiment
        this.loadExperiment(this.getExperimentFromHash())
    }

    private getExperimentFromHash(): string {
        const hash = window.location.hash.slice(1)
        if (hash && experiments.has(hash)) {
            return hash
        }
        return defaultExperiment
    }

    private async loadExperiment(id: string): Promise<void> {
        // Destroy current experiment
        if (this.currentExperiment) {
            this.currentExperiment.destroy()
            this.currentExperiment = null
        }

        // Clear container
        this.container.innerHTML = ''

        // Get new experiment
        const experiment = experiments.get(id)
        if (!experiment) {
            console.error(`Experiment "${id}" not found`)
            return
        }

        // Update hash
        if (window.location.hash.slice(1) !== id) {
            window.location.hash = id
        }

        // Initialize experiment
        this.currentExperiment = experiment
        this.currentExperimentId = id
        this.picker.setCurrentExperiment(id)

        try {
            await experiment.init(this.container)
            console.log(`Loaded experiment: ${experiment.name}`)
        } catch (error) {
            console.error(`Failed to load experiment "${id}":`, error)
        }
    }
}

// Start app
new App()
