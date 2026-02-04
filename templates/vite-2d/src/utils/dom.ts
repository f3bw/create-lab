export function $(
    selector: string,
    parent: Element | Document = document
): Element | null {
    return parent.querySelector(selector)
}

export function $$(
    selector: string,
    parent: Element | Document = document
): Element[] {
    return Array.from(parent.querySelectorAll(selector))
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options: {
        className?: string
        text?: string
        html?: string
        attributes?: Record<string, string>
        parent?: Element
    } = {}
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag)

    if (options.className) {
        el.className = options.className
    }

    if (options.text) {
        el.textContent = options.text
    }

    if (options.html) {
        el.innerHTML = options.html
    }

    if (options.attributes) {
        for (const [key, value] of Object.entries(options.attributes)) {
            el.setAttribute(key, value)
        }
    }

    if (options.parent) {
        options.parent.appendChild(el)
    }

    return el
}

export function removeElement(el: Element | null): void {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el)
    }
}
