declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: HTMLElement
    smooth?: boolean
    multiplier?: number
    class?: string
    smartphone?: {
      smooth: boolean
    }
    tablet?: {
      smooth: boolean
    }
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions)
    update(): void
    destroy(): void
    on(event: string, callback: () => void): void
    off(event: string, callback: () => void): void
    scrollTo(target: string | HTMLElement | number, options?: any): void
  }
}
