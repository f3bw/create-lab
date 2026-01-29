import './styles/global.css'

interface Experiment {
    id: number
    name: string
    description: string
}

const experiments: Experiment[] = [
    { id: 1, name: 'Counter', description: 'Simple state management' },
    { id: 2, name: 'Canvas', description: 'HTML Canvas drawing' },
    { id: 3, name: 'Animation', description: 'CSS animations demo' },
]

class App {
    private count = 0
    private canvas: HTMLCanvasElement | null = null
    private ctx: CanvasRenderingContext2D | null = null
    private animationId: number | null = null
    private particles: Particle[] = []

    constructor() {
        this.render()
        this.setupEventListeners()
    }

    private render() {
        const app = document.querySelector<HTMLDivElement>('#app')!

        app.innerHTML = `
            <header class="header">
                <nav class="nav">
                    <a href="/" class="logo">Lab</a>
                    <ul class="nav-links">
                        <li><a href="#experiments">Experiments</a></li>
                        <li><a href="https://github.com" target="_blank">GitHub</a></li>
                    </ul>
                </nav>
            </header>

            <main class="main">
                <section class="hero">
                    <h1 class="title">Vite Lab</h1>
                    <p class="subtitle">Vanilla TypeScript playground for experiments</p>
                </section>

                <section id="experiments" class="experiments">
                    <div class="card">
                        <h3 class="card-title">Counter</h3>
                        <p class="card-description">Simple state management</p>
                        <div class="card-content">
                            <span class="counter-value">${this.count}</span>
                            <div class="card-actions">
                                <button id="increment" class="button">+</button>
                                <button id="decrement" class="button button-secondary">−</button>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="card-title">Canvas Particles</h3>
                        <p class="card-description">Click canvas to add particles</p>
                        <div class="card-content canvas-container">
                            <canvas id="canvas" width="280" height="150"></canvas>
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="card-title">Animation</h3>
                        <p class="card-description">CSS keyframe animation</p>
                        <div class="card-content">
                            <div class="spinner" id="spinner"></div>
                            <button id="toggle-animation" class="button">Toggle</button>
                        </div>
                    </div>
                </section>

                <section class="info">
                    <p>Edit <code>src/main.ts</code> to start experimenting</p>
                </section>
            </main>
        `

        this.canvas = document.querySelector<HTMLCanvasElement>('#canvas')
        this.ctx = this.canvas?.getContext('2d') || null
        this.startAnimation()
    }

    private setupEventListeners() {
        document.getElementById('increment')?.addEventListener('click', () => {
            this.count++
            this.updateCounter()
        })

        document.getElementById('decrement')?.addEventListener('click', () => {
            this.count--
            this.updateCounter()
        })

        document.getElementById('toggle-animation')?.addEventListener('click', () => {
            const spinner = document.getElementById('spinner')
            spinner?.classList.toggle('paused')
        })

        this.canvas?.addEventListener('click', (e) => {
            const rect = this.canvas!.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            this.addParticles(x, y)
        })
    }

    private updateCounter() {
        const counterEl = document.querySelector('.counter-value')
        if (counterEl) {
            counterEl.textContent = String(this.count)
        }
    }

    private addParticles(x: number, y: number) {
        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(x, y))
        }
    }

    private startAnimation() {
        const animate = () => {
            if (!this.ctx || !this.canvas) return

            this.ctx.fillStyle = 'rgba(18, 18, 18, 0.2)'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

            this.particles = this.particles.filter((p) => p.life > 0)

            this.particles.forEach((p) => {
                p.update()
                p.draw(this.ctx!)
            })

            this.animationId = requestAnimationFrame(animate)
        }

        animate()
    }
}

class Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    color: string

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 4
        this.vy = (Math.random() - 0.5) * 4
        this.life = 100
        this.color = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 2
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.life / 100
        ctx.fill()
        ctx.globalAlpha = 1
    }
}

new App()
