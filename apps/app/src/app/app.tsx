
import { useEffect, useRef } from 'react'
import { GameState } from '@tic-tac-toe/models'
import { useLocalStorage, useTicTacToe } from '../hooks'
import { detectPrefersColorScheme } from '../helpers/browser'
import { GameScreen, StartScreen, FinishedScreen } from '../screen'
import { Toggle } from '../components/toggle/toggle'
import styles from './app.module.scss'


export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export function App() {

    const { playersBoard, gameStatus, winner, handleStart, handleRestart, handleClick } = useTicTacToe()
    const bodyElement = useRef<HTMLElement>(document.body)
    const [ theme, setTheme ] = useLocalStorage<Theme>('theme', Theme.DARK)

    const setGlobalTheme = (theme: Theme): void => {
        bodyElement.current.dataset.theme = theme
    }

    useEffect(() => {
        const theme: Theme | null = detectPrefersColorScheme() || null
        setTheme(theme ?? Theme.LIGHT)
    }, [])
  
    useEffect(() => {
        setGlobalTheme(theme)
    }, [ theme ])

    const handleToggleTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        setTheme(newTheme)
    }

    const renderScene = () => {
        switch (gameStatus) {
            case GameState.CREATED: 
                return <StartScreen handleStart={handleStart} />
            case GameState.FINISHED:
                return <FinishedScreen winner={winner} handleRestart={handleRestart} />
            case GameState.STARTED:
                return <GameScreen board={playersBoard} handleClick={handleClick} />
            default: 
                return null
        }
    }

    return (
        <main className={styles.container}>
            <h1>Tic tac toe</h1>
            <Toggle checked={theme === Theme.DARK} onChangeHandler={handleToggleTheme} />
            {renderScene()}
        </main>
    )
}