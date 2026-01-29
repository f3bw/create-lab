import './styles/global.css'

const app = document.querySelector<HTMLDivElement>('#app')!

let count = 0

function render() {
    app.innerHTML = `
        <main class="container">
            <h1 class="title">Vite Lab</h1>
            <div class="card">
                <button id="counter" class="button">Count: ${count}</button>
            </div>
            <p class="hint">Edit src/main.ts and save to test HMR</p>
        </main>
    `

    document.querySelector<HTMLButtonElement>('#counter')!.addEventListener('click', () => {
        count++
        render()
    })
}

render()
