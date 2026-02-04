/// <reference types="vite/client" />

declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module 'gsap/ScrollSmoother' {
    export * from 'gsap/dist/ScrollSmoother'
}

declare module 'gsap/SplitText' {
    export * from 'gsap/dist/SplitText'
}
