declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, settings: Record<string, unknown>);
    loadFromHTML(pages: HTMLElement[] | NodeListOf<HTMLElement>): void;
    getPageCount(): number;
    flip(page: number, corner?: string): void;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    on(event: string, cb: (e: { data: any }) => void): void;
    destroy(): void;
  }
}
