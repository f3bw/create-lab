import GUI from 'lil-gui'

let gui: GUI | null = null

export function createDebugPanel(): GUI {
    if (gui) {
        gui.destroy()
    }

    gui = new GUI()

    // Position bottom-left
    gui.domElement.style.position = 'fixed'
    gui.domElement.style.bottom = '0'
    gui.domElement.style.top = 'auto'
    gui.domElement.style.left = '0'
    gui.domElement.style.right = 'auto'

    return gui
}

export function getDebugPanel(): GUI | null {
    return gui
}

export function destroyDebugPanel(): void {
    if (gui) {
        gui.destroy()
        gui = null
    }
}
