import gsap from 'gsap'

export type TickerCallback = (elapsed: number, delta: number) => void

export function createTicker(callback: TickerCallback): () => void {
    let elapsed = 0

    const tick = (_time: number, deltaTime: number) => {
        const delta = deltaTime / 1000
        elapsed += delta
        callback(elapsed, delta)
    }

    gsap.ticker.add(tick)

    return () => {
        gsap.ticker.remove(tick)
    }
}
