
import { Theme } from '../app/app'


export function detectPrefersColorScheme(): Theme {
    return window.matchMedia && window.matchMedia(`(prefers-color-scheme: light)`).matches ? Theme.LIGHT : Theme.DARK
}