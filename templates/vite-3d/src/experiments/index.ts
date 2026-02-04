export interface Experiment {
    name: string
    init: (container: HTMLElement) => void | Promise<void>
    destroy: () => void
}

import { basicScene } from './01-basic-scene'
import { shaderIntro } from './02-shader-intro'

export const experiments = new Map<string, Experiment>([
    ['01-basic-scene', basicScene],
    ['02-shader-intro', shaderIntro],
])

export const defaultExperiment = '01-basic-scene'
