export function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

export function map(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export function random(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number): number {
    return Math.floor(random(min, max + 1))
}

export function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180)
}

export function radToDeg(radians: number): number {
    return radians * (180 / Math.PI)
}
