export interface Experiment {
    name: string
    init: (container: HTMLElement) => void | Promise<void>
    destroy: () => void
}

import { textAnimation } from './01-text-animation'
import { scrollEffects } from './02-scroll-effects'

export const experiments = new Map<string, Experiment>([
    ['01-text-animation', textAnimation],
    ['02-scroll-effects', scrollEffects],
])

export const defaultExperiment = '01-text-animation'
