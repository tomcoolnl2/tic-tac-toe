
import { useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'
import { detectPrefersColorScheme } from '../helpers/browser'
import './app.module.scss';


export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export function App() {

  const bodyElement = useRef<HTMLElement>(document.body)

  const [theme, setTheme] = useLocalStorage<Theme>('theme', Theme.DARK)

  const setGlobalTheme = (theme: Theme): void => {
    bodyElement.current.dataset.theme = theme
  }

  useEffect(() => {
    const theme: Theme | null = detectPrefersColorScheme() || null
    setTheme(theme ?? Theme.LIGHT)
  }, [])
  
  useEffect(() => {
    setGlobalTheme(theme)
  }, [theme])

  const handleToggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme)
  }

  return (
    <main className='container'>
      <h1>Tic tac toe</h1>
      <div className='toggle-container'>
        <input type='checkbox' id='switch' name='theme' onChange={handleToggleTheme} checked={theme === Theme.DARK} />
        <label htmlFor='switch'>Toggle</label>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </main>
  )
}

// enum Compaditor {
//   X, O // -> 0, 1
// }

// const WINNING_POSITIONS = [
//   [1, 1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 0, 1, 0, 0, 1, 0, 0],
//   [0, 1, 0, 0, 1, 0, 0, 1, 0],
//   [0, 0, 1, 0, 0, 1, 0, 0, 1],
//   [1, 0, 0, 0, 1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 1, 0, 1, 0, 0]
// ];

// const binarySolutions = ['111000000', '000111000', '000000111', '100100100', '010010010', '001001001', '100010001', '001010100']
// const decimalSolutions = solutions.map(binary => parseInt(binary, 2)) // -> [448, 56, 7, 292, 146, 73, 273, 84]