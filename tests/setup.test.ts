import { afterEach, vi } from 'vitest';

afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    localStorage.clear();
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,

    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds: readonly number[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn((): IntersectionObserverEntry[] => []);
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
